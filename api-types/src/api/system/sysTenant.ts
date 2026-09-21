import type { DuplicateCheckQry } from '../core/duplicateCheck';

import { useRequest } from '../core/api';

export interface SysTenant {
  tenantId: string; // 租户ID
  /** 租户名称 */
  tenantName: string;
  /** 租户域名 */
  tenantDomain: string;
  /** 租户编码 */
  tenantCode: string;
  /** 租户联系人 */
  tenantContact: string;
  /** 租户联系人电话 */
  tenantContactPhone: string;
  /** 租户联系人邮箱 */
  tenantContactEmail: string;
  /** 租户联系地址 */
  tenantContactAddress: string;
  /** 状态 0-无效 1-有效 */
  validFlag: string;
  /** 备注 */
  tenantDesc: string;
  /** 租户logo */
  tenantLogo: string;
  /** 租户类型 */
  tenantType: string;
}

export const { useRequestHandle, requestPath } = useRequest('/tenant');
export function checkDate(fieldVal, dataId, fieldName): DuplicateCheckQry {
  return {
    schemaName: 'e_admin', // 数据库名
    tableName: 'sys_tenant', // 表名
    fieldName, // 字段名
    fieldVal, // 字段值
    dataId, // 数据ID
    keyName: 'tenant_id', // 主键名称
  };
}
