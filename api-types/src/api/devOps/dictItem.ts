import { useRequest } from '../core/api';

export const { useRequestHandle, requestPath } = useRequest('/stdDictItem');

export interface StdDictItem {
  dictItemId: string;
  dictId: string;
  label: string;
  value: string;
  parentId: string;
  depth: number;
  customType: string;
  css: string;
  remark: string;
  icon: string;
  status: string;
  orderNo: number;
}
