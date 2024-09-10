<template>
  <div class="sideitem">
    <ul class="list-item">
      <li
        v-for="(item, index) in item"
        :key="index"
        v-show="item.meta.is_display == 0&&item.checked"
      >
        <span
          :class="{ active: item.name === $route.path.split('/')[2] }"
          @click.stop="handleSelect(`${mainNav}/${item.path}`)"
        >
          {{ generateTitle(item.meta.title) }}
          <i
            class="orderListNum"
            v-if="item.meta.title === '全部订单' && orderListNum != 0"
            >{{ orderListNum }}</i
          >
          <i class="salesReturnListNum" v-if="item.meta.title === '退货列表'"
            >({{ refundListNum }})</i
          >
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { isEmpty } from 'element-ui/src/utils/util'
import request from '@/api/https'
export default {
  name: 'sideitem',

  props: {
    item: {
      type: Array,
      required: true
    },
    mainNav: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      navlist: this.item
    }
  },

  watch: {
    item: {
      immediate:true,
      handler:(val,oldVal)=>{
        // this.navlist = val
        console.log('5656565656',val);
      }
    }
  },

  computed: {
    navlists () {
      return this.navlist
    },

    orderListNum () {
      return this.$store.getters.orderListNum
    },

    refundListNum () {
      return this.$store.getters.refundListNum
    }
  },

  methods: {
    getAsyncRoutes (id) {
      const res = []
      return request({
        method: 'post',
        params: {
          api: 'mch.Mch.Authority.GetUserAuthorityTree',
          sid: id
        }
      }).then(routes => {
        if (routes.data.code == '200') {
          let route = routes.data.data
          if (route.list.length !== 0) {
            let menu = this.getMenus(route.list)
            res.push(menu)
          }
          return res
        }
      })
    },
    //菜单递归
    getMenus (menuList) {
      console.log('递归子菜单')
      if (isEmpty(menuList)) {
        return []
      }
      menuList.forEach((currentMenu, index) => {
        let name = currentMenu.name
        if (currentMenu.children.length !== 0) {
          name = ''
        }
        let childrenMenu = {
          path: currentMenu.path,
          name: currentMenu.path,
          meta: { title: name, is_display: currentMenu.is_display },
          id: currentMenu.id,
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
      return menuList
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },

    changItem (value) {
      this.item = value
    },

    handleSelect (index) {
      //   if(index == 'plug_ins/seckill') {
      //     window.location.href = 'https://java.admin.houjiemeishi.com/seckill/'
      //   } else {
      //       this.$router.push('/' + index);
      //   }
      if (index == 'plug_ins/seckill') {
        this.$store.dispatch('orderNum/getOrderSecCount')
      }
      if (index == 'plug_ins/integralMall') {
        this.$store.dispatch('orderNum/getOrderInCount')
      }
      this.$router.push('/' + index)
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
.list-item {
  width: 150px;
  height: calc(100vh - 100px);
  background-color: #fff;
  box-shadow: 3px 0px 3px rgba(185, 183, 183, 0.1);
  margin: 0;
  padding: 10px !important;
  li {
    width: 130px;
    height: 40px;
    line-height: 40px;
    margin: 8px 0;
    color: #b2bcd1;
    font-size: 14px;
    border-radius: 2px;
    &:hover span {
      color: #2890ff !important;
    }
    &:first-child {
      margin-top: 0;
    }

    span {
      width: 100%;
      height: 100%;
      display: block;
      padding-left: 6px;
      color: #414658;
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
</style>
