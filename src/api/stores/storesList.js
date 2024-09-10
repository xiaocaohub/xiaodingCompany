import request from "../https";
let { entries } = Object;

// 获取门店列表
export const index = params => {
  return request({
    method: "post",
    params
  });
};

// 添加/编辑我的门店
export const addStore = params => {
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

// 删除我的门店
export const delStore = params => {
  return request({
    method: "post",
    params
  });
};

// 设置默认门店
export const setDefaultStore = params => {
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

// 获取管理员列表
export const getAdmin = params => {
  return request({
    method: "post",
    params
  });
};

// 添加/编辑管理员
export const addAdmin = params => {
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

// 删除管理员
export const delAdmin = params => {
  return request({
    method: "post",
    params
  });
};