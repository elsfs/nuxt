import { useRequest } from '../core/api';

export const { useRequestHandle, requestPath } = useRequest('/role');

/**
 * 角色数据库实体
 */
export interface SysRole {
  /**
   * 角色ID
   */
  roleId: string;
  /**
   * 角色名称
   */
  roleName: string;
  /**
   * 角色编码
   */
  roleCode: string;
  /**
   * 角色描述
   */
  roleDesc?: string;
  /**
   * 排序
   */
  orderNo: number;
  /**
   * 状态
   */
  status?: string;
}
