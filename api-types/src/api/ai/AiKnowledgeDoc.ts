import { useRequest } from '../core/api';

export const { useRequestHandle, requestPath } = useRequest('/AiKnowledgeDoc');
/**
 * AI知识库文档实体
 *
 * @version V1.0.0-M2
 * @since 2025-06-20
 */
export interface AiKnowledgeDoc {
  /**
   * 主键ID
   */
  knowledgeDocId?: string;

  /**
   * 所属知识库ID
   */
  knowledgeId?: string;

  /**
   * 文档标题（支持模糊查询）
   */
  title?: string;

  /**
   * 文档类型：文本(text)/文件(file)/网页(webpage)
   */
  knowDocType?: string;

  /**
   * 文档内容（文本内容或文件内容）
   */
  content?: string;

  /**
   * 元数据（JSON格式）
   * 示例:
   * {
   *   "filePath": "https://xxxxxx", // 文件存储路径
   *   "website": "https://hellp.elsfs.com" // 网页地址
   * }
   */
  metadata?: object | string;

  /**
   * 文档状态
   */
  status?: string;
}
