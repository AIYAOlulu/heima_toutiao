<template>
  <!-- 评论列表组件 -->
  <!-- :immediate-check="false" 关闭首次初始检查-->
  <van-list
    :immediate-check="false"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
  >
    <!-- 2✿✿✿  接收子组件的自定义事件  不作处理继续往父组件传递-->
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :comment_item="item"
      @click-reply="$emit('click-reply', $event)"
    />
  </van-list>
</template>

<script>
import CommentItem from './CommentItem.vue'
// 评论数据接口
import { getComments } from '@/api/comment'
export default {
  name: 'CommentList',
  props: {
    type: {
      type: String,
      default: 'a',
      // 校验，必须是a或c
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    },
    // id
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      error: false,
      offset: null, // 请求下一页数据的页码
      limit: 10
    }
  },
  methods: {
    // 滚动到底部触发 获取评论数据
    async onLoad () {
      try {
        // 1请求数据
        const { data } = await getComments({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取下一页数据的标记
          limit: this.limit
        })
        // 2 添加到列表
        // console.log('评论列表', data.data.results)
        const { results } = data.data
        this.list.push(...results)
        // 子传父：评论数量
        this.$emit('comment-data', data.data)
        // 3 关闭加载
        this.loading = false
        // 4 判断是否还有数据
        if (results.length) {
          // 获取下一页数据页码
          this.offset = data.data.last_id
        } else {
          // 没有结束
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.error = true
        this.loading = false
      }
    }
  },

  computed: {},
  watch: {},
  filters: {},
  components: {
    CommentItem
  }
}
</script>

<style scoped lang='less'>
</style>
