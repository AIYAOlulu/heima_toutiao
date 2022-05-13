<template>
  <div>
    <!-- 父组件 -->
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 标签栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/home">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>首页
      </van-tabbar-item >
      <van-tabbar-item to="/qa" icon="search">
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>问答
      </van-tabbar-item>
      <van-tabbar-item to="/video" icon="friends-o">
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>视频
      </van-tabbar-item>
      <van-tabbar-item to="/my" icon="setting-o">
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>{{$store.state.user.token?'我的':'未登录'}}
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  created () {},
  data () {
    return { active: '' }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao{
  font-size: 40px;
}
</style>
