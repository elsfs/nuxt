import { useRequest } from '../core/api';
import { requestClient } from '../request';

export const { useRequestHandle, requestPath } = useRequest('/dept');

/**
 * 根据用户id查询用户部门信息
 */
export async function getByUserId(userId: string): Promise<string[]> {
  return requestClient().get(`/user/dept/getByUserId/${userId}`);
}

/**
 * 获取用户信息
 * @deprecated
 */
export async function tree(params: Record<string, any>) {
  return requestClient().get('/dept/tree', { params });
}
