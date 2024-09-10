import http from '../http'
let { entries } = Object

// 后台登录
export const login = data => {
  return http({
    method: 'post',
    params: {
      api: 'admin.saas.user.login',
      ...data
    }
  })
}

// 获取店铺info
export const getInfo = data => {
  return http({
    method: 'post',
    params: {
      api: 'mch.Mch.Home.Info'
    }
  })
}

// 获取图形校验码
// export const getImgCode = data => {
//   return http({
//     method: 'post',
//     params: {
//       api: 'admin.mch.user.getCode'
//     }
//   })
// }
export const getImgCode = data => {
  return http({
    method: 'post',
    params: {
      api: 'mch.Mch.User.getCode'
    }
  })
}

// 获取商城列表
export const getStoreList = params => {
  return http({
    method: 'post',
    params
  })
}

// 用户账号密码登录
export const loginUser = data => {
  let information = {
    api: 'mch.Mch.User.LoginUser',
    ...data
  }
  let formData = new FormData()
  for (let [key, value] of entries(information)) {
    formData.append(key, value)
  }
  return http({
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  // return http({
  //     method: 'post',
  //     params: {
  //         api: 'mch.Mch.User.LoginUser',
  //         ...data
  //     }
  // })
}

// 获取短信验证码登陆
export const sendSMS = params => {
  let formData = new FormData()
  for (let [key, value] of entries(params)) {
    formData.append(key, value)
  }
  return http({
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  //   return http({
  //     method: "post",
  //     params
  //   });
}

// 用户短信登陆
export const loginBySms = data => {
  let information = {
    api: 'mch.Mch.User.LoginBySms',
    ...data
  }
  let formData = new FormData()
  for (let [key, value] of entries(information)) {
    formData.append(key, value)
  }
  return http({
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  //   return http({
  //     method: "post",
  //     params: {
  //       api: "mch.Mch.User.LoginBySms",
  //       ...data
  //     }
  //   });
}

// 获取图形校验码
// export const getCode = data => {
//   return http({
//     method: 'post',
//     params: {
//       api: 'admin.mch.user.getCode'
//     }
//   })
// }
export const getCode = data => {
  return http({
    method: 'post',
    params: {
      api: 'mch.Mch.User.getCode'
    }
  })
}

// 找回密码
export const forgetPwd = params => {
  let formData = new FormData()
  for (let [key, value] of entries(params)) {
    formData.append(key, value)
  }
  return http({
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  //   return http({
  //     method: "post",
  //     params
  //   });
}
