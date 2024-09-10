<template>
  <div class="mainSideBar">
    <div class="left-nav">
      <ul class="side-nav">
        <li
          class="side-nav-item"
          v-for="(route, index) in routes"
          :key="index"
          @mouseenter="mouseenter(route)"
          @mouseleave="mouseleave"
        >
          <div
            class="nav-maininfo"
            :class="{ active: activeName === route.name }"
            @click="change(route)"
          >
            <div class="icon-font" @click="handleSelect(route.name)">
              <img
                :src="
                  activeName === route.name || toggle === route.name
                    ? route.meta.icon[1]?route.meta.icon[1]:ErrorImg
                    : route.meta.icon[0]?route.meta.icon[0]:ErrorImg
                "
                alt=""
                @error="handleErrorImg"
              />
              <span>{{ route.meta.title }}</span>
            </div>
            <i v-show="toggle === route.name" class="icon"></i>
            <!-- <span v-if="route.meta.title === '订单'" class="red-dot"></span> -->
          </div>

          <ul class="nav-info">
            <template v-for="(child, index) in route.children">
              <li
              :key="index"
              @click="
                handleSelect(`${route.name}/${child.path}`)
                change(route)
              "
              v-show="child.meta.is_display == 0&&child.checked"
            >
              <span
                :class="{ active: child.name === $route.path.split('/')[2] }"
              >
                {{ generateTitle(child.meta.title) }}
                <i
                  class="orderListNum"
                  v-if="child.meta.title === '全部订单' && orderListNum != 0"
                  >{{ orderListNum }}</i
                >
                <i
                  class="salesReturnListNum"
                  v-if="child.meta.title === '退货列表'"
                  >{{ refundListNum }}</i
                >
              </span>
            </li>
          </template>
          </ul>
        </li>
      </ul>
    </div>
    <div class="right-nav" :class="classObj">
      <SideItem
        class="itemBar"
        :mainNav="mainNav"
        :class="classobj"
        :item="navList"
      />
    </div>
  </div>
</template>

<script>
import SideItem from './sideItem'
import { isEmpty } from 'element-ui/src/utils/util'
import Layout from '@/layout/index'
import request from '@/api/https'
import router from '@/router'
import { cloneDeep } from 'lodash'

import { setStorage } from '@/utils/storage'
import ErrorImg from "@/assets/images/menu_icon.png";

