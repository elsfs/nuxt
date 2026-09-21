import { useRequest } from '../core/api';

/**
 * 子系统
 */
export interface SysSubsystem {
  /** 子系统ID */
  subsystemId?: string;
  /** 子系统名称 */
  subsystemName?: string;
  /** 子系统编码 */
  subsystemCode?: string;
  /** 排序 */
  sort?: number;
  /** 图标 */
  icon?: string;
  /** 状态 */
  status?: number;
  /** 备注 */
  remark?: string;
  /** 拼音码 */
  pinyinCode?: string;
  /** 五笔码 */
  wubiCode?: string;
  /** 创建时间 */
  createAt?: string;
  /** 创建人 */
  createBy?: string;
  /** 更新时间 */
  updateAt?: string;
  /** 更新人 */
  updateBy?: string;
  /** 删除标识 */
  deleteFlag?: string;
}


export const { useRequestHandle, requestPath }
  = useRequest('/sysSubsystem');
