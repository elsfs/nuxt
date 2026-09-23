// AuthApi 为纯类型 namespace（运行时被擦除），类型消费方应使用
// `import type { AuthApi } from '@vben/api-types'`
export {
  getAllMenusApi,
  getUserInfoApi,
  loginApi,
  logoutApi,
  refreshTokenApi,
} from '@vben/api-types';

export * from './request';
