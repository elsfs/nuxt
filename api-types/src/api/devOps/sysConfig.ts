import { useRequest } from '../core/api';
import { requestClient } from '../request';

export const { useRequestHandle, requestPath } = useRequest('/sysConfig');
/**
 * 系统配置
 */
export interface SysConfig {
  /** 配置ID */
  configId: string;
  /** 配置KEY */
  configKey: string;
  /** 配置名称 */
  configName: string;
  /** 配置值 */
  configValue: string;
  /** 配置类型 */
  configType: string;
  /** 配置描述 */
  remark: string;
}

// 配置项
export const configItem = {
  ENABLE_USER_MENU: 'ENABLE_USER_MENU', // 是否启用用户菜单
  ENABLE_USER_MULTIPLE_POST: 'ENABLE_USER_MULTIPLE_POST', // 是否允许用户多个岗位
  ENABLE_USER_MULTIPLE_DEPT: 'ENABLE_USER_MULTIPLE_DEPT', // 是否允许用户多个部门
};
export const getConfigByConfigKey = (configKey: string) => {
  // 获取配置项
  return requestClient().get<SysConfig>('/sysConfig/getConfigByConfigKey', {
    params: { configKey },
  });
};
