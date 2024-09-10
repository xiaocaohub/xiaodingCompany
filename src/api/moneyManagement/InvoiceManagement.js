import request from '../https'
import qs from 'qs'
// 发票列表
export const getList = params => {
  return request({
    method: 'post',
    params
  })
}

// 删除发票
export const delInvoice = params => {
    return request({
      method: 'post',
      params
    })
}

// 查看发票详情
export const getInfo = params => {
    return request({
      method: 'post',
      params
    })
}

// 上传发票文件
export const uploadInvoice = params => {
  return request({
    method: 'post',
    data: params,
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  })
}