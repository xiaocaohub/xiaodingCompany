import request from '../https'

// 出账记录
export const revenueRecords = params => {
  return request({
    method: 'post',
    params
  })
}