<template>
  <div>
    <!-- 封装点赞功能组件 -->
    <van-icon
      :color="value === 1 ? 'red' : ''"
      :name="value === 1 ? 'good-job' : 'good-job-o'"
      :loading="loading"
      @click="onCollect"
    />
  </div>
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    article_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  name: 'LikeArticle',
  created () {},
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
      try {
        let status = -1
        if (this.value === 1) {
        //  要取消点赞
          await deleteLike(this.article_id)
        } else {
          await addLike(this.article_id)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '已点赞' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败，请重试！')
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
</style>
