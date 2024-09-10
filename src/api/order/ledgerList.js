import request from '../https'

// 列表数据
export const index = params => {
  return request({
    method: 'post',
    params
  })
}
