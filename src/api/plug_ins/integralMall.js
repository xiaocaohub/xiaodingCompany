import request from "../https";
let { entries } = Object;

// 获取积分商品列表
export const integralGoodsList = params => {
  return request({
    method: "post",
    params
  });
};

// 删除积分商品
export const delIntegralGoods = params => {
  return request({
    method: "post",
    params
  });
};

// 置顶积分商品
export const topIntegralGoods = params => {
  return request({
    method: "post",
    params
  });
};

// 积分商品列表
export const getProList = params => {
  return request({
    method: "post",
    params
  });
};

// 添加/编辑积分商品
export const addIntegral = params => {
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

// 添加库存
export const addStock = params => {
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

// 商品类别、品牌级联
export const get_class = params => {
  return request({
    method: "post",
    params
  });
};

// 积分订单列表
export const orderList = params => {
  return request({
    method: "post",
    params
  });
};

// 删除订单
export const delOrder = params => {
  return request({
    method: "post",
    params
  });
};

// 关闭订单
export const closeOrder = params => {
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

// 获取积分售后列表
export const getRefundList = params => {
  return request({
    method: "post",
    params
  });
};

// 获取积分配置信息
export const getConfigInfo = params => {
  return request({
    method: "post",
    params
  });
};

// 添加/编辑配置信息
export const addConfigInfo = params => {
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
