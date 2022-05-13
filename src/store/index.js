import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
const USER_TOKEN = 'USER_TOKEN'
export default new Vuex.Store({
  state: {
    // 一个对象 用来存储登录的用户信息 里面包括token
    user: getItem(USER_TOKEN) || {}
  },
  getters: {
  },
  // 修改state数据  payload传的参数
  mutations: {
    setUser (state, payload) {
      state.user = payload
      // 把数据同步到本地存储中
      setItem(USER_TOKEN, payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
