import { useRequest } from '../core/api';
import { requestClient } from '../request';

export const { useRequestHandle, requestPath } =
  useRequest('/genDatasourceConf');

/**
 * 查询数据源对应的文档
 */
export async function doc(dsName: string): Promise<string[]> {
  return requestClient().get(`/genDatasourceConf/doc`, { params: { dsName } });
}

/**
 * 查询数据源对应的文档
 */
export async function docHtml(dsName: string) {
  try {
    const response = await requestClient().get(`/genDatasourceConf/doc.html`, {
      params: { dsName },
      responseType: 'blob',
      responseReturn: 'body',
    });
    // 检查响应是否为空
    if (!response || !(response instanceof Blob)) {
      console.error('Invalid response received:', response);
    }
    // 将 Blob 对象转换为 URL
    const blobUrl = URL.createObjectURL(response);

    // 打开链接在新标签页
    const a = document.createElement('a');
    a.href = blobUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer'; // 增强安全性，防止潜在的安全威胁
    a.click();
  } catch (error: any) {
    // 打印完整的异常对象
    console.error('Error fetching document:', error);

    // 检查异常对象的类型并提取错误信息
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    } else if (typeof error === 'string') {
      console.error('Error message:', error);
    } else if (error && typeof error === 'object') {
      console.error('Error details:', JSON.stringify(error, null, 2));
    } else {
      console.error('Unknown error type:', typeof error);
    }
  }
}

export interface GenDatasourceConf {
  id: string;
  name: string; // 数据源名称
  dsType: 'db2' | 'dm' | 'highgo' | 'mssql' | 'mysql' | 'oracle' | 'pg'; // 数据源类型
  confType: string; // 配置类型 （0 主机形式 | 1 url形式）
  host: string; // 主机
  port: number; // 端口
  url: string; // jdbc-url
  instance: string; // 实例
  dsName: string; // 数据库名称
  username: string; // 用户名
  state: string; // 状态
  password: string; // 密码
}
