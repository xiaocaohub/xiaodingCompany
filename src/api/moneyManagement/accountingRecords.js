import request from '../https'

// 入账记录
export const revenueRecords = params => {
  return request({
    method: 'post',
    params
  })
}