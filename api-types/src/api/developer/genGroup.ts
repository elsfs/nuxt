import { useRequest } from '../core/api';

/**
 * 模板分组实体类
 */
export class GenGroup {
  /** 分组描述 */
  groupDesc!: string;
  /** 分组名称 */
  groupName!: string;
  /** id */
  id!: string;
}

export const { useRequestHandle, requestPath } = useRequest('/genGroup');
