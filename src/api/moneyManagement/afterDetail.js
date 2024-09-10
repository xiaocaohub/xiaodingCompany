import request from '../https'

// 售后明细
export const index = params => {
  return request({
    method: 'post',
    params
  })
}