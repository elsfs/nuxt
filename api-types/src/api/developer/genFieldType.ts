import { useRequest } from '../core/api';

export const { useRequestHandle, requestPath } = useRequest('/genFieldType');
/**
 * 列属性类型
 */
export interface GenFieldType {
  /** id */
  id?: string;

  /** 字段类型 */
  columnType: string;

  /** 属性类型 */
  attrType: string;

  /** 属性包名 */
  packageName: string;
}
