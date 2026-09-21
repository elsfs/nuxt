import { useRequest } from '../core/api';

export const { useRequestHandle, requestPath } = useRequest('/aiModelPlatform');

/**
 * 模型平台
 */
export interface AiModelPlatform {
  /**  平台id */
  platformId: string;
  /**  平台名称 */
  name: string;
  /**  平台描述 */
  description: string;
  /**  平台类型 */
  type: string;
  /**  地址 */
  baseUrl: string;
  /**  apiKey */
  apiKey: string;
  /**  状态（0正常 1停用） */
  status: string;
  /**  拼音码 */
  pinyinCode: string;
  /**  五笔码 */
  wubiCode: string;
}
