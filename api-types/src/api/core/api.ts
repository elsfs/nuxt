import { ElMessage, ElMessageBox } from 'element-plus';

import { requestClient } from '../request';

enum Api {
  getCategoryData = '/sys/category/loadAllData',
  getDictItems = '/sys/dict/getDictItems/',
  getTableList = '/sys/user/queryUserComponentData',
  loadDictItem = '/sys/category/loadDictItem/',
  loadTreeData = '/sys/category/loadTreeData',
  positionList = '/sys/position/list',
  queryDepartTreeSync = '/sys/sysDepart/queryDepartTreeSync',
  queryTreeList = '/sys/sysDepart/queryTreeList',
  roleList = '/sys/role/list',
  userList = '/sys/user/list',
}

type IdType = (number | string)[] | (number | string);
export function useRequest(prefix: string) {
  const requestPath = {
    pagePath: `${prefix}/page`, // 分页查询
    treePath: `${prefix}/tree`, // 树形结构
    logicPagePath: `${prefix}/logic/page`, // 分页查询软删除数据
    listPath: `${prefix}/list`, // 查询列表
    logicListPath: `${prefix}/logic/list`, // 列表查询软删除数据
    getByIdPath: `${prefix}/getById`, // 通过id查询数据源表
    editStatePath: `${prefix}/editState`, // 修改状态
    restoreByIdPath: `${prefix}/logic/add`, // 恢复软删除数据
    addPath: `${prefix}/add`, // 添加接口
    logicAddPath: `${prefix}/logic/add`, // 批量恢复软删除数据 根据id恢复软删除数据logic/add/{id}
    editPath: `${prefix}/edit`, // 修改接口
    delPath: `${prefix}/del`, // 删除 根据id删除接口del/{id}
    logicDelPath: `${prefix}/logic/del`, // 删除 根据id删除接口del/{id}
    exportPath: `${prefix}/exportXls`, // 导出
    importPath: `${prefix}/importXls`, // 导入
  };
  const useRequestHandle = {
    /**
     * 分页列表接口
     * @param params
     */
    page: (params: Record<string, any>) =>
      requestClient().get(requestPath.pagePath, {
        params,
      }),
    /**
     * 分页列表接口 -- 软删除数据
     * @param params
     */
    logicPage: (params: Record<string, any>) =>
      requestClient().get(requestPath.logicPagePath, { params }),
    /**
     * 列表接口(查询用户，通过租户隔离)
     * @param params
     */
    list: (params: Record<string, any>) =>
      requestClient().get(requestPath.listPath, { params }),
    /**
     * 分页列表接口 -- 软删除数据
     * @param params
     */
    logicList: (params: Record<string, any>) =>
      requestClient().get(requestPath.logicListPath, { params }),

    /**
     * 树形结构
     * @param params
     */
    tree: (params?: Record<string, any>) =>
      requestClient().get(requestPath.treePath, { params }),
    /**
     * 通过id查询数据源表
     * @param id
     */
    getById: (id: string) =>
      requestClient().get(`${requestPath.getByIdPath}/${id}`),
    /**
     * 修改状态
     * @param params
     */
    editState: (params: Record<string, any>) =>
      requestClient().put(requestPath.editStatePath, { params }),
    /**
     * 添加接口
     * @param params
     */
    add: (params: Record<string, any>) =>
      requestClient().post(requestPath.addPath, params),
    /**
     * 恢复数据
     * @param data Api
     * @param handleSuccess
     */
    logicAdd: (data: Record<string, any>, handleSuccess: () => void) => {
      ElMessageBox.confirm('确认恢复吗', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action: any) => {
          if (action !== 'confirm') return;
          if (Array.isArray(data)) {
            return requestClient()
              .put(requestPath.logicAddPath, data)
              .then(() => handleSuccess && handleSuccess());
          }
          return requestClient()
            .put(`${requestPath.logicAddPath}/${data}`)
            .then(() => handleSuccess && handleSuccess());
        },
      });
    },
    /**
     * 修改接口
     * @param data
     */
    edit: (data: Record<string, any>) =>
      requestClient().put(requestPath.editPath, data),
    /**
     * 删除 根据id删除接口
     * @param data
     * @param handleSuccess
     */
    del: (data: IdType, handleSuccess: () => void) => {
      ElMessageBox.confirm('确认删除', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action: string) => {
          if (action !== 'confirm') return;
          return Array.isArray(data)
            ? requestClient()
                .delete(requestPath.delPath, { data })
                .then(() => handleSuccess && handleSuccess())
            : requestClient()
                .delete(`${requestPath.delPath}/${data}`)
                .then(() => handleSuccess && handleSuccess());
        },
      });
    },
    /**
     * 删除 根据id删除接口
     * @param data
     * @param handleSuccess
     */
    logicDel: (data: IdType, handleSuccess?: () => void) => {
      ElMessageBox.confirm('确认彻底删除吗', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action: string) => {
          if (action !== 'confirm') return;
          return Array.isArray(data)
            ? requestClient()
                .delete(requestPath.logicDelPath, { data })
                .then(() => handleSuccess && handleSuccess())
            : requestClient()
                .delete(`${requestPath.logicDelPath}/${data}`)
                .then(() => handleSuccess && handleSuccess());
        },
      });
    },
  };

  return {
    requestPath,
    useRequestHandle,
  };
}

const baseUploadUrl = '';
/**
 * 上传父路径
 */
export const uploadUrl = `${baseUploadUrl}/sys/common/upload`;

/**
 * 职务请求接口
 */
export const useRequestPost = useRequest('/post');
/**
 * 职务请求接口
 */
export const useRequestUser = useRequest('/user');
/**
 * 角色请求接口
 */
export const useRequestRole = useRequest('/role');
export const useRequestDept = useRequest('/dept');

/**
 * 根据用户id获取角色id
 * @param userId userId
 */
export const getRoleIdByUserId = (userId: number | string) => {
  return requestClient().get(
    '/user/dept/getByUserId'.concat('/', userId.toString()),
  );
};
/**
 * 根据用户id获取角色id
 * @param userId userId
 */
export const getPostIdsByUserId = (userId: number | string) => {
  return requestClient().get(
    '/user/post/getByUserId'.concat('/', userId.toString()),
  );
};

/**
 * 根据用户id获取部门id
 * @param userIds
 */
export const getDeptIdsByUserIds = (userIds: number | string) => {
  return requestClient().get(
    '/user/dept/getByUserId'.concat('/', userIds.toString()),
  );
};

/**
 * 用户列表
 * @param params
 */
export const getUserList = (params: Record<string, any>) => {
  return requestClient().get(Api.userList, { params });
};

/**
 * 角色列表
 * @param params
 */
export const getRoleList = (params: Record<string, any>) => {
  return requestClient().get(Api.roleList, { params });
};

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export const getFileblob = (url, parameter) => {
  return requestClient().get(url, {
    params: parameter,
    responseType: 'blob',
    isTransformResponse: false,
  });
};

/**
 * 下载文件
 * @param url 文件路径
 * @param fileName 文件名
 * @param parameter
 * @returns {*}
 */
export const downloadFile = (url, fileName?, parameter?) => {
  return getFileblob(url, parameter).then((data) => {
    if (!data || data.size === 0) {
      ElMessage.warning('文件下载失败');
      return;
    }
    if (window.navigator.msSaveBlob === undefined) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.append(link);
      link.click();
      link.remove(); // 下载完成移除元素
      window.URL.revokeObjectURL(url); // 释放掉blob对象
    } else {
      window.navigator.msSaveBlob(new Blob([data]), fileName);
    }
  });
};
