/**
 * app 内专属请求客户端：基于共享 @vben/api-types 的 createRequestClient 创建，
 * 并装配 token 注入、认证刷新与错误提示等 app 私有逻辑，最后注入回共享包。
 */
import {
  configureRequestClients,
  createRequestClient,
  refreshTokenApi,
} from '@vben/api-types';
import { preferences } from '@vben/preferences';
import {
  authenticateResponseInterceptor,
  errorMessageResponseInterceptor,
  RequestClient,
} from '@vben/request';
import { useAccessStore } from '@vben/stores';

import { ElMessage } from 'element-plus';

import { useAuthStore } from '~/store';

const apiURL = import.meta.env.VITE_GLOB_API_URL || '/api';

function createAppRequestClient() {
  const client = createRequestClient(apiURL, { responseReturn: 'data' });

  /**
   * 重新认证逻辑
   */
  async function doReAuthenticate() {
    console.warn('Access token or refresh token is invalid or expired. ');
    const accessStore = useAccessStore();
    const authStore = useAuthStore();
    accessStore.setAccessToken(null);
    if (
      preferences.app.loginExpiredMode === 'modal' &&
      accessStore.isAccessChecked
    ) {
      accessStore.setLoginExpired(true);
    } else {
      await authStore.logout();
    }
  }

  /**
   * 刷新token逻辑
   */
  async function doRefreshToken() {
    const accessStore = useAccessStore();
    const resp = await refreshTokenApi();
    const newToken = resp.data;
    accessStore.setAccessToken(newToken);
    return newToken;
  }

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null;
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore();

      config.headers.Authorization = formatToken(accessStore.accessToken);
      config.headers['Accept-Language'] = preferences.app.locale;
      return config;
    },
  });


  // token过期的处理
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken,
      enableRefreshToken: preferences.app.enableRefreshToken,
      formatToken,
    }),
  );

  // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error: any) => {
      const responseData = error?.response?.data ?? {};
      const errorMessage = responseData?.error ?? responseData?.message ?? '';
      ElMessage.error(errorMessage || msg);
    }),
  );

  return client;
}

// 创建并注入共享包（后续所有 @vben/api-types 的 API 函数都会使用该 client）
const requestClient = createAppRequestClient();
const baseRequestClient = new RequestClient({ baseURL: apiURL });

configureRequestClients({ baseRequestClient, requestClient });

export { baseRequestClient, requestClient };
