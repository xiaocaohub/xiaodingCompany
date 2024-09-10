import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import {render} from 'less'

// 公共路由
export const constantRoutes = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    hidden: true
  },

  // 打印
  {
    path: '/print',
    component: () => import('@/views/print/index'),
    hidden: true
  },
  {
    path: '/printSheet',
    component: () => import('@/views/printSheet/index'),
    hidden: true
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/goods',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '首页', icon: 'dashboard'}
    }]
  },

]

// 动态路由
export const asyncRoutes = [
    {
        path: '/peihuo',
        component: Layout,
        redirect: '/peihuo/peihuolist',
        name: 'goods',
        meta: {title: '商品配货', icon: [
          "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447740274012528640.png",
          "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447740290517114880.png"
        ]},
        component: () => import('@/views/peihuo')
    }
  // // 商品
  // {
  //   path: '/goods',
  //   component: Layout,
  //   redirect: '/goods/goodslist',
  //   name: 'goods',
  //   meta: {title: '商品', icon: [
  //     "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447740274012528640.png",
  //     "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447740290517114880.png"
  //   ]},
  //   id: "1473119628707233792",
  //   children: [
  //     {
  //       path: 'goodslist',
  //       name: 'goodslist',
  //       redirect: '/goods/goodslist/physicalgoods',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '商品列表', is_display: 0},
  //       children: [
  //         {
  //           path: 'physicalgoods',
  //           name: 'physicalgoods',
  //           component: () => import('@/views/goods/goodslist/physicalgoods'),
  //           meta: {title: ''}
  //         },
  //         {
  //           path: 'releasephysical',
  //           name: 'releasephysical',
  //           component: () => import('@/views/goods/goodslist/releasephysical'),
  //           meta: {title: '发布商品'}
  //         },
  //         {
  //           path: 'editorphysical',
  //           name: 'editorphysical',
  //           component: () => import('@/views/goods/goodslist/editorphysical'),
  //           meta: {title: '编辑商品'}
  //         },
  //         {
  //           path: 'goodsDetails',
  //           name: 'goodsDetails',
  //           component: () => import('@/views/goods/goodslist/goodsDetails'),
  //           meta: {title: '查看详情'}
  //         },
  //       ]
  //     },
  //     {
  //       path: 'optional',
  //       name: 'optional',
  //       redirect: '/goods/optional/optionalGoods',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '自选商品', is_display: 0},
  //       children: [
  //         {
  //           path: 'optionalGoods',
  //           name: 'optionalGoods',
  //           component: () => import('@/views/goods/optional/optionalGoods'),
  //           meta: {title: '自选商品'}
  //         },
  //         {
  //           path: 'addGoods',
  //           name: 'addGoods',
  //           component: () => import('@/views/goods/optional/addGoods'),
  //           meta: {title: '添加商品'}
  //         },
  //       ]
  //     },
  //     {
  //       path: 'auditGoods',
  //       name: 'auditGoods',
  //       redirect: '/goods/auditGoods/auditGoodsList',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '待审核商品', is_display: 0},
  //       children: [
  //         {
  //           path: 'auditGoodsList',
  //           name: 'auditGoodsList',
  //           component: () => import('@/views/goods/auditGoods/auditGoodsList'),
  //           meta: {title: ''}
  //         },
  //         {
  //           path: 'editorGoods',
  //           name: 'editorGoods',
  //           component: () => import('@/views/goods/auditGoods/editorGoods'),
  //           meta: {title: '编辑商品'}
  //         },
  //       ]
  //     }
  //   ]
  // },

  // // 订单
  // {
  //   path: '/order',
  //   component: Layout,
  //   redirect: '/order/orderList',
  //   name: 'order',
  //   meta: {title: '订单', icon: [
  //     "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447743428355629056.png",
  //     "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211015/1448888483959144448.png"
  //   ]},
  //   children: [
  //     {
  //       path: 'orderList',
  //       name: 'orderList',
  //       redirect: '/order/orderList/orderLists',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '全部订单', is_display: 0},
  //       children: [
  //         {
  //           path: 'orderLists',
  //           name: 'orderLists',
  //           component: () => import('@/views/order/orderList/orderLists'),
  //           meta: {title: ''}
  //         },
  //         {
  //           path: 'orderDetails',
  //           name: 'orderDetails',
  //           component: () => import('@/views/order/orderList/orderDetails'),
  //           meta: {title: '订单详情'}
  //         },
  //         {
  //           path: 'editorOrder',
  //           name: 'editorOrder',
  //           component: () => import('@/views/order/orderList/editorOrder'),
  //           meta: {title: '编辑订单'}
  //         },
  //         {
  //           path: 'goodsDelivery',
  //           name: 'goodsDelivery',
  //           component: () => import('@/views/order/orderList/goodsDelivery'),
  //           meta: {title: '发货'}
  //         }
  //       ]
  //     },
  //     {
  //       path: 'obligation',
  //       name: 'obligation',
  //       component: () => import('@/views/order/obligation'),
  //       meta: {title: '待付款', is_display: 0}
  //     },
  //     {
  //       path: 'sendGoods',
  //       name: 'sendGoods',
  //       redirect: '/order/sendGoods/sendGoodsList',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '待发货', is_display: 0},
  //       children: [
  //         {
  //           path: 'sendGoodsList',
  //           name: 'sendGoodsList',
  //           component: () => import('@/views/order/sendGoods/sendGoodsList'),
  //           meta: {title: ''}
  //         },
  //         {
  //           path: 'bulkDeliveryRecord',
  //           name: 'bulkDeliveryRecord',
  //           component: () => import('@/views/order/sendGoods/bulkDeliveryRecord'),
  //           meta: {title: '批量发货记录'}
  //         },
  //         {
  //           path: 'bulkShipment',
  //           name: 'bulkShipment',
  //           component: () => import('@/views/order/sendGoods/bulkShipment'),
  //           meta: {title: '批量发货'}
  //         }
  //       ]
  //     },
  //     {
  //       path: 'salesReturn',
  //       name: 'salesReturn',
  //       redirect: '/order/salesReturn/salesReturnList',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '退款售后', is_display: 0},
  //       children: [
  //         {
  //           path: 'salesReturnList',
  //           name: 'salesReturnList',
  //           component: () => import('@/views/order/salesReturn/salesReturnList'),
  //           meta: {title: ''}
  //         },
  //         {
  //           path: 'salesReturnDetails',
  //           name: 'salesReturnDetails',
  //           component: () => import('@/views/order/salesReturn/salesReturnDetails'),
  //           meta: {title: '售后详情'}
  //         },
  //       ]
  //     },
  //     {
  //       path: 'orderSettlement',
  //       name: 'orderSettlement',
  //       redirect: '/order/orderSettlement/orderSettlementList',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '订单结算', is_display: 0},
  //       children: [{
  //         path: 'orderSettlementList',
  //         name: 'orderSettlementList',
  //         component: () => import('@/views/order/orderSettlement/orderSettlementList'),
  //         meta: {title: ''}
  //       }, {
  //         path: 'orderSettlementDetail',
  //         name: 'orderSettlementDetail',
  //         component: () => import('@/views/order/orderSettlement/orderSettlementDetail'),
  //         meta: {title: '查看'}
  //       },]
  //     },
  //   ]
  // },

  // // 资金
  // {
  //   path: '/moneyManagement',
  //   component: Layout,
  //   redirect: '/moneyManagement/accountingRecords',
  //   name: 'moneyManagement',
  //   meta: {title: '资金', icon: [
  //     "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447757973468090368.png",
  //     "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447758003729993728.png"
  //   ]},
  //   children: [
  //     {
  //       path: 'accountingRecords',
  //       name: 'accountingRecords',
  //       component: () => import('@/views/moneyManagement/accountingRecords'),
  //       meta: {title: '入账记录', is_display: 0}
  //     },
  //     {
  //       path: 'expenditure',
  //       name: 'expenditure',
  //       component: () => import('@/views/moneyManagement/expenditure'),
  //       meta: {title: '出账记录', is_display: 0}
  //     },
  //     {
  //       path: 'withdrawalDetails',
  //       name: 'withdrawalDetails',
  //       redirect: '/moneyManagement/withdrawalDetails/detailsList',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '提现明细', is_display: 0},
  //       children: [
  //         {
  //           path: 'detailsList',
  //           name: 'detailsList',
  //           component: () => import('@/views/moneyManagement/withdrawalDetails/detailsList'),
  //           meta: {title: ''}
  //         },
  //         {
  //           path: 'applyWithdrawal',
  //           name: 'applyWithdrawal',
  //           component: () => import('@/views/moneyManagement/withdrawalDetails/applyWithdrawal'),
  //           meta: {title: '申请提现'}
  //         }
  //       ]
  //     },
  //     {
  //       path: 'afterDetail',
  //       name: 'afterDetail',
  //       component: () => import('@/views/moneyManagement/afterDetail'),
  //       meta: {title: '售后明细', is_display: 0}
  //     },
  //     {
  //       path: 'bankCard',
  //       name: 'bankCard',
  //       redirect: '/moneyManagement/bankCard/bankCardList',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '银行卡', is_display: 0},
  //       children: [
  //         {
  //           path: 'bankCardList',
  //           name: 'bankCardList',
  //           component: () => import('@/views/moneyManagement/bankCard/bankCardList'),
  //           meta: {title: ''}
  //         },
  //         {
  //           path: 'addBankCard',
  //           name: 'addBankCard',
  //           component: () => import('@/views/moneyManagement/bankCard/addBankCard'),
  //           meta: {title: '添加银行卡'}
  //         }
  //         ,
  //         {
  //           path: 'editorBankCard',
  //           name: 'editorBankCard',
  //           component: () => import('@/views/moneyManagement/bankCard/editorBankCard'),
  //           meta: {title: '编辑'}
  //         }
  //       ]
  //     },

  //   ]
  // },

  // // 门店
  // {
  //   path: '/stores',
  //   component: Layout,
  //   redirect: '/stores/storesList',
  //   name: 'stores',
  //   meta: {title: '门店', icon: [
  //     "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447757973468090368.png",
  //     "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447758003729993728.png"
  //   ]},
  //   children: [
  //     {
  //       path: 'storesList',
  //       name: 'storesList',
  //       redirect: '/stores/storesList/storesLists',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '门店列表', is_display: 0},
  //       children: [
  //         {
  //           path: 'storesLists',
  //           name: 'storesLists',
  //           component: () => import('@/views/stores/storesList/storesLists'),
  //           meta: {title: ''}
  //         },
  //         {
  //           path: 'addStores',
  //           name: 'addStores',
  //           component: () => import('@/views/stores/storesList/addStores'),
  //           meta: {title: '添加门店'}
  //         },
  //         {
  //           path: 'editorStores',
  //           name: 'editorStores',
  //           component: () => import('@/views/stores/storesList/editorStores'),
  //           meta: {title: '编辑'}
  //         }
  //       ]
  //     },

  //   ]
  // },

  // // 设置
  // {
  //   path: '/set',
  //   component: Layout,
  //   redirect: '/set/storesInfo/info',
  //   name: 'set',
  //   meta: {title: '设置', icon: [
  //     "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447757973468090368.png",
  //     "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447758003729993728.png"
  //   ]},
  //   children: [
  //     {
  //       path: 'storesInfo',
  //       name: 'storesInfo',
  //       redirect: '/set/storesInfo/info',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '店铺信息', is_display: 0},
  //       children: [
  //         {
  //           path: 'info',
  //           name: 'info',
  //           component: () => import('@/views/set/storesInfo/info'),
  //           meta: {title: ''}
  //         },
  //         {
  //           path: 'editorInfo',
  //           name: 'editorInfo',
  //           component: () => import('@/views/set/storesInfo/editorInfo'),
  //           meta: {title: '编辑信息'}
  //         }
  //       ]
  //     },
  //     {
  //       path: 'slideshowSet',
  //       name: 'slideshowSet',
  //       redirect: '/set/slideshowSet/sets',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '轮播图设置', is_display: 0},
  //       children: [
  //         {
  //           path: 'sets',
  //           name: 'sets',
  //           component: () => import('@/views/set/slideshowSet/sets'),
  //           meta: {title: ''}
  //         },
  //         {
  //           path: 'addSlideshow',
  //           name: 'addSlideshow',
  //           component: () => import('@/views/set/slideshowSet/addSlideshow'),
  //           meta: {title: '添加轮播图'}
  //         },
  //         {
  //           path: 'editorSlideshow',
  //           name: 'editorSlideshow',
  //           component: () => import('@/views/set/slideshowSet/editorSlideshow'),
  //           meta: {title: '编辑'}
  //         }
  //       ]
  //     },
  //     {
  //       path: 'changePassword',
  //       name: 'changePassword',
  //       component: () => import('@/views/set/changePassword'),
  //       meta: {title: '修改密码', is_display: 0}
  //     },

  //   ]
  // },

  // // 权限管理
  // {
  //   path: '/authority',
  //   component: Layout,
  //   redirect: '/authority/permissions',
  //   name: 'authority',
  //   meta: {title: '权限', icon: [
  //     "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447757973468090368.png",
  //     "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447758003729993728.png"
  //   ]},
  //   children: [
  //     {
  //       path: 'permissions',
  //       name: 'permissions',
  //       redirect: '/authority/permissions/menulist',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '菜单列表', is_display: 0},
  //       children: [
  //         {
  //           path: 'menulist',
  //           component: () => import('@/views/authority/permissions/menulist'),
  //           meta: {title: ''},
  //         }, 
  //         {
  //           path: 'addmenulevel',
  //           name: 'addmenulevel',
  //           component: () => import('@/views/authority/permissions/addmenulevel'),
  //           meta: {title: '添加菜单'},
  //         },
  //         {
  //           path: 'editormenulevel',
  //           name: 'editormenulevel',
  //           component: () => import('@/views/authority/permissions/editormenulevel'),
  //           meta: {title: '编辑菜单'},
  //         },
  //         {
  //           path: 'viewmenu',
  //           name: 'viewmenu',
  //           component: () => import('@/views/authority/permissions/viewmenu'),
  //           meta: {title: '查看下级'},
  //         }
  //       ]
  //     },
  //     {
  //       path: 'adminManage',
  //       name: 'adminManage',
  //       redirect: '/authority/adminManage/adminUserList',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '管理员列表', is_display: 0},
  //       children: [{
  //         path: 'adminUserList',
  //         component: () => import('@/views/authority/adminUserManage/adminUserList'),
  //         meta: {title: ''},
  //       }, {
  //         path: 'addAdminUser',
  //         name: 'addAdminUser',
  //         component: () => import('@/views/authority/adminUserManage/addAdminUser'),
  //         meta: {title: '添加管理员'},
  //       }, {
  //         path: 'editAdminUser',
  //         name: 'editAdminUser',
  //         component: () => import('@/views/authority/adminUserManage/addAdminUser'),
  //         meta: {title: '编辑管理员'},
  //       }]
  //     },
  //     {
  //       path: 'roleManagement',
  //       name: 'roleManagement',
  //       redirect: '/authority/roleManagement/roleList',
  //       component: {
  //         render(c) {
  //           return c('router-view')
  //         }
  //       },
  //       meta: {title: '角色管理', is_display: 0},
  //       children: [
  //         {
  //           path: 'roleList',
  //           name: 'roleList',
  //           component: () => import('@/views/authority/roleManagement/roleList.vue'),
  //           meta: {title: ''}
  //         },
  //         {
  //           path: 'addRoles',
  //           name: 'addRoles',
  //           component: () => import('@/views/authority/roleManagement/addRoles.vue'),
  //           meta: {title: '添加角色'}
  //         },
  //         {
  //           path: 'editorRoles',
  //           name: 'editorRoles',
  //           component: () => import('@/views/authority/roleManagement/editorRoles.vue'),
  //           meta: {title: '编辑角色'}
  //         },
  //         {
  //           path: 'viewRoles',
  //           name: 'viewRoles',
  //           component: () => import('@/views/authority/roleManagement/viewRoles.vue'),
  //           meta: {title: '查看角色'}
  //         },
  //       ]
  //     },
  //     {
  //       path: 'adminLoggerList',
  //       name: 'adminLoggerList',
  //       component: () => import('@/views/authority/adminLoggerManage/adminLoggerList'),
  //       meta: {title: '管理员日志', is_display: 0}
  //     },
  //   ]
  // },

]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})


const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.$addRoutes = (params) => {
 
  
  router.matcher = new Router({mode: 'hash'}).matcher;
  router.addRoutes(params)
  

}
// console.log("params params router")
// console.log(router)
// console.log("params params router")

export default router
