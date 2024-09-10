import request from "../https";
let { entries } = Object;

// 获取店铺信息
export const index = params => {
  return request({
    method: "post",
    params
  });
};

// 注销店铺
export const delMchInfo = params => {
  return request({
    method: "post",
    params
  });
};

// 编辑店铺
export const editorStore = params => {
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
