import request from '../https'
// 公告不弹出
export const notGG = params => {
    return request({
        method: 'post',
        params
    })
}

// 退出登录
export const loginOut = params => {
    return request({
        method: 'post',
        params
    })
}
// 订单通知
export const noticeList = params => {
    return request({
        method: 'post',
        params
    })
}

// 一键已读
export const noticeRead = params => {
    return request({
        method: 'post',
        params
    })
}
// 消息弹框已读
export const noticePopup = params => {
    return request({
        method: 'post',
        params
    })
}

/**
 * 客服公共api
 */
export const kefuApi = params => {
    return request({
        method: 'post',
        params
    })
}
