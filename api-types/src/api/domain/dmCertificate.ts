import { useRequest } from '../core/api';
import { requestClient } from '../request';

export const { useRequestHandle, requestPath } = useRequest('/dmCertificate');

export interface DmCertificate {
  // 主键ID
  certificateId?: string;

  // 域名
  domain?: string;

  // SSL证书
  sslCertificate?: string;

  // SSL证书私钥
  sslCertificateKey?: string;

  // SSL签发时间
  startTime?: string; // 格式: "yyyy-MM-dd HH:mm:ss"

  // SSL过期时间
  expireTime?: string; // 格式: "yyyy-MM-dd HH:mm:ss"

  // 备注
  remark?: string;

  // 继承自BaseEntity的字段
  createTime?: string;
  updateTime?: string;
  createBy?: string;
  updateBy?: string;
  delFlag?: number;
}

export function parseCertificateToJson(
  certificate: string,
): Promise<Record<never, never>> {
  return requestClient().post<Record<never, never>>(
    '/parsePublicCert/parseCertificateToJson',
    {
      certificate,
    },
  );
}
