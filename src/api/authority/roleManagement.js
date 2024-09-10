import request from "../https";
let { entries } = Object;

// 获取管理员角色信息
export const getRoleListInfo = params => {
  return request({
    method: "post",
    params
  });
};

// 获取权限列表
export const getUserRoleInfo = params => {
  return request({
    method: "post",
    params
  });
};

// 删除角色
export const delUserRoleMenu = params => {
  return request({
    method: "post",
    params
  });
};

// 添加/修改角色
export const addUserRoleMenu = params => {
  let formData = new FormData();
  for (let [key, value] of entries(params)) {
    formData.append(key, value);
  }
  return request({
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
