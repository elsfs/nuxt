/**
 * 该文件为共享请求客户端容器。
 * 各 app 可通过 `configureRequestClients` 注入自定义 client（含 token、刷新等私有逻辑），
 * 共享的 API 函数都会使用被注入后的 client，从而做到「API 函数共享、认证策略 app 自持」。
 */
import type { RequestClientOptions } from '@vben/request';

import { defaultResponseInterceptor, RequestClient } from '@vben/request';

const apiURL = import.meta.env.VITE_GLOB_API_URL || '/api';

/**
 * 创建请求客户端。各 app 可以在返回的 client 上继续
 * addRequestInterceptor / addResponseInterceptor 以装配 token、刷新等私有逻辑。
 */
export function createRequestClient(
  baseURL: string,
  options?: RequestClientOptions,
): RequestClient {
  const client = new RequestClient({ ...options, baseURL });

  // 处理返回的响应数据格式
  client.addResponseInterceptor(
    defaultResponseInterceptor({
      codeField: 'code',
      dataField: 'data',
      successCode: 0,
    }),
  );

  return client;
}

// 共享默认 client（简洁版，不含 app 私有认证逻辑）
let sharedRequestClient = createRequestClient(apiURL, {
  responseReturn: 'data',
});

let sharedBaseRequestClient = createRequestClient(apiURL, {
  responseReturn: 'raw',
});

/**
 * 由 app 注入自定义（含认证）的请求客户端。
 * 通常在各应用的 request 初始化处调用一次。
 */
export function configureRequestClients(overrides?: {
  baseRequestClient?: RequestClient;
  requestClient?: RequestClient;
}) {
  if (overrides?.requestClient) {
    sharedRequestClient = overrides.requestClient;
  }
  if (overrides?.baseRequestClient) {
    sharedBaseRequestClient = overrides.baseRequestClient;
  }
}

/** 共享请求客户端（已被注入 app 认证逻辑后即为带 token 的 client） */
export const requestClient = () => sharedRequestClient;

/** 共享基础客户端 */
export const baseRequestClient = () => sharedBaseRequestClient;
