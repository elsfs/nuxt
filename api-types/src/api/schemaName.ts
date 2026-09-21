const isDynamic: boolean = false;
interface SchemaName {
  system: string;
  ai: string;
  cms: string;
  codegen: string;
  oauth: string;
  std: string;
}
class DynamicSchemaName implements SchemaName {
  ai = 'e_ai';
  cms = 'e_cms';
  codegen = 'e_codegen';
  oauth = 'e_oauth';
  std = 'e_std';
  system = 'e_admin';
}
class MonomerSchemaName implements SchemaName {
  ai = 'admin';
  cms = 'admin';
  codegen = 'admin';
  oauth = 'admin';
  std = 'admin';
  system = 'admin';
}
// 动态返回的表名
export const schemaName: SchemaName = isDynamic
  ? new DynamicSchemaName()
  : new MonomerSchemaName();
