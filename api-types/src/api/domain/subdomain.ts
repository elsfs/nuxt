import { ElMessageBox } from 'element-plus';

import { useRequest } from '../core/api';
import { requestClient } from '../request';

export const { useRequestHandle, requestPath } = useRequest('/subdomain');
// subdomain.ts
export function updateAllDomainCertInfo() {
  requestClient().post('/subdomain/updateAllDomainCertInfo');
}

export function updateAllDomainCertInfoBySubdomainId(
  subdomainId: string,
  handleSuccess: () => void,
) {
  ElMessageBox.confirm('确认更新ssl信息吗', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    callback: (action: any) => {
      if (action !== 'confirm') return;
      return requestClient()
        .post(`/subdomain/updateAllDomainCertInfo/${subdomainId}`)
        .then(() => handleSuccess && handleSuccess());
    },
  });
}
export interface Subdomain {
  /**
   * 子域名ID
   */
  subdomainId: string;

  /**
   * 域名ID
   */
  domainId: string;

  /**
   * 子域名名称
   */
  subdomainName: string;

  /**
   * 分组ID
   */
  groupId: string;

  /**
   * 端口号
   */
  port: number;

  /**
   * 检查时间
   */
  checkTime: string; // 使用字符串表示 ISO 8601 时间格式，或者你可以使用 Date 类型

  /**
   * 主机数量
   */
  hostCount: number;

  /**
   * 备注
   */
  remark: string;
}
