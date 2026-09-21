import { useRequest } from '../core/api';

export const { useRequestHandle, requestPath } = useRequest('/aiKnowledge');

/**
 * ai知识库
 */
export interface AiKnowledge {
  /**  主键 */
  knowledgeId: string;
  /**  知识库名称 */
  name: string;
  /**  向量模型id */
  modelId: string;
  /**  描述 */
  description: string;
  /**  状态（0正常 1停用） */
  status: string;
  /**  拼音码 */
  pinyinCode: string;
  /**  五笔码 */
  wubiCode: string;
}
