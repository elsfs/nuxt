import { useRequest } from '../core/api';

/**
 * 用户
 */
export interface SysUser {
  /**
   * 用户 id
   */
  userId: string;
  /**
   * 用户名
   */
  username: string;
  /**
   * 用户密码
   */
  password?: string;
  /**
   * 用户头像
   */
  avatar?: string;
  /**
   * 用户邮箱
   */
  email: string;
  /**
   * 用户手机号
   */
  phone: string;
  /**
   * 用户租户
   */
  tenantId?: string;
  /**
   * 用户昵称
   */
  nickname: string;
  /**
   * 用户性别
   */
  sex?: string;
  /**
   * 用户生日
   */
  birthday?: string;
  /**
   * 状态
   */
  status?: string;
  /**
   *   部门
   */
  deptIds?: string[];
  /**
   * 职位
   */
  postIds?: string[];
}

export const { useRequestHandle, requestPath } = useRequest('/user');
