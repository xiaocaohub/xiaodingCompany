import request from '../https'

// 批量发货
export const batchDelivery = data => {
  return request({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: {
      api: 'mch.Mch.Order.BatchDelivery'
    },
    data
  })
}

// 客服 发送图片
export const sendImage = data => {
  return request({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: {
      api: 'admin.mch.goods.uploadImgs'
    },
    data
  })
}

// 批量记录列表
export const deliverList = params => {
  return request({
    method: 'post',
    params
  })
}

// 删除发货记录
export const delDelivery = params => {
  return request({
    method: 'post',
    params
  })
}
