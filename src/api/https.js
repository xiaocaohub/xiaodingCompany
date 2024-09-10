import axios from 'axios'
import ElementUI from 'element-ui';
import { removeStorage, getStorage, setStorage } from '@/utils/storage'
const request = axios.create({
  timeout: 10000
})

if (process.env.NODE_ENV == 'development') {
  request.defaults.baseURL = 'api'
} else if (process.env.NODE_ENV == 'production') {
  request.defaults.baseURL = process.env.VUE_APP_PROXY_API
}


// 配置请求拦截器
request.interceptors.request.use(config => {
  if (config.method === 'post') {
    const userInfo = getStorage('token')
    const rolesInfo = getStorage('rolesInfos')
    config.params = {
      //商城id
      storeId: rolesInfo.storeId,
      //来源
      // storeType: 8,
      storeType: 7,// 后端让改成默认值7
      ...config.params,
      //token
      accessId: userInfo
    }

    if(config.params.exportType && config.params.exportType == 1){
      config.headers = {
        'Content-Type': 'application/octet-stream;charset=utf-8'
      }
      config.responseType="blob";
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 配置响应拦截器
request.interceptors.response.use((res) => {
  if(res.data.code == '203') {
    const mall = getStorage('mall')
    window.localStorage.clear()
    window.location.href = '/login'
    location.reload();
    window.name = ''
    setStorage('mall',mall)
  }
  if(res.data instanceof Blob){
    return res
  }
  if (res.status && res.data.code == '200') {
    return res;
  } else {
    ElementUI.Message({
      message: res.data.message,
      type: 'error',
      offset: 100
    })
    return res
  }

  console.log(res);

}, (error) => {

});

export default request;
