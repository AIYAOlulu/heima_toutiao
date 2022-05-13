import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'// 加载中文语言包

dayjs.locale('zh-cn')// 全局使用简体中文
// 获取当前最新事件
console.log(dayjs().format('YYYY-MM-DD'))// 2022-04-24
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

// 全局过滤器：处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
// console.log(dayjs().from(dayjs('1990-01-01'), true))
// console.log(dayjs().to(dayjs('1990-01-01')))  32年前
// console.log(dayjs().toNow()) // 几秒前
