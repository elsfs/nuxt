import { useRequest } from '../core/api';

/**
 * 模板实体类型定义
 */
export interface GenTemplate {
  /** 主键 */
  id: string;
  /** 模板名称 */
  templateName: string;
  /** 模板路径 */
  generatorPath: string;
  /** 模板描述 */
  templateDesc: string;
  /** 模板代码 */
  templateCode: string;

  // 以下是继承自BaseEntity的公共字段（根据实际基类字段补充）
  createBy?: string;
  createTime?: Date;
  updateBy?: string;
  updateTime?: Date;
}

export const { useRequestHandle, requestPath } = useRequest('/genTemplate');
