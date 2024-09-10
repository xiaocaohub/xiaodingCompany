import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from "@/store/modules/permission"
import skinPeeler from './modules/skinPeeler'
import lang from './modules/lang'
import superior from './modules/superior'
import orderNum from './modules/orderNum'
import source from './modules/source'
import loading from './modules/loading'
import keepAive from './modules/keepAive'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission,
    skinPeeler,
    lang,
    superior,
    orderNum,
    source,
    loading,
    keepAive
  },
  getters
})

export default store
