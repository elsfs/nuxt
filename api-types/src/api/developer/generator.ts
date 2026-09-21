import { requestClient } from '../request';
/**
 * ZIP 下载生成代码
 */
export async function tablePage(params) {
  return requestClient().get(`/generator/download`, { params });
}

/**
 * 预览代码
 */
export async function preview(data) {
  return requestClient().post(`/generator/preview`, data);
}
