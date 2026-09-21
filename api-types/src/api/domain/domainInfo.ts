import { ElMessageBox } from 'element-plus';

import { useRequest } from '../core/api';
import { requestClient } from '../request';

export const { useRequestHandle, requestPath } = useRequest('/domainInfo');

export function updateDomainInfo() {
  requestClient().post('/domainInfo/updateDomainInfo');
}
export function updateWhois(domainInfoId: string, handleSuccess: () => void) {
  ElMessageBox.confirm('确认更新Whois吗', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    callback: (action: any) => {
      if (action !== 'confirm') return;
      return requestClient()
        .post(`/domainInfo/updateWhois/${domainInfoId}`)
        .then(() => handleSuccess && handleSuccess());
    },
  });
}
/**
 * 域名信息表
 */
export interface DomainInfo {
  /**
   * 主键ID
   */
  domainInfoId: string;

  /**
   * 分组ID
   */
  groupId?: string;

  /**
   * 域名
   */
  domain?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 域名注册商
   */
  domainRegistrar?: string;

  /**
   * 域名注册商地址
   */
  domainRegistrarUrl?: string;

  /**
   * 域名注册时间
   */
  domainStartTime?: string;

  /**
   * 域名过期时间
   */
  domainExpireTime?: string;

  /**
   * 域名过期剩余天数
   */
  domainExpireDays?: number;

  /**
   * 域名信息自动更新
   */
  autoUpdate?: boolean;

  /**
   * 域名过期监测
   */
  expireMonitor?: boolean;

  /**
   * 主办单位名称
   */
  icpCompany?: string;

  /**
   * ICP备案/许可证号
   */
  icpLicence?: string;

  /**
   * 标签list;
   */
  tagsRaw?: string;

  /**
   * 数据版本号
   */
  version?: number;
  domainTime: (string | undefined)[]; // 域名时间
}
