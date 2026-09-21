# @vben/api-types

共享的 API 定义与请求客户端容器包，被 `web-ele`、`elsfs-system-ele`、`elsfs-system-nuxt` 等多个应用共同引用。其目标是**「API 函数共享、认证策略 app 自持」**：接口定义（路径、入参、返回类型）只维护一份，而 token 注入、登录态刷新、错误提示等与具体应用绑定的私有逻辑，由各应用在初始化时注入。

## 目录结构

```text
src/
├── index.ts              # 包入口，汇总导出核心模块
└── api/
    ├── request.ts         # 共享请求客户端容器 + 创建/注入工具
    ├── schemaName.ts      # 各业务模块对应的数据库 schema 名
    ├── core/              # 基础能力：auth / menu / user / useRequest / 文件下载
    ├── system/            # 系统管理：部门、菜单、角色、岗位、租户、用户
    ├── devOps/            # 运维：字典、字典项、操作日志、系统配置
    ├── developer/         # 开发者工具：代码生成、模板、表、字段类型
    ├── cms/               # 内容管理：文章、轮播图、内容分类
    ├── ai/                # AI 相关：模型平台、模型配置、知识库
    ├── domain/            # 域名管理：主机、DNS 账号、证书、子域名
    └── school/            # 校园业务：班级信息
```

## 核心概念

### 请求客户端容器（`request.ts`）

包内所有 API 函数都通过 `requestClient()` / `baseRequestClient()` 获取请求客户端。默认提供一份**简洁版**（不包含任何认证逻辑）的共享 client，各 app 在启动时调用 `configureRequestClients()` 注入**带自身 token、刷新、错误提示等私有逻辑**的 client 即可，之后所有共享 API 函数都会自动使用该 client。

```ts
import {
  configureRequestClients,
  createRequestClient,
} from '@vben/api-types';

// 在各 app 的 request 初始化处调用一次
const requestClient = createRequestClient(apiURL, { responseReturn: 'data' });
// ...在 client 上继续 addRequestInterceptor / addResponseInterceptor 装配私有逻辑

configureRequestClients({ requestClient });
```

常用工具：

- `createRequestClient(baseURL, options)`：基于 `@vben/request` 构造 client，并预置 `defaultResponseInterceptor`（`code`/`data`/`successCode=0` 字段约定）。
- `configureRequestClients({ requestClient, baseRequestClient })`：注入 app 自定义 client。
- `requestClient()` / `baseRequestClient()`：读取当前共享 client。前者返回 `responseReturn: 'data'` 的客户端，后者返回原始响应 `raw`。

### 标准化接口工具 `useRequest(prefix)`（`src/api/core/api.ts`）

按统一 REST 约定快速生成一套 CRUD 接口封装，减少重复代码：

```ts
const { useRequestHandle, requestPath } = useRequest('/dict');
await useRequestHandle.page(params);   // GET  /dict/page       分页查询
await useRequestHandle.list(params);   // GET  /dict/list       列表
await useRequestHandle.add(params);    // POST /dict/add        新增
await useRequestHandle.edit(data);     // PUT  /dict/edit       修改
await useRequestHandle.del(ids);       // 删除（带二次确认）
// 另有 tree / getById / editState / logicPage / logicList /
// logicAdd(恢复) / logicDel(彻底删除) 等
```

同时提供几个通用能力：

- `uploadUrl`：通用文件上传地址。
- `downloadFile(url, fileName?, params?)` / `getFileblob(url, params?)`：文件（Excel 导出等）下载与 Blob 获取。
- `exportXls` / `importXls`（封装在 `requestPath` 中）：导入导出路径。

## 编码约定

- 常用模块（如 `devOps/dict.ts`）用 `useRequest(prefix)` 生成通用接口，再补自定义接口。
- 返回类型以 `interface`/`type` 集中描述，供组件类型安全使用。
- 纯类型命名空间（如 `AuthApi`）仅供 `import type { ... } from '@vben/api-types'` 消费，运行时会被擦除。

