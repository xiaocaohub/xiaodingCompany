// mch.Mch.Set.GetMchPrintSetup
import request from '../https'
let { entries } = Object
// 获去打印数据
export const getPlotSet = params => {
  let formData = new FormData()
  for (let [key, value] of entries(params)) {
    formData.append(key, value)
  }
  return request({
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

//   更改打印设置
export const editPlotSet = params => {
  let formData = new FormData()
  for (let [key, value] of entries(params)) {
    if (value !== null && value !== '' && value !== undefined) {
      formData.append(key, value)
    }
  }
  return request({
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
