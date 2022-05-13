<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isloading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail markdown-body" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>

          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            :loading="followLoading"
            size="small"
            @click="onFollow"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            :loading="followLoading"
            icon="plus"
            @click="onFollow"
          >关注</van-button> -->
          <!-- 父传子传值 -->
          <FollowUser
            :is_followed="article.is_followed"
            class="follow-btn"
            :userid="article.aut_id"
            @update-is_followed="article.is_followed = $event"
          ></FollowUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论组件 -->
        <!--3✿✿✿ 接收回复评论的自定义事件 click-reply -->
        <CommentList
          @click-reply="onReplyClick"
          :list="commentList"
          :source="article.art_id"
          @comment-data="totalCount = $event.total_count"
        ></CommentList>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            @click="show = true"
            round
            size="small"
            >写评论</van-button
          >
          <!-- 发布评论 -->
          <van-popup v-model="show" position="bottom">
            <CommentPost
              :target="article.art_id"
              :articleId="articleId"
              @post-success="onPostSuccess"
            ></CommentPost>
          </van-popup>

          <!-- 评论数量 -->
          <van-icon name="comment-o" :badge="totalCount" color="#777" />
          <!-- 收藏 -->
          <!-- <van-icon
        color="#777"
        name="star-o"
      /> -->
          <CollectArticle
            :is_collected.sync="article.is_collected"
            :article_id="article.art_id"
          />
          <!-- 点赞 -->
          <!-- <van-icon
        color="#777"
        name="good-job-o"
      /> -->
          <LikeArticle
            v-model="article.attitude"
            :article_id="article.art_id"
          ></LikeArticle>
          <!-- 分享 -->
          <van-icon
            name="share"
            color="#777777"
            @click="showShare = true"
          ></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!--✿✿✿ 评论回复弹出层 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <CommentReply
        :comment="currentComment"
        :articleId="articleId"
        @close="isReplyShow = false"
      ></CommentReply>
    </van-popup>

    <!-- 分享弹层 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import CommentReply from './components/CommentReply'
import CommentPost from './components/CommentPost.vue'
import CommentList from './components/CommentList'
import LikeArticle from '@/components/LikeArticle'
import CollectArticle from '@/components/CollectArticle'
import FollowUser from '@/components/FollowUser'
import 'github-markdown-css'
import { getArticleById } from '@/api/article.js'
import { ImagePreview } from 'vant'
// import { addFollow, deleteFollow } from '@/api/user.js'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  //= ================给所有后代组件提供数据=================
  /*   provide: function () {
    return {
      articleId: this.articleId
    }
  }, */
  props: {
    // props解耦 根据列表中的id，获取文章详情
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      isloading: true,
      errStatus: 0,
      totalCount: 85, // 评论总数量 动态绑定到badges
      show: false,
      commentList: [], // 子组件评论列表数据 通过props
      isReplyShow: false,
      currentComment: {}, // 点击回复的那个评论对象
      showShare: false,
      // 分享面板
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    // 获取文章详情
    async loadArticle () {
      // this.isloading = true   本来就是不用写
      try {
        const { data } = await getArticleById(this.articleId)
        this.isloading = false
        this.article = data.data
        // 初始化图片点击预览  数据驱动试图  也可以使用this.nextTick(()=>{})
        setTimeout(() => {
          // console.log(this.$refs['article-content'])
          this.previewImage()
        }, 0)
      } catch (err) {
        console.log(err.message)
        if (err.response && err.response.status === 404) {
          this.isloading = false
        }
        this.$toast('获取文章详情失败')
      }
      this.isloading = false
    },
    // 图片预览
    previewImage () {
      // 得到所有的img节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      console.log(imgs)
      const imgUrls = []
      imgs.forEach((img, index) => {
        imgUrls.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images: imgUrls, // 预览的图片地址
            startPosition: index
          })
        }
      })
    },
    // 关注取消关注 已封装
    // 评论返回的数据
    onPostSuccess (data) {
      // 关闭弹层
      this.show = false
      // 将新的评论显示到评论列表顶部
      this.commentList.unshift(data.new_obj)
      this.totalCount++
    },

    // 评论回复
    onReplyClick (comment) {
      console.log('评论对象', comment)
      this.currentComment = comment

      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  /deep/ .van-icon-arrow-left {
    color: #fff;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
  .van-share-sheet {
    padding: 10px 30px !important;
    box-sizing: border-box;
  }
}
</style>
