import { useRequest } from '../core/api';

export const { useRequestHandle, requestPath } = useRequest('/address');

export interface Address {
  /**
   * 主键ID
   */
  addressId: string;

  /**
   * 域名ID
   */
  subdomainId: string;

  /**
   * 主机地址
   */
  host: string;

  /**
   * SSL签发时间
   */
  sslStartTime: string; // 使用字符串表示日期时间，也可用 Date 类型

  /**
   * SSL过期时间
   */
  sslExpireTime: string; // 使用字符串表示日期时间，也可用 Date 类型

  /**
   * SSL过期剩余天数，仅用于排序
   */
  sslExpireDays: number;

  /**
   * 添加方式 0 自动 1 手动
   */
  source: number;

  /**
   * 备注说明
   */
  remark: string;
  sslDays: number;
}
