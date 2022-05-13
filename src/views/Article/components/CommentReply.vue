<template>
  <!-- 回复评论弹层的内容封装 -->
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <template #left>
        <!-- × 绑定自定义事件 子传父 关闭弹层-->
        <van-icon name="cross" @click="$emit('close')" />
      </template>
    </van-nav-bar>

    <!-- 当前评论项 -->
    <CommentItem :comment_item="comment"></CommentItem>
    <!-- 回复列表 -->
    <van-cell title="全部回复" />
    <!-- 传入id和请求参数c  -->
    <CommentList :source="comment.com_id" type="c" :list="commentList"></CommentList>

    <!-- 发布评论的评论 -->
    <div class="bottom">
      <van-button  size="large" round @click="isPostshow=true">评论评论</van-button>
    </div>
    <!-- 发布评论 -->
          <van-popup v-model="isPostshow" position="bottom">
            <CommentPost
            :target="comment.com_id"
            :art_id="articleId"
             @post-success="onPostSuccess"
            ></CommentPost>
          </van-popup>
  </div>
</template>

<script>
import CommentList from './CommentList'
import CommentItem from './CommentItem'
import CommentPost from './CommentPost'

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      isPostshow: false,
      commentList: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {

  },
  methods: {
    // 评论返回的数据
    onPostSuccess (data) {
      // 关闭弹层
      this.isPostshow = false
      this.comment.reply_count++
      // 将新的评论显示到评论列表顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped>
.bottom{
  background-color: rgb(255, 255, 122);
  position: fixed;
  bottom:0;
  width: 100vw;
  padding: 14px 20px;
  box-sizing: border-box;
}
</style>
