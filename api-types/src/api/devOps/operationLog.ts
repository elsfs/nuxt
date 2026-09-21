import {useRequest} from "../core/api";



/**
 * 操作日志实体
 * @author zeng
 */
export interface OperationLog extends BaseEntity {
  /** ID */
  operationLogId: string;

  /** 操作用户ID */
  userId: string;

  /** 操作用户名 */
  username: string;

  /** 操作模块 */
  module: string;

  /** 操作类型：CREATE、UPDATE、DELETE、QUERY、LOGIN、LOGOUT、OTHER */
  operationType: string;

  /** 操作描述 */
  description: string;

  /** 请求方法（GET、POST、PUT、DELETE） */
  requestMethod: string;

  /** 请求URL */
  requestUrl: string;

  /** 请求参数 */
  requestParams: string;

  /** 响应数据 */
  responseData: string;

  /** IP地址 */
  ip: string;

  /** 设备信息 */
  deviceInfo: string;

  /** 执行时长（毫秒） */
  executeTime: number;

  /** 操作状态：success、fail */
  status: string;

  /** 错误信息 */
  errorMsg: string;
}

/**
 * 操作日志基础实体（如果基类也需要定义）
 */
export interface BaseEntity {
  /** 创建时间 */
  createTime?: Date | string;
  /** 更新时间 */
  updateTime?: Date | string;
  /** 创建人 */
  createBy?: string;
  /** 更新人 */
  updateBy?: string;

}



export const { useRequestHandle, requestPath } = useRequest('/operationLog');
