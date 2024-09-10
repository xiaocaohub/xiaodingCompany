import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import getPageTitle from '@/utils/get-page-title'
import {getStorage , setStorage} from '@/utils/storage'
NProgress.configure({showSpinner: false})

const whiteList = ['/login'] // 没有重定向白名单
  router.beforeEach(async (to, from, next) => {
    // 开始进度条
    NProgress.start()
    //postMessage用法
    // window.addEventListener('message', function (e) {
    //   if (e.origin !== 'http://192.168.0.143:9528') return // 检测数据来源
    //   const data = e.data
    //   console.log('data', data.token)
    //     setStorage('token',data.token)
    //     setStorage('rolesInfos', {
    //       storeId: process.env.VUE_APP_STORE
    //     })
    //     store.dispatch('user/getAdmin')
    //     if(data.token){
    //       next({path: '/'})
    //     }
    // })
    //window.name用法
    if(window.name){
      const shacoData = window.name.split(',')
      // const shacoToken = window.name
      setStorage('token',shacoData[0])
      setStorage('rolesInfos', {
        storeId: shacoData[1]
      })
      store.dispatch('user/getAdmin')
    }
    // 设置页面标题
    document.title = getPageTitle(to.meta.title)
    if (getStorage('token')) {
      if (to.path === '/login') {
        // 如果已经登录, 重定向到首页
        next({path: '/'})
        NProgress.done()
      } else {
        const name = store.getters.name // 判断name是为了进入下面的try获取菜单等信息
        if (getStorage('rolesInfos') && name) {
          next()
        } else {
          try {
            store.commit('user/SET_NAME', 'hhh')
            store.dispatch('orderNum/getOrderCount')

            const accessRoutes = await store.dispatch('permission/getAsyncRoutes')
            if(getStorage('versionUpdate')==false){
            }else{
              if((getStorage('laike_store_uaerInfo')?.systemMsgType == 2||getStorage('laike_store_uaerInfo')?.systemMsgType == 3) && getStorage('laike_store_uaerInfo')?.systemMsgType != 0) {
                setStorage('versionUpdate',true)
              }
            }
            let list = [] 
            list.push(accessRoutes[0])
            console.log(list);
            router.addRoutes(list)
            if(store.state.permission.addRoutes.some(item => {
              return item.name == 'home'
            })) {
              next({...to, replace: true})
            } else {
              if(to.path == '/print'||to.path == '/printSheet') {
                next({...to, replace: true})
              } else {
                let path = store.state.permission.addRoutes[0].redirect
                next(path)
              }
            }
            // next({...to, replace: true})
            
          } catch (error) {
            console.log("异常")
            console.log(error)
            // 删除token并转到登录页面重新登录
            await store.dispatch('user/resetToken')
            // Message.error(error || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
    } else {
      /* 没有token*/
      if (whiteList.indexOf(to.path) !== -1) {
        // 直接去免登录白名单
        next()
      } else {
        // 其他没有访问权限的页面被重定向到登录页面。
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  })
router.afterEach(() => {
  NProgress.done()
})
