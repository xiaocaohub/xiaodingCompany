const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  head_img: state => state.user.head_img,
  logo: state => state.user.logo,
  storeName: state => state.user.storeName,
  authorizationList: state => state.user.authorizationList,
  permission_routes:state => state.permission.routes,
  language: state => state.lang.language,
  refundListNum: state => state.orderNum.refundListNum,
  secOrderNum: state => state.orderNum.secOrderNum,
  inOrderNum: state => state.orderNum.inOrderNum,
  psOrderNum: state => state.orderNum.psOrderNum,
  loading: state => state.loading.loadings,
  keepAive: state => state.keepAive.keepAives,
  orderListNum: state => state.orderNum.orderListNum,
}
export default getters
