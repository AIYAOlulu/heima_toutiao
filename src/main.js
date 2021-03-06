import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/vant.js'
import 'amfe-flexible'
import '@/styles/index.less'
import './utils/dayjs'// 加载dayjs
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
