<template>
<!-- 封装的关注操作功能组件 -->
  <van-button
    v-if="is_followed"
    round
    @click="onFollow"
    :loading="followLoading"
    size="small"
  >已关注</van-button>
  <van-button
    v-else
    type="info"
    color="#3296fa"
    round
    @click="onFollow"
    size="small"
    :loading="followLoading"
    icon="plus"
  >关注</van-button>

</template>

<script>
import { addFollow, deleteFollow } from '@/api/user.js'
export default {
  name: 'FollowUser',
  props: {
    is_followed: {
      type: Boolean,
      required: true
    },
    userid: {
      type: [Number, String, Object],
      required: true
    }
  },
  created () { },
  data () {
    return {
      followLoading: false
    }
  },
  methods: {
    // 关注取消关注
    async onFollow () {
      this.followLoading = true
      try {
        if (this.is_followed) {
          // 已关注，取消关注
          await deleteFollow(this.userid)
        } else {
          // 未关注，添加关注
          await addFollow(this.userid)
        }
        // 取反 更新视图
        // this.article.is_followed = !this.article.is_followed
        this.$emit('update-is_followed', !this.is_followed)
      } catch (err) {
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast.fail(message)
      }
      this.followLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
