import { baseRequestClient, requestClient } from '../request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 * 后端 result 中返回的是 snake_case 的 access_token，
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient().post<AuthApi.LoginResult>('/login', data);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient().post<AuthApi.RefreshTokenResult>('/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient().post('/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient().get<string[]>('/codes');
}