export default {
  name: 'mainSideBar',
  components: {
    SideItem
  },
  data () {
    return {
      activeName: 'home',
      toggle: 'home',
      navList: [
        {
          path: 'homeReport',
          name: 'homeReport',
          meta: { title: '商城首页', is_core: 1 },
          checked:true
        }
      ],
      mainNav: 'home',
      ErrorImg:ErrorImg
    }
  },

  async created () {
  const res = await this.getAsyncRoutes().then(res => {
      // let route = []
      // res.forEach(item => {
      //   if(item.checked) {
      //     route.push(item)
      //   }
      // })
      this.$store.commit('permission/SET_FIRSTROUTES', res)
      router.addRoutes(res)
    })

    if (
      this.$store.state.permission.addRoutes.some(item => {
        return item.name == 'home'
      })
    ) {
      if (this.$route.path.split('/')[1] !== 'home') {
        this.$router.replace('/home/homeReport')
      }
      this.$store.state.permission.addRoutes.map(item => {
        if (item.name == 'home') {
          this.navList = item.children
        }
      })
    } else {
      let routes = this.$store.state.permission.addRoutes[0]
      
      
      
      
      
      console.log("routes permission")
      console.log(routes)
      console.log("routes permission")

      this.activeName = routes.name
      this.toggle = routes.name
      this.navList = routes.children

      this.mainNav = routes.name

      if (this.$route.path.split('/')[1] !== routes.name) {
        this.$router.replace(routes.redirect)
      }
    }
    // this.navList = this.navList.filter(item=>item.checked==true)
  },

  computed: {
    item () {
      return this.routes[0].children
    },
    routes () {
      return this.$store.getters.permission_routes.filter(item => {
        if (item.meta&&item.checked) {
          return item
        }
      })
    },
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    sidebar () {
      return this.$store.state.app.sidebar
    },
    classObj () {
      return {
        active: this.sidebar.opened,
        actives: !this.sidebar.opened
      }
    },
    classobj () {
      return {
        active: this.sidebar.opened,
        actives: !this.sidebar.opened
      }
    },
    opened () {
      return this.sidebar.opened
    },

    orderListNum () {
      return this.$store.getters.orderListNum
    },

    refundListNum () {
      return this.$store.getters.refundListNum
    }
  },

  watch: {
    opened () {
      if (this.opened) {
        this.toggle = this.activeName
      } else {
        this.toggle = ''
      }
    },

    '$route.path' () {
      this.activeName = this.$route.path.split('/')[1]
      this.toggle = this.$route.path.split('/')[1]
      if (this.mainNav != this.toggle) {
        this.routes.map(item => {
          if (item.name == this.toggle) {
            this.navList = item.children
          }
        })
      }
    }

    // toggle() {
    //   if(this.mainNav != this.toggle) {
    //     this.routes.map(item => {
    //       if(item.name == this.toggle) {
    //         this.navList = item.children
    //       }
    //     })
    //   }
    // }
  },

  methods: {
    // 破图
    handleErrorImg(e) {
      console.log("图片报错了xxxx2777", e.target.src);
      e.target.src = ErrorImg;
    },
    // 切换菜单栏
    handleSelect (index) {
      // if(index == 'plug_ins/seckill') {
      //   window.location.href = 'https://java.admin.houjiemeishi.com/seckill/'
      // } else {
      //   this.$router.push('/' + index);
      // }
      if (index == 'plug_ins/seckill') {
        this.$store.dispatch('orderNum/getOrderSecCount')
      }
      if (index == 'plug_ins/integralMall') {
        this.$store.dispatch('orderNum/getOrderInCount')
      }
      this.$router.push('/' + index)
    },

    getAsyncRoutes () {
      const res = []
      return request({
        method: 'post',
        params: {
          api: 'mch.Mch.Authority.GetUserAuthorityTree',
          roleId: 0
        }
      }).then(routes => {
        if (routes.data.code == '200') {
          // let route = routes.data.data;
          let myButtonList = cloneDeep(routes.data.data).list
          let may = []
          myButtonList.map(item => {
            if (item.children) {
              may.push(...item.children)
            }
          })
          setStorage('route', may)
          let route = []
          routes.data.data.list.forEach(item => {
            if (item.checked) {
              route.push(item)
            }
            item.children=  item.children.filter((item2,index)=>{
              return item2.checked
            })
          })
          console.log(route, '菜单权限')
          if (route.length !== 0) {
            route.forEach((menu, index) => {
              let icons = []
              if (!isEmpty(menu.logo)) {
                icons.push(menu.logo)
              }
              if (!isEmpty(menu.checked_logo)) {
                icons.push(menu.checked_logo)
              }
              //一级菜单
              let topMenu = {
                path: '/' + menu.path,
                name: menu.path,
                component: Layout,
                redirect: menu.children.length
                  ? '/' + menu.path + '/' + menu.children[0].path
                  : '/' + menu.path + '/',
                meta: { title: menu.name, icon: icons },
                checked:menu.checked
              }

              //递归子菜单
              topMenu.children = this.getMenus(menu.children)
              res.push(topMenu)
            })
          }
          return res
        }
      })
    },
    //菜单递归
    getMenus (menuList) {
      if (isEmpty(menuList)) {
        return []
      }
      menuList.forEach((currentMenu, index) => {
        let childrenMenu = {
          path: currentMenu.path,
          name: currentMenu.path,
          meta: { title: currentMenu.name, is_display: currentMenu.is_display },
          checked:currentMenu.checked
        }
        //是否有子菜单
        if (currentMenu.children.length == 0) {
          childrenMenu.component = resolve =>
            require([`@/views${currentMenu.url}`], resolve)
        } else {
          childrenMenu.redirect = currentMenu.url
          childrenMenu.component = {
            render (c) {
              return c('router-view')
            }
          }
          //继续递归
          childrenMenu.children = this.getMenus(currentMenu.children)
        }
        menuList[index] = childrenMenu
      })
      // .filter(item=>item.checked==true)
      return menuList
    },

    mouseenter (route) {
      this.toggle = route.name
    },

    mouseleave () {
      this.toggle = this.activeName
      if (!this.opened) {
        this.toggle = ''
      }
    },

    change (value) {
      console.log('340340340340',value);
      this.navList = value.children
      this.mainNav = value.name
      this.toggle = value.name
    },

    generateTitle (title) {
      const hasKey = this.$te('route.' + title)
      if (hasKey) {
        const translatedTitle = this.$t('route.' + title)
        return translatedTitle
      }
      return title
    }
  }
}
</script>

