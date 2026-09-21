import { useRequest } from '../core/api';

export const { useRequestHandle, requestPath } = useRequest('/aiModelConfig');

/**
 * 模型配置
 */
export interface AiModelConfig {
  /**  模型id */
  modelId: string;
  /**  模型平台Id */
  platformId: string;
  /**  模型名称 */
  modelName: string;
  /**  模型描述 */
  description: string;
  /**  模型类型 */
  type: string;
  /**  供应商 */
  supplier: string;
  /**  状态（0正常 1停用） */
  status: string;
  /**  拼音码 */
  pinyinCode: string;
  /**  五笔码 */
  wubiCode: string;
}
