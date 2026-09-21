import { requestClient } from '../request';

/**
 * 表信息 --列信息
 */
export interface TableColumnVO {
  /** 目录 */
  tableCatalog: string;
  /** 模式 库名 */
  tableSchema: string;
  /** 表名 */
  tableName: string;
  /** 字段名 */
  columnName: string;
  /** 字段位置 排序 */
  ordinalPosition: string;
  /** 默认值 */
  columnDefault: string;
  /** 是否为空 */
  isNullable: string;
  /** 字段类型 */
  dataType: string;
  /** 最大长度 */
  characterMaximumLength: string;
  /** 字节长度 */
  characterOctetLength: string;
  /** 精度 */
  numericPrecision: string;
  /** 小数位数 */
  numericScale: string;
  /** 日期精度 */
  datetimePrecision: string;
  /** 字符集 */
  characterSetName: string;
  /** 排序规则 */
  collationName: string;
  /** 字段类型 */
  columnType: string;
  /** 字段键值 pri 主键 mul 多重索引 */
  columnKey: string;
  /** 额外信息 自增 */
  extra: string;
  /** 权限 */
  privileges: string;
  /** 字段描述 */
  columnComment: string;
  /** 表达式 */
  generationExpression: string;
  /** 空间 id */
  srsId: string;
}

/**
 * 分页查询
 */
export async function tablePage(params) {
  return requestClient().get(`/table/page`, { params });
}
/**
 * 查询表属性列表
 */
export async function tableColumnList(
  dsName: string,
  tableName: string,
): Promise<TableColumnVO[]> {
  return requestClient().get(`/table/tableColumnList/${dsName}/${tableName}`);
}
