import request from '../https'

// 是否可以提现
export const isWithdraw = params => {
  return request({
    method: 'post',
    params
  })
}

// 提现明细
export const withdrawList = params => {
  return request({
    method: 'post',
    params
  })
}

// 申请提现
export const withdrawals = params => {
  return request({
    method: 'post',
    params
  })
}

// 提现页面信息
export const withdrawPage = params => {
  return request({
    method: 'post',
    params
  })
}

// 发送提现短信
export const withdrawalsSms = params => {
  return request({
    method: 'post',
    params
  })
}