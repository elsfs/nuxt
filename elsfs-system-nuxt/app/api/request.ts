/**
 * app 内专属请求客户端：基于共享 @vben/api-types 的 createRequestClient 创建，
 * 并装配 token 注入与统一异常提示（错误弹窗）等 app 私有逻辑，最后注入回共享包。
 *
 * 异常提示行为对齐 /Users/Zhuanz/company/xjx-onehip-frontend：
 * - 业务异常 / 网络异常统一写入 error store，由全局 <ErrorMessage /> 弹出详情；
 * - 401（业务码或 HTTP 状态码）提示「认证失败！」后直接登出；
 * - 用户主动取消的请求不提示；
 * - 支持单请求 showErr 开关（boolean 或函数）与关闭回调 callback。
 */
import type { RequestClientConfig, ResponseInterceptorConfig } from '@vben/request';

import {
  configureRequestClients,
  createRequestClient,
} from '@vben/api-types';
import { preferences } from '@vben/preferences';
import {
  AxiosError,
  isAxiosError,
  isCancel,
  RequestClient,
} from '@vben/request';
import { useAccessStore } from '@vben/stores';

import { ElMessage } from 'element-plus';

import { useAuthStore } from '~/store';
import { useErrorStore } from '~/store/error';

const apiURL = import.meta.env.VITE_GLOB_API_URL || '/api';

/** elsfs 后端统一响应 code=0 表示成功 */
const SUCCESS_CODE = 0;
/** 需要重新认证的业务码/HTTP 状态码 */
const AUTH_CODE = 401;

/** 参考项目的单请求扩展配置 */
export interface AppRequestExtraConfig {
  /** 错误弹窗关闭后的回调，入参为错误响应体 */
  callback?: (data: any) => void;
  /**
   * 是否展示本次请求的异常提示，默认 true。
   * 传函数时以函数返回值决定，便于按响应体动态判断。
   */
  showErr?: boolean | ((data: any) => boolean);
}

/** app 内可直接使用的请求配置类型（含 showErr / callback） */
export type AppRequestConfig<T = any> = RequestClientConfig<T> &
  AppRequestExtraConfig;

/** xjx-onehip-frontend：axios 错误码 -> 提示文案 */
function getAxiosErrorMessage(error: any): string {
  let msg = '系统错误！';
  if (isAxiosError(error)) {
    const status = error.request?.status ?? error.response?.status;
    switch (error.code) {
      case AxiosError.ERR_NETWORK: {
        msg = '网络异常，请检查网络连接！';
        break;
      }
      case AxiosError.ETIMEDOUT: {
        msg = '连接超时，请检查网络连接！';
        break;
      }
      case AxiosError.ECONNABORTED: {
        msg = '请求超时，请稍候重试！';
        break;
      }
      case AxiosError.ERR_BAD_REQUEST: {
        if (status === 404) {
          msg = '404 请求资源不存在';
        } else if (status === 409) {
          msg = '409 重复请求！';
        } else {
          msg = '请求错误！';
        }
        break;
      }
      case AxiosError.ERR_DEPRECATED: {
        msg = '请求已废弃！';
        break;
      }
      case AxiosError.ERR_BAD_RESPONSE: {
        msg = '服务器响应异常，请稍候重试！';
        break;
      }
      default: {
        break;
      }
    }
  }
  return msg;
}

/** 写入错误日志，交给全局弹窗展示 */
function addErrorToList(options: {
  callback?: (data: any) => void;
  data?: any;
  method?: string;
  msg: string;
  res: any;
  url?: string;
}) {
  const errorStore = useErrorStore();
  errorStore.setErrorList({
    data: options.data ?? {},
    url: options.url ?? '',
    method: options.method ?? '',
    msg: options.msg,
    res: options.res,
    callback: options.callback,
  });
}

/** 认证失败：提示后直接登出（对齐 xjx-onehip-frontend） */
function doReAuthenticate(msg?: string) {
  ElMessage.error(msg || '认证失败！');
  setTimeout(() => {
    const authStore = useAuthStore();
    void authStore.logout();
  }, 500);
}

/** 统一异常提示拦截器 */
function errorMessageResponseInterceptor(): ResponseInterceptorConfig {
  return {
    rejected: (error: any) => {
      // 用户主动取消的请求：静默
      if (error?.code === AxiosError.ERR_CANCELED || isCancel(error)) {
        return Promise.reject(error);
      }

      const config = (error?.config ?? {}) as AppRequestConfig;
      const responseData = error?.response?.data ?? {};
      const status: number | undefined = error?.response?.status;

      // showErr 默认为 true，支持函数动态判断
      let showErr = config.showErr ?? true;
      if (typeof showErr === 'function') {
        try {
          showErr = Boolean(showErr(responseData));
        } catch {
          showErr = true;
        }
      }

      const code = responseData?.code;
      // 业务异常：HTTP 2xx，但响应体 code 非成功码
      const isBusinessError =
        code !== undefined &&
        code !== null &&
        Number(code) !== SUCCESS_CODE &&
        (status === undefined || (status >= 200 && status < 300));
      const isAuthError =
        (isBusinessError && Number(code) === AUTH_CODE) || status === AUTH_CODE;

      if (isAuthError) {
        const authMsg = responseData?.message ?? responseData?.msg;
        doReAuthenticate(showErr ? authMsg : undefined);
        return Promise.reject(error);
      }

      if (!showErr) {
        return Promise.reject(error);
      }

      if (isBusinessError) {
        addErrorToList({
          data: config.data,
          url: config.url,
          method: config.method,
          msg: responseData?.message ?? responseData?.msg ?? '服务器异常！',
          res: responseData,
          callback: config.callback,
        });
        return Promise.reject(error);
      }

      addErrorToList({
        data: config.data,
        url: config.url,
        method: config.method,
        msg: getAxiosErrorMessage(error),
        res: error?.response?.data ?? '',
        callback: config.callback,
      });
      return Promise.reject(error);
    },
  };
}

function createAppRequestClient() {
  const client = createRequestClient(apiURL, { responseReturn: 'data' });

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null;
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore();

      config.headers.Authorization = formatToken(accessStore.accessToken);
      config.headers['Accept-Language'] = preferences.app.locale;
      // showErr 默认为 true（对齐 xjx-onehip-frontend）
      const appConfig = config as typeof config & AppRequestExtraConfig;
      appConfig.showErr ??= true;
      return config;
    },
  });

  // 统一的错误处理：业务异常 / 网络异常 -> 全局错误弹窗；401 -> 提示后登出
  client.addResponseInterceptor(errorMessageResponseInterceptor());

  return client;
}

// 创建并注入共享包（后续所有 @vben/api-types 的 API 函数都会使用该 client）
const requestClient = createAppRequestClient();
const baseRequestClient = new RequestClient({ baseURL: apiURL });

configureRequestClients({ baseRequestClient, requestClient });

export { baseRequestClient, requestClient };
