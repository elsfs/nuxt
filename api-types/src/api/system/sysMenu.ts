import { useRequest } from '../core/api';
import { requestClient } from '../request';

export enum MenuType {
  BUTTON = '2', //             按钮
  CATALOG = '0', //             目录
  MENU = '1', //             菜单
}

// 默认组件名称
export const defaultComponentName = 'BasicLayout';

export interface SysMenu {
  menuId: string;
  menuName: string;
  parentId: string;
  type: string;
  icon: string;
}
interface RolMenuSaveCO {
  roleId: string;
  menuIds: string[];
}

interface DeptMenuSaveCO {
  deptId: string;
  menuIds: string[];
}
interface UserMenuSaveCO {
  userId: string;
  menuIds: string[];
}
export const { useRequestHandle, requestPath } = useRequest('/menu');

export const getMenuIdByRoleId = (roleId: string) =>
  requestClient().get(`/roleMenu/getMenuIdByRoleId/${roleId}`);
export const saveRoleMenu = (data: RolMenuSaveCO) =>
  requestClient().post(`/roleMenu/saveRoleMenu`, data);

export const getMenuIdsByDeptId = (roleId: string) =>
  requestClient().get(`/deptMenu/getMenuIdsByDeptId/${roleId}`);
export const saveDeptMenu = (data: DeptMenuSaveCO) =>
  requestClient().post(`/deptMenu/saveDeptMenu`, data);
/**
 * 保存用户菜单
 * @param data 保存参数
 */
export const saveUserMenu = (data: UserMenuSaveCO) =>
  requestClient().post(`/userMenu/saveUserMenu`, data);

/**
 * 根据用户ID获取菜单ID
 * @param userId 用户ID
 */
export const getMenuIdsByUserId = (userId: string) =>
  requestClient().get(`/userMenu/getMenuIdsByUserId/${userId}`);
