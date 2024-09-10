import { asyncRoutes, constantRoutes } from '@/router'
import { getUserRoleInfo } from '@/api/authority/roleManagement'
import Layout from '@/layout/index'
import { isEmpty } from 'element-ui/src/utils/util'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },

  SET_FIRSTROUTES: (state, routes) => {
    state.addRoutes = []
    state.addRoutes = routes
    state.routes = state.routes.slice(0, 4)
    state.routes.push(...routes)
  }
}

const actions = {
  async getAsyncRoutes ({ commit }) {
    const res = []
    let routes = await getUserRoleInfo({
      api: 'mch.Mch.Authority.GetUserAuthorityTree'
    })
    if (routes.data.code == '200') {
      let route = []
      routes.data.data.list.forEach(item => {
        if (item.checked) {
          route.push(item)
        }
      })
      if (route.length !== 0) {
        console.log(route)
        console.log(route[0].id)
        route[0].children = await actions.getMenu(route[0].id)

        route.forEach((list, index) => {
          let icons = []
          if (!isEmpty(list.logo)) {
            icons.push(list.logo)
          }
          if (!isEmpty(list.checked_logo)) {
            icons.push(list.checked_logo)
          }
          //一级菜单
          let topMenu = {
            children: [],
            path: '/' + list.path,
            component: Layout,
            redirect:
              index == 0
                ? '/' + list.path + '/' + list.children[0].path
                : '/' + list.path + '/',
            name: list.path,
            meta: { title: list.name, icon: icons },
            id: list.id
          }
          //递归子菜单
          if (index == 0) {
            topMenu.children = actions.getMenus(list)
          }
          res.push(topMenu)
        })
      }
      return actions.generateRoutes(commit, res)
    }
  },

  //菜单递归
  getMenus (menu) {
    const res = []
    menu.children.forEach((list, index) => {
      let childrenMenu = {
        children: list.children,
        path: list.path,
        name: list.path,
        meta: { title: list.name, is_display: list.is_display },
        id: list.id
      }
      if (childrenMenu.children.length == 0) {
        childrenMenu.component = resolve =>
          require([`@/views${list.url}`], resolve)
      } else {
        childrenMenu.redirect = list.url
        childrenMenu.component = {
          render (c) {
            return c('router-view')
          }
        }
        //继续递归
        childrenMenu.children = this.getMenus(list)
      }

      //递归子菜单
      res.push(childrenMenu)
    })
    return res
  },

  getMenu (id) {
    const ress = []
    return new Promise((resolve, reject) => {
      getUserRoleInfo({
        api: 'mch.Mch.Authority.GetUserAuthorityTree',
        sid: id
      }).then(routes => {
        let id = routes.data.data.list[0].id
        getUserRoleInfo({
          api: 'mch.Mch.Authority.GetUserAuthorityTree',
          sid: id
        }).then(res => {
          if (res.data.data.list.length !== 0) {
            routes.data.data.list[0].children = res.data.data.list
            ress.push(...routes.data.data.list)
            resolve(ress)
          } else {
            ress.push(...routes.data.data.list)
            resolve(ress)
          }
        })
      })
    })
  },

  // 加载默认选中的所以下级
  async allRoute (value) {
    for (let i = 0; i < value.length - 1; i++) {
      if (i == 0) {
        getUserRoleInfo({
          api: 'mch.Mch.Authority.GetUserAuthorityTree',
          sid: value[i].id
        }).then(res => {
          if (res.data.data.list.length !== 0) {
            return res.data.data.list
          }
        })
      } else {
        break
      }
    }
  },

  generateRoutes (commit, authorizationList) {
    return new Promise(resolve => {
      commit('SET_ROUTES', authorizationList)
      resolve(authorizationList)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
