import { useRequest } from '../core/api';

export const { useRequestHandle, requestPath } = useRequest('/dmDnsAccount');

/**
 * DNS账号实体类
 */
export interface DmDnsAccount {
  /**
   * 主键ID
   */
  dnsAccountId?: string;

  /**
   * DNS类型
   */
  dnsType?: string;

  /**
   * 名称
   */
  name?: string;

  /**
   * Access Key
   */
  accessKey?: string;

  /**
   * Secret Key
   */
  secretKey?: string;

  /**
   * 数据版本号
   */
  version?: number;

  // 继承自BaseEntity的属性
  id?: number;
  deleted?: number;
  createTime?: string; // 或者 Date 类型，取决于您的日期处理方式
  updateTime?: string; // 或者 Date 类型，取决于您的日期处理方式
  createBy?: string;
  updateBy?: string;
}
