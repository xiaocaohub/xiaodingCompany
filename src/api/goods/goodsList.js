import qs from "qs";
import request from "../https";
let { entries } = Object;

// 获取实物/虚拟商品
export const index = params => {
  return request({
    method: "post",
    params
  });
};

// 删除商品
export const delGoodsById = params => {
  return request({
    method: "post",
    params
  });
};
// 上下移动商品位置
export const goodsMovePosition = params => {
  return request({
    method: "post",
    params
  });
};

// 商品置顶
export const goodsByTop = params => {
  return request({
    method: "post",
    params
  });
};

// 上下架商品
export const upperAndLowerShelves = params => {
  return request({
    method: "post",
    params
  });
};

// 是否显示下架商品开关
export const isOpen = params => {
  return request({
    method: "post",
    params
  });
};

// 获取商品分类
export const choiceClass = params => {
  return request({
    method: "post",
    params
  });
};

// 获取支持活动类型
export const getGoodsActiveList = params => {
  return request({
    method: "post",
    params
  });
};

// 获取商品标签
export const label = params => {
  return request({
    method: "post",
    params
  });
};

// 获取商品单位
export const goodsUnit = params => {
  return request({
    method: "post",
    params
  });
};

// 添加商品
export const addGoods = data => {
  return request({
    method: "post",
    data: qs.stringify(data)
  });
};

// 根据id获取商品信息
export const getGoodsInfoById = params => {
  return request({
    method: "post",
    params
  });
};

//添加自营店
export const addMch = params => {
  return request({
    method: "post",
    params
  });
};

//修改排序号
export const editSort = params => {
  return request({
    method: "post",
    params
  });
};

//获取商品上传方式
export const getCommoditySetup = params => {
  return request({
    method: "post",
    params
  });
};

//获取商品规格属性
export const getAttrByGoodsId = params => {
  return request({
    method: "post",
    params
  });
};

//提交审核/撤销审核
export const submitAudit = params => {
  return request({
    method: "post",
    params
  });
};

//添加自选商品
export const addOptionalGoods = params => {
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

//添加库存
export const addStock = params => {
  return request({
    method: "post",
    params
  });
};
