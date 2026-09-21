import { useRequest } from '../core/api';
import { requestClient } from '../request';

export const { useRequestHandle, requestPath } = useRequest('/dict');
export const getListByDictCode = async (dictCode: string) => {
  return requestClient().get(`/dict/getListByDictCode/${dictCode}`);
};

export interface SysDict {
  // 字典ID
  dictId: string;
  // 字典名称
  dictName: string;
  // 表名 null表示在std_dict_item表，标准的基本上在该表
  tableName: string;
  // 是否是树形结构
  isTree: boolean;
  // 是否有独立数据表 配合table_name使用，0表示无独立数据表，1表示有独立数据表
  isIndependence: string;
  // 是否允许添加
  allowAdding: boolean;
  // 状态
  status: string;
  // 标准号
  stdNo: string;
  // 标准类别
  stdCategory: string;
  // 全部代替标准
  stdReplace: string;
  /** 中国标准分类号(chinese classification for standards) 字典 css */
  ccs: string;
  // 国际标准分类号(ICS) 字典 ics
  ics: string;
  // 字典描述
  dictDesc: string;
  // 字典code
  dictCode: string;
  // 标准类型
  dictType: string;
  // 参考网站
  website: string;
  // 备注
  remark: string;
  // 发布日期
  releaseDate: string;
  // 实施日期
  implementationDate: string;
  // 废止日期
  revocatoryDate: string;
}
