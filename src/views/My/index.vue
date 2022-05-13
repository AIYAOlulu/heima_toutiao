<template>
  <div class="my-container">

    <!-- 已登录 -->
    <div
      class="header user-info"
      v-if="user.token"
    >
      <div class="up">
        <div class="left">
          <img
            :src="userInfo.photo"
            alt=""
          >

          <span>{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button
            size="mini"
            round
            to="/user/profile"
          >编辑资料</van-button>
        </div>
      </div>
      <div class="down">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div
      v-else
      class="header unlogin"
    >
      <div
        class="login-btn"
        @click="$router.push('/login')"
      >
        <img
          src="@/assets/mobile.png"
          alt=""
        >
        <span @click="$router.push('/login')">登录/注册</span>
      </div>

    </div>
    <!-- 宫格 -->
    <van-grid
      class="nav-grid"
      :column-num="2"
      clickable
    >
      <van-grid-item text="收藏">
        <i
          slot="icon"
          class="toutiao toutiao-shoucang"
        ></i>
        <span
          class="text"
          slot="text"
        >收藏</span>
      </van-grid-item>
      <van-grid-item text="文字">
        <i
          slot="icon"
          class="toutiao toutiao-lishi"
        ></i>
        <span
          class="text"
          slot="text"
        >历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 单元格 -->
    <van-cell
      title="消息通知"
      is-link
    />
    <van-cell
      title="小智同学"
      is-link
    />
    <van-cell
      v-if="user.token"
      class="logout-cell"
      title="退出登录"
      center
      clickable
      @click="logout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  created () {
    // 登录了才获取
    if (this.user.token) {
      this.loadUserInfo()
    }
  },

  data () {
    return {
      // 用户信息
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        // 提示框
        await this.$dialog.confirm({ message: '确认要退出吗？' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    },
    async loadUserInfo () {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }

  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.my-container {
  .header {
    height: 361px;
    background: url("@/assets/banner.png") no-repeat center;
    background-size: cover;
  }
  .unlogin {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 132px;
      height: 132px;
      background: #ffffff;
      border: 2px solid #ffffff;
      border-radius: 50%;
      margin-bottom: 15px;
    }
    span {
      font-size: 28px;
      color: #fff;
    }
  }
  .user-info {
    .up {
      padding: 0 32px;
      height: 231px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        img {
          width: 132px;
          height: 132px;
          margin-right: 22px;
        }
        span {
          color: #fff;
          font-size: 30px;
        }
      }
    }
    .down {
      height: 130px;
      display: flex;
      justify-content: space-between;
      padding: 0 94px 0 100px;
      .data-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .nav-grid {
    background: #fff;
    .toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    .text {
      color: #000;
      margin-top: 8px;
      font-size: 28px;
    }
  }
  .logout-cell {
    height: 100px;
    text-align: center;
    color: #eb5253;
    margin: 10px 0;
    font-size: 30px;
  }
}
</style>
