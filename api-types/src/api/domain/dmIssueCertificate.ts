import { useRequest } from '../core/api';
import { requestClient } from '../request';

export const { useRequestHandle, requestPath } = useRequest(
  '/dmIssueCertificate',
);

/**
 * 生成检测
 */
export function generateVerification(issueCertificateId: string) {
  return requestClient().post(
    `/dmIssueCertificate/generateVerification/${issueCertificateId}`,
    {},
    {
      timeout: 1000 * 60,
    },
  );
}

/**
 * 获取挑战信息
 * @param issueCertificateId
 */
export function getCertificateChallenges(issueCertificateId: string) {
  return requestClient().get<DmChallengeInfo[]>(
    `/dmIssueCertificate/getCertificateChallenges/${issueCertificateId}`,
    {
      timeout: 1000 * 60,
    },
  );
}

/**
 * 挑战方式
 */
type ChallengeType = 'dns-01' | 'http-01';

/**
 * 验证证书
 */
export interface VerifyCertificateCO {
  issueCertificateId: string;
  challengeType: ChallengeType;
}

export function verifyCertificate(data: VerifyCertificateCO) {
  return requestClient().post(`/dmIssueCertificate/verifyCertificate`, data, {
    timeout: 1000 * 60,
  });
}

/**
 * 申请证书实体
 * 步骤：
 * 1、验证域名 http(ssh) dns(dns-api)
 * 2、签发证书
 * 3、部署证书 ssh api
 */
export interface DmIssueCertificate {
  /** 主键ID */
  issueCertificateId: string;

  /** 域名列表（JSON字符串） */
  domainRaw?: string;

  /** SSL证书 */
  sslCertificate?: string;

  /** SSL证书私钥 */
  sslCertificateKey?: string;

  /** SSL签发时间 */
  startTime?: string; // 格式: "yyyy-MM-dd HH:mm:ss"

  /** SSL过期时间 */
  expireTime?: string; // 格式: "yyyy-MM-dd HH:mm:ss"

  /** 证书提供商 */
  directoryType?: string;

  /** 加密方式 (RSA等) */
  keyType?: string;

  /** 域名验证类型 http dns */
  challengeType?: string;

  /** 验证文件部署方式 ssh dns */
  challengeDeployTypeId?: number;

  /** 验证文件部署账号 */
  challengeDeployId?: string;

  /** 验证文件部署状态 */
  challengeDeployStatus?: number;

  /** 验证文件部署目录 */
  deployVerifyPath?: string;

  /** 域名验证token */
  token?: string;

  /** 域名验证数据 */
  validation?: string;

  /** 验证状态url */
  statusUrl?: string;

  /** 验证状态 valid pending */
  validationStatus?: string;

  /** 部署方式 ssh api oss */
  deployTypeId?: string;

  /** 部署机器 */
  deployHostId?: string;

  /** key部署路径 */
  deployKeyFile?: string;

  /** pem部署路径 */
  deployFullchainFile?: string;

  /** 部署重启命令 */
  deployReloadcmd?: string;

  /** 部署请求url */
  deployUrl?: string;

  /** 部署请求头（JSON字符串） */
  deployHeaderRaw?: string;

  /** 部署参数（JSON字符串） */
  deployParamsRaw?: string;

  /** ssl证书文件部署状态 */
  sslDeployStatus?: number;

  /** 自动续期 */
  isAutoRenew?: boolean;

  /** 数据版本号 */
  version?: number;

  /** 挑战URL - 只读属性，由token计算得出 */
  challengeUrl?: string;

  /** 是否有SSL证书 - 只读属性，由sslCertificate计算得出 */
  hasSslCertificate?: boolean;
  createAt?: string;
  updateAt?: string;
  deleted?: number;
}

export interface CertificateChallenge {
  type: string;
}

// DmChallengeInfo.ts

export interface DmChallengeInfo {
  domain: string;
  type: string;
  challengeEntity: ChallengeEntity;
  token: string;
  validation: string;
}

export interface ChallengeEntity {
  status: string;
  token: string;
  type: string;
  url: string;
}
