import debounce from 'lodash/debounce';

import { requestClient } from '../request';

export interface DuplicateCheckQry {
  schemaName: string; // 数据库名
  tableName: string; // 表名
  fieldName: string; // 字段名
  fieldVal: string; // 字段值
  dataId?: string; // 数据ID
  keyName: string; // 主键名称
}
interface DuplicateCheckVO {
  // 是否通过
  pass: boolean;
  // 错误信息
  message: string;
}
/**
 * 重复校验接口
 */
export function doDuplicateCheck(params: DuplicateCheckQry) {
  return requestClient().get<DuplicateCheckVO>('/duplicate/check', {
    params,
  });
}

/**
 * 防抖版本，支持 async/await
 */
function debouncePromise<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number,
) {
  let resolveList: ((value: any) => void)[] = [];
  const debounced = debounce(async (...args: Parameters<T>) => {
    const result = await fn(...args);
    resolveList.forEach((r) => r(result));
    resolveList = [];
  }, delay);

  return (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> =>
    new Promise((resolve) => {
      resolveList.push(resolve);
      debounced(...args);
    });
}

export const doDuplicateCheckDebounced = debouncePromise(doDuplicateCheck, 500);
