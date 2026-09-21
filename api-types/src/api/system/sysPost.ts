import { useRequest } from '../core/api';
import { requestClient } from '../request';

export const { useRequestHandle, requestPath } = useRequest('/post');
/**
 * 根据用户id查询用户职位信息
 */
export async function getPostIdsByUserId(userId: string): Promise<string[]> {
  return requestClient().get(`/user/post/getByUserId/${userId}`);
}
/**
 * 部门
 */
export interface SysPost {
  /**
   * postId
   */
  postId: string;

  /**
   * 职务编码
   */
  postCode?: string;

  /**
   * 职务名称
   */
  postName: string;

  /**
   * 职级
   */
  postRank: string;

  /**
   * 状态
   */
  status?: string;

  /**
   * 排序
   */
  orderNo: number;

  /**
   * 备注
   */
  remark?: string;
}
