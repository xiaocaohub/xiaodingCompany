import request from "../https";
let { entries } = Object;

// 银行卡列表
export const bankList = params => {
  return request({
    method: "post",
    params
  });
};

// 删除银行卡
export const delBank = params => {
  return request({
    method: "post",
    params
  });
};

// 添加/编辑银行卡
export const addBank = params => {
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

// 设置默认银行卡
export const setDefault = params => {
  return request({
    method: "post",
    params
  });
};
