import { useRequest } from '../core/api';

export const { useRequestHandle, requestPath } =
  useRequest('/aiEmbeddingStore');

/**
 * 向量配置
 */
export interface AiEmbeddingStore {
  /**  配置id */
  storeId: string;
  /**  配置类型（0 主机形式 | 1 url形式） */
  confType: string;
  /**  名称 */
  name: string;
  /**  类型 */
  storeType: string;
  /**  密钥 */
  apiKey: string;
  /**  url */
  url: string;
  /**  host */
  host: string;
  /**  端口 */
  port: string;
  /**  数据库 */
  extData: string;
  /**  状态（0正常 1停用） */
  status: string;
  /**  拼音码 */
  pinyinCode: string;
  /**  五笔码 */
  wubiCode: string;
}
