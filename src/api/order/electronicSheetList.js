import request from "../https";

// 获取面单设置列表
export const getTableList = (params) => {
    return request({
      method: "post",
      params,
    });
  };

  export const del = (params) => {
    return request({
      method: "post",
      params,
    });
  };