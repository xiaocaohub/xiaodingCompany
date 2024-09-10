import request from "../https";
let { entries } = Object;

// 获取优惠券信息
export const getCouponCardInfo = params => {
  return request({
    method: "post",
    params
  });
};

// 活动是否显示开关
export const activityisDisplay = params => {
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

// 删除优惠券活动
export const delCoupon = params => {
  return request({
    method: "post",
    params
  });
};

// 优惠券活动领取记录
export const seeCouponLogger = params => {
  return request({
    method: "post",
    params
  });
};

// 优惠券赠送记录
export const seeGiveCouponLogger = params => {
  return request({
    method: "post",
    params
  });
};

// 获取符合赠券的会员列表
export const getGiveUserInfo = params => {
  return request({
    method: "post",
    params
  });
};

// 赠劵
export const receiveUserCoupon = params => {
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
// 获取商品分类
export const choiceClass = params => {
  return request({
    method: "post",
    params
  });
};
// 开启店铺主页领卷入口-开关
export const couponSwitch = params => {
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

// 添加优惠劵
export const addCoupon = params => {
  let formData = new FormData();
  for (let [key, value] of entries(params)) {
    if (value!==null) {
      formData.append(key, value);
    } else {
    }
  }
  return request({
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  //   return request({
  //     method: "post",
  //     params
  //   });
};

// 获取指定商品列表
export const getAssignGoods = params => {
  return request({
    method: "post",
    params
  });
};
// 批量删除优惠券
export const bulkDeletion = params => {
  return request({
    method: "post",
    params
  });
};
// 获取全部优惠券
export const allCoupons = params => {
  return request({
    method: "post",
    params
  });
};
// 获取指定分类列表
export const getAssignGoodsClass = params => {
  return request({
    method: "post",
    params
  });
};
