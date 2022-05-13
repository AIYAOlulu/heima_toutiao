<template>

    <!-- 封装收藏功能组件 -->
    <van-icon
        :color="is_collected?'#ffa500':'#777'"
        :name="is_collected?'star':'star-o'"
        :loading="loading"
        @click="onCollect"
      />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    },
    article_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  created () {},
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.is_collected) {
          // 已收藏，要取消
          await deleteCollect(this.article_id)
        } else {
          await addCollect(this.article_id)
        }

        this.$emit('update:is_collected', !this.is_collected)
        this.$toast.success(this.is_collected ? '取消收藏' : '收藏成功')
      } catch (err) {
        this.$toast.fail('操作失败，请重试！')
      }
      this.loading = false
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
