<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="home-nav-bar"
      title="标题"
      fixed
    >
      <template #title>
        <van-button
          type="info"
          round
          class="btn"
          icon="search"
          to="/search"
        >搜索</van-button>
      </template>

    </van-nav-bar>
    <!-- 标签页 -->
    <van-tabs
      v-model="active"
      animated
      swipeable
      class="home-tabs"
    >
      <van-tab
        :title="item.name"
        v-for="item in channels"
        :key="item.id"
      >
        <!-- 文章列表 -->
        <ArticleList :id="item.id">

        </ArticleList>
      </van-tab>
      <!-- 图标 更多 -->
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isShow=true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height:'98%'}"
    >
      <ChannelEdit
        @update-active="onUpdateActive"
        :myChannels="channels"
        :active="active"
      ></ChannelEdit>
      <!-- /弹出层 -->

    </van-popup>
  </div>
</template>

<script>
import ChannelEdit from './components/ChannelEdit'
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/ArticleList.vue'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'

export default {
  created () {
    this.loadChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isShow: false// 弹出层状态
    }
  },
  methods: {
    // 未登录 保存本地存储
    async loadChannels () {
      const list = getItem(CHANNELS)
      if (!this.$store.state.user.token && list) {
        this.channels = list
      } else {
        try {
          const { data } = await getUserChannels()
          console.log(data.data.channels)
          this.channels = data.data.channels
        } catch (err) {
          this.$toast.fail('获取用户频道失败')
        }
      }
    },

    // 切换频道高亮
    onUpdateActive (index, isShow = true) {
      // console.log('home', index)
      // 高亮切换   弹出层关闭
      this.active = index
      this.isShow = isShow
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleList, ChannelEdit }
}
</script>

<style scoped lang='less'>
.home-container {
  padding-top: 85px;
  padding-bottom: 98px;
  .home-nav-bar {
    background-color: #3296fa;
    /deep/.van-nav-bar__title {
      max-width: none;
    }
    .btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border-radius: 32px;
      color: #fff;
      font-size: 28px;
      .van-icon {
        color: #fff;
        font-size: 32px;
      }
    }
  }
  .home-tabs {
    margin-top: 90px;
    /deep/.van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      height: 82px;
      left: 0;
      right: 0;
      .van-tab {
        border-right: 1px solid #edeff3;
        min-width: 200px;
        text-align: center;
        font-size: 30px;
        color: #777;
      }
      .van-tab--active {
        color: #333;
      }
      .van-tabs__line {
        width: 31px;
        height: 6px;
        background-color: #3296fa;
        margin-bottom: 9px;
      }
      .hamburger-btn {
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 66px;
        height: 82px;
        background-color: #fff;
        opacity: 0.902;
        i.toutiao {
          font-size: 33px;
        }
        &:before {
          content: "";
          position: absolute;
          left: 0;
          width: 2px;
          height: 100%;
          background-image: url("@/assets/gradient-gray-line.png");
          background-size: contain;
        }
      }
    }
  }
}
</style>
