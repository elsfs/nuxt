import { defineStore } from 'pinia';

/**
 * 网络请求异常提示（错误弹窗）数据模型。
 * 与 xjx-onehip-frontend/common/xjx-common 的 base store 保持一致：
 * 请求层把异常写入 errorList，由全局 <ErrorMessage /> 组件消费为弹窗。
 */
export interface ErrorListItem {
  /** 错误弹窗关闭后的回调（由请求 config.callback 透传） */
  callback?: (data: any) => void;
  /** 请求参数 */
  data?: any;
  id: number;
  /** 请求方法 */
  method?: string;
  /** 提示信息 */
  msg: string;
  /** 完整的响应体，用于弹窗「响应信息/响应状态」展示 */
  res: any;
  /** 请求接口 */
  url?: string;
}

export const useErrorStore = defineStore('error', {
  state: () => ({
    /** 是否显示错误弹窗的「展开详情」按钮 */
    showErrorBtn: true,
    /** 待展示的错误列表，请求层写入后由弹窗组件移出 */
    errorList: [] as ErrorListItem[],
    /** 记录已点击确定的接口，供业务层做二次确认 */
    errorSureObj: {} as Record<string, number>,
  }),
  actions: {
    /**
     * 记录一条错误日志（由请求响应拦截器调用）
     */
    setErrorList(info: Omit<ErrorListItem, 'id'> & { id?: number }) {
      this.errorList.push({
        id: Math.random(),
        ...info,
      });
    },
    removeErrorList(id: number) {
      const index = this.errorList.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.errorList.splice(index, 1);
      }
    },
    sureErrorObj(url: string) {
      this.errorSureObj[url] = 1;
      setTimeout(() => {
        Reflect.deleteProperty(this.errorSureObj, url);
      }, 300);
    },
    /** 控制错误弹窗是否展示「展开详情」按钮 */
    setShowErrorBtn(show: boolean) {
      this.showErrorBtn = show;
    },
  },
});
