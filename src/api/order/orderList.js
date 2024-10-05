import request from "../https";
let { entries } = Object;

// 获取订单列表
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

export const confirmOrder = params => {
  return request({
    method: "post",
    params
  });
};

// 订单详情
export const orderDetailsInfo = params => {
  return request({
    method: "post",
    params
  });
};
// 安排发货
export const sendGoods = params => {

  return request({
  
  
    method: "post",
    params
  });
};



// 取消发货
export const cancelSendGood = params => {
  return request({
    method: "post",
    params
  });
};



// 撤销备货完成
export const cancelGood =  params => {
  return request({
      method: "post",
      params
  });
};

// 备货完成
export const stockUpGood = params => {
  return request({
      method: "post",
      params
  });
};



export const confirmSendGood = params => {
  return request({
      method: "post",
      params
  });
};

// 编辑订单页面详情
export const editOrderView = params => {
  return request({
    method: "post",
    params
  });
};

// 编辑订单
export const saveEditOrder = params => {
  let formData = new FormData();
  for (let [key, value] of entries(params)) {
    if((key=='orderStatus'||key=='orderAmt')&&value==null){
    }else{
      formData.append(key, value);
    }
  }
  return request({
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

// 发货界面信息
export const deliveryView = params => {
  return request({
    method: "post",
    params
  });
};

// 发货提交
export const deliverySave = params => {
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

// 打印订单
export const orderPrint = params => {
  return request({
    method: "post",
    params
  });
};

//代客下单
export const helpOrder = params => {
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

// 获取商品列表
export const getGoodsConfigureList = params => {
  return request({
    method: "post",
    params
  });
};

// 获取订单统计
export const orderCount = params => {
  return request({
    method: "post",
    params
  });
};

// 获取代客下单结算数据
export const Settlement = params => {
  return request({
    method: "post",
    params
  });
};

// 获取物流信息
export const kuaidishow = params => {
  return request({
    method: "post",
    params
  });
};

// 获取快递公司
export const searchExpress = params => {
  return request({
    method: "post",
    params
  });
};

// 验证码提货（自提）
export const verificationExtractionCode = params => {
  return request({
    method: "post",
    params
  });
};
