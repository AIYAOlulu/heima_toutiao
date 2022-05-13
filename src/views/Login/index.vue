<template>
  <!-- 登录页面 -->
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
    >
      <van-icon
        slot="left"
        name="arrow-left"
        color="#fff"
        @click="$router.push('/my')"
      />
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form
      @submit="onSubmit"
      ref="loginForm"
    >
      <!-- 手机号输入框 -->
      <van-field
        type="number"
        name="mobile"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
      >
        <!-- 图标 -->
        <i
          slot="left-icon"
          class="toutiao toutiao-shouji"
        ></i>
      </van-field>
      <!-- 验证码输入框 -->
      <van-field
        maxlength="6"
        v-model="user.code"
        type="number"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <!-- 图标 -->
        <i
          slot="left-icon"
          class="toutiao toutiao-yanzhengma"
        ></i>
        <!-- 获取验证码 -->
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            v-if="isShow"
            :time="time"
            format="ss 秒"
            @finish="isShow=false"
          />
          <van-button
            @click="onSendSms"
            v-else
            round
            native-type="button"
            size="mini"
            class="send-btn"
            type="default"
          > 发送验证码</van-button>

        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div style="margin: 26px 16px 0">
        <van-button
          color="#6DB4FB"
          block
          type="info"
          native-type="submit"
        >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  created () {},
  data () {
    return {
      // 表单数据 v-model绑定
      user: {
        mobile: '18935083595',
        code: '246810'
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      time: 10 * 1000,
      isShow: false// 是否展示倒计时
    }
  },
  methods: {
    // 1注册表单提交事件
    async onSubmit () {
      // 2.获取表单数据
      const user = this.user
      // 3.表单验证
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 2000
      })
      // 4提交表单，请求登录
      try {
        const res = await login(user)
        console.log('登录成功', res)
        // 登录成功提交
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('成功')
        this.$router.push('/')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败')
        }
      }
    },
    // 验证码
    async onSendSms () {
      console.log('onSendSms')
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 验证通过，显示倒计时
      this.isShow = true
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送验证码成功，请查看你的手机')
      } catch (err) {
        // 发送失败频繁操作关闭倒计时
        this.isShow = false
        if (err.response) {
          this.$toast.fail(err.response.data.message)
        } else {
          this.$toast.fail('验证码错误')
        }
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-container {
  font-size: 37px;
}
.send-btn {
  width: 152px;
  height: 46px;
  background: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666666;
}
</style>
