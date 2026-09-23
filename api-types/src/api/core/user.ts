import type { UserInfo } from '@vben/types';

import { requestClient } from '../request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient().get<UserInfo>('/user/getUserInfo');
}

/**
 * 根据角色id获取用户信息
 *
 */
export const getUserBYRoleId = (roleId: string) => {
  return requestClient().get<string[]>(`/user/role/getRoleIds/${roleId}`);
};
type UserRole = {
  roleId: string;
  userIds: string[];
};
export const addUserRole = (data: UserRole) => {
  return requestClient().post(`/user/role/addUserRole`, data);
};
export type DeleteUserRole = {
  roleId: string;
  userId: string;
};
/**
 * 删除角色的用户
 */
export const deleteUserRole = (data: DeleteUserRole) => {
  return requestClient().delete(`/user/role/deleteUserRole`, {
    data,
  });
};
