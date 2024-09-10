import { orderCount } from '@/api/order/orderList'
const state = {
  orderListNum: '', // 订单列表数
  physicalOrderNum: '', // 实物订单列表数
  activityOrderNum: '', // 活动订单列表数
  refundListNum: '', // 退货列表数

  secOrderNum: '', // 秒杀订单待发货数
  inOrderNum: '', // 积分订单待发货数
  psOrderNum: '' // 预售订单待发货数
}

const mutations = {
  SET_ORDERLISTNUM: (state, orderListNum) => {
    state.orderListNum = orderListNum
  },
  SET_PHYSICALORDERNUM: (state, physicalOrderNum) => {
    state.physicalOrderNum = physicalOrderNum
  },
  SET_ACTIVITYORDERNUM: (state, activityOrderNum) => {
    state.activityOrderNum = activityOrderNum
  },
  SET_REFUNDLISTNUM: (state, refundListNum) => {
    state.refundListNum = refundListNum
  },
  SET_SECORDERNUM: (state, secOrderNum) => {
    state.secOrderNum = secOrderNum
  },
  SET_INORDERNUM: (state, inOrderNum) => {
    state.inOrderNum = inOrderNum
  },
  SET_PSORDERNUM: (state, psOrderNum) => {
    state.psOrderNum = psOrderNum
  }
}

const actions = {
  // 获取订单统计
  async getOrderCount ({ commit }) {
    const res = await orderCount({
      api: 'mch.Mch.Order.OrderCount'
    })
    console.log(res.data.data.secOrderNum)
    commit('SET_ORDERLISTNUM', res.data.data.orderNum)
    commit('SET_PHYSICALORDERNUM', res.data.data.shiWuNum)
    commit('SET_ACTIVITYORDERNUM', res.data.data.activityNum)
    commit('SET_REFUNDLISTNUM', res.data.data.returnNum)
  },
  // 获取订单统计
  async getOrderSecCount ({ commit }) {
    const res = await orderCount({
      api: 'plugin.sec.order.orderCount'
    })
    commit('SET_SECORDERNUM', res.data.data.secOrderNum)
  },

  async getOrderInCount ({ commit }) {
    const res = await orderCount({
      api: 'plugin.integral.order.orderCount'
    })
    commit('SET_INORDERNUM', res.data.data.inOrderNum)
  },

  async getOrderPsCount ({ commit }) {
    const res = await orderCount({
      api: 'plugin.presell.MchPreSell.orderCount'
    })
    commit('SET_PSORDERNUM', res.data.data.inOrderNum)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
