import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/Login'), meta: { title: '登录页面' } },
  // 父组件路由
  {
    path: '/',
    redurect: '/home',
    component: () => import('@/views/Layout'),
    meta: { title: '主页' },
    children: [
      { path: '/home', name: 'home', component: () => import('@/views/Home'), meta: { title: '主页' } },
      { path: '/qa', name: 'qa', component: () => import('@/views/Qa'), meta: { title: '问答页面' } },
      { path: '/video', name: 'video', component: () => import('@/views/Video'), meta: { title: '视频页面' } },
      { path: '/my', name: 'my', component: () => import('@/views/My'), meta: { title: '我的页面' } }
    ]
  },
  { path: '/search', name: 'search', component: () => import('@/views/Search'), meta: { title: '搜索页面' } },
  { path: '/article/:articleId', name: 'article', component: () => import('@/views/Article'), meta: { title: '文章详情' }, props: true },
  {
    path: '/user/profile',
    component: () => import('@/views/user-profile/index.vue'),
    meta: { title: '编辑用户资料' }
  }
]

const router = new VueRouter({
  // mode: 'history', //开发不用
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router
