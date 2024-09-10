import { index } from '@/api/set/storesInfo'
import { loginUser, loginBySms } from '@/api/login/index'
import router, { resetRouter, sysRouters } from '@/router'
import { getStorage, getCookie, setStorage, removeStorage } from '@/utils/storage'

const getDefaultState = () => {
  return {
    token: getStorage('token') ? getStorage('token') : '',
    name: '', // 用户名
    rolesInfo: getStorage('rolesInfos'),
    head_img: getStorage('head_img') ? getStorage('head_img') : '',
    logo: getStorage('logo') ? getStorage('logo') : '',
    storeName: getStorage('storeName') ? getStorage('storeName') : ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_HEADIMG: (state, head_img) => {
    state.head_img = head_img
  },
  SET_LOGO: (state, logo) => {
    state.logo = logo
  },
  SET_STORENAME: (state, storeName) => {
    state.storeName = storeName
  }
}

const actions = {
  // 用户账号密码登录
  loginUser ({ commit }, userInfo) {
    const { mall, account, password, imgCodeToken, imgCode } = userInfo
    let language = getCookie('language')?getCookie('language'):'zh'
    return new Promise((resolve, reject) => {
      loginUser({
        storeId: mall ? mall : 1,
        login: account.trim(),
        pwd: password,
        imgCodeToken: imgCodeToken,
        imgCode: imgCode,
        language: language
      })
        .then(response => {
          const { data } = response
          console.log(data)
          commit('SET_TOKEN', data.data.token)
          setStorage('token', data.data.token)
          setStorage('rolesInfos', {
            storeId: userInfo.mall
          })
          index({
            api: 'mch.Mch.Set.Index',
            storeId: userInfo.mall,
            accessId: data.data.token
          }).then(res => {
            setStorage('laike_store_uaerInfo',response.data.data)
            setStorage('storeName', res.data.data.res.name)
            setStorage('mchId', res.data.data.res.id)
            setStorage('head_img', res.data.data.res.head_img)
            setStorage('logo', res.data.data.res.logo)
            commit('SET_HEADIMG', res.data.data.res.head_img)
            commit('SET_LOGO', res.data.data.res.logo)
            commit('SET_STORENAME', res.data.data.res.name)
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 用户短信登陆
  loginBySms ({ commit }, userInfo) {
    const { mall, tel, code, imgCodeToken, imgCode } = userInfo
    console.log(mall, tel, code)
    return new Promise((resolve, reject) => {
      loginBySms({
        storeId: mall ? mall : 1,
        phone: tel.trim(),
        pcode: code,
        imgCodeToken: imgCodeToken,
        imgCode: imgCode
      })
        .then(response => {
          const { data } = response
          console.log(data)
          commit('SET_TOKEN', data.data.token)
          setStorage('token', data.data.token)
          setStorage('rolesInfos', {
            storeId: userInfo.mall
          })
          index({
            api: 'mch.Mch.Set.Index',
            storeId: userInfo.mall,
            accessId: data.data.token
          }).then(res => {
            setStorage('laike_store_uaerInfo',response.data.data)
            setStorage('storeName', res.data.data.res.name)
            setStorage('mchId', res.data.data.res.id)
            setStorage('head_img', res.data.data.res.logo)
            commit('SET_HEADIMG', res.data.data.res.head_img)
            commit('SET_LOGO', res.data.data.res.logo)
            commit('SET_STORENAME', res.data.data.res.name)
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 从管理后台店铺插件免密码登录
  getAdmin ({ commit }) {
    return new Promise((resolve, reject) => {
      index({
        api: 'mch.Mch.Set.Index',
        storeId: getStorage('rolesInfos').storeId,
        accessId: getStorage('token')
      }).then(res => {
        if (res.status == 200) {
          setStorage('storeName', res.data.data.res.name)
          setStorage('mchId', res.data.data.res.id)
          setStorage('head_img', res.data.data.res.logo)
          setStorage('logo', res.data.data.res.logo)
          commit('SET_HEADIMG', res.data.data.res.head_img)
          commit('SET_LOGO', res.data.data.res.logo)
          commit('SET_STORENAME', res.data.data.res.name)
        } else {
          alert('res-->', res.status)
        }
        resolve(res.status)
      })
    }).catch(error => {
      alert('error-->', error)
    })
  },
  // 退出登录
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeStorage('laike_store_uaerInfo') // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          //把角色信息设置为空列表
          commit('SET_ROLES', [])
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 移除token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      // removeStorage('laike_store_uaerInfo') // must remove  token  first
      commit('RESET_STATE')
      //把角色信息设置为空列表
      commit('SET_ROLES', [])
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
