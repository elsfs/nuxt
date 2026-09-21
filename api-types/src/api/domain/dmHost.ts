import { useRequest } from '../core/api';

export const { useRequestHandle, requestPath } = useRequest('/dmHost');

/**
 * 证书主机
 */
export interface DmHost {
  /**
   * 主键ID
   */
  hostId?: string;

  /**
   * 用户ID
   */
  userId?: number;

  /**
   * 远程主机地址
   */
  host?: string;

  /**
   * 端口号
   */
  port?: string;

  /**
   * 验证方式 默认密码验证
   * 1-密码验证
   * 2-私钥验证
   */
  authType?: number;

  /**
   * 私钥
   */
  privateKey?: string;

  /**
   * 登录用户
   */
  user?: string;

  /**
   * 密码
   */
  password?: string;

  // 继承自BaseEntity的属性（如果有的话）
  createTime?: Date;
  updateTime?: Date;
  createBy?: string;
  updateBy?: string;
}
