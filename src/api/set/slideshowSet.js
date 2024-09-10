import request from "../https";
let { entries } = Object;

// 轮播图路径分类
export const bannerPathList = params => {
  return request({
    method: "post",
    params
  });
};

// 添加/编辑轮播图信息
export const addBannerInfo = params => {
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

// 获取轮播图列表
export const bannerList = params => {
  return request({
    method: "post",
    params
  });
};

// 删除轮播图
export const delBannerById = params => {
  return request({
    method: "post",
    params
  });
};

// 修改轮播图序号
export const setBannerSort = params => {
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
