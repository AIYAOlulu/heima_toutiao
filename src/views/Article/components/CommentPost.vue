<template>
<!-- 发布评论弹层的内容组件 -->
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" :disabled="!message.length" @click="onPost" >发布</van-button>
  </div>
</template>

<script>
// 1封装接口
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  // ==============接收=================
  /*   inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  }, */
  props: {
    // 从父组件传id值
    target: {
      type: [Number, String, Object],
      required: true
    },
    art_id: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 2 点击发布评论
    async onPost () {
      try {
        this.$toast.loading({
          message: '发布中...',
          forbidClick: true,
          duration: 2000
        })
        // 3请求数据
        const { data } = await addComment({
          target: this.target.toString(), // 评论的目标id 有可能是文章，也可能是回复评论
          content: this.message, // 评论的内容：输入框的message
          art_id: this.art_id // 文章id 回复评论时需要  这里不用所有null
        })
        // console.log('发布评论', data)
        this.message = ''// 数据请求回来以后输入框清空
        this.$emit('post-success', data.data)// 将请求回来的数据传递给父组件
        // 并在自定义事件中关闭弹出层
        this.$toast.success('评论成功')
      } catch (err) {
        this.$toast.fail('操作失败，请重试！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f3f3f3;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #5997d0;

    &::before {
      display: none;
    }
  }
}
</style>