<style scoped lang="scss">
.mainSideBar {
  height: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  z-index: 101;
  .left-nav {
    width: 70px;
    height: 100%;
    background-color: #343e4c;
    overflow-y: auto;
    z-index: 100;
    &::-webkit-scrollbar {
      display: none;
    }
    .side-nav {
      background-color: #343e4d;
      border-bottom: none !important;
      margin: 0;
      padding: 0;
      .side-nav-item {
        width: 70px;
        height: 80px;
        margin: 0;
        padding: 0;
        color: #b2bcd1;
        font-size: 14px;
        &:hover .nav-info {
          display: block;
        }
        .nav-maininfo {
          width: 70px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          &:hover {
            color: #fff;
          }
          &.active {
            background-color: #161c24;
            color: #fff;
          }
          .icon-font {
            width: 70px;
            height: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img {
              width: 22px;
              height: 22px;
              margin-bottom: 5px;
            }
            span {
              font-size: 16px;
              font-weight: bold;
            }
          }
          i {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-right-color: #ffffff;
          }

          .red-dot {
            display: inline-block;
            width: 10px;
            height: 10px;
            background-color: red;
            border: 1px solid red;
            border-radius: 50%;
            position: absolute;
            top: 17px;
            right: 7px;
          }
        }

        .nav-info {
          width: 150px;
          height: calc(100vh - 100px);
          position: fixed;
          left: 70px;
          top: 60px;
          display: none;
          background-color: #fff;
          color: #414658;
          margin: 0;
          padding: 10px;
          box-shadow: 3px 0px 3px rgba(185, 183, 183, 0.1);
          z-index: 10000;
          li {
            width: 130px;
            height: 40px;
            line-height: 40px;
            margin: 8px 0;
            border-radius: 2px;
            &:first-child {
              margin-top: 0;
            }
            &.active span {
              background-color: #e9f4ff;
              color: #2890ff;
            }
            &:hover {
              color: #2890ff !important;
            }
            span {
              display: block;
              width: 100%;
              height: 100%;
              padding-left: 6px;
              font-size: 16px;
              &.active {
                background-color: #e9f4ff;
                color: #2890ff;
              }
            }

            .orderListNum,
            .salesReturnListNum {
              font-style: normal;
              color: #fff;
              background: red;
              font-size: 14px;
              padding: 0px 6px;
              border-radius: 14px;

              // margin-left: 8px;
            }
          }
        }
      }
    }
  }

  .right-nav {
    width: 150px;
    height: calc(100vh - 100px);
    position: fixed;
    left: 70px;
    transition: left 0.28s ease;
    z-index: 1;
    &.active {
      left: 70px;
    }
    &.actives {
      left: -80px;
      height: calc(100vh - 100px);
    }
    .itemBar {
      &.active {
        display: block;
      }
      &.actives {
        display: none;
      }
    }
  }
}
</style>
