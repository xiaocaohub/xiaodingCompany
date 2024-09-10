import request from '../https'

// 保证金管理
export const getPromise = params => {
  return request({
    method: 'post',
    params
  })
}

// 退还保证金
export const rePromise = params => {
    return request({
      method: 'post',
      params
    })
  }