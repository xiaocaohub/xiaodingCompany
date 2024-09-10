import request from '../https'

// 获取运费列表
export const index = params => {
    return request({
        method: 'post',
        params
    })
}

// 获取运费列表
export const delStore = params => {
    return request({
        method: 'post',
        params
    })
}

// 获取运费列表
export const setDefaultStore = params => {
    return request({
        method: 'post',
        params
    })
}

// 获取运费列表
export const addFreight = params => {
    return request({
        method: 'post',
        data: params,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
}

// 获取运费列表
export const getRegion = params => {
    return request({
        method: 'post',
        params
    })
}