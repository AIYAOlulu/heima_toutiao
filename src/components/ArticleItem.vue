<template>
  <div >
    <!-- 封装的文章列表项 -->
    <van-cell class='article-item' :to="`/article/${article.art_id}`">
      <!-- 标题 -->
      <div
        slot="title"
        class='title van-multi-ellipsis--l2'
      >{{article.title}}</div>
      <!-- 图片 -->
      <div
        slot="label"
        class='label'
      >
        <!-- 3图 -->
        <div
          class="cover-wrap"
          v-if="article.cover.type===3"
        >
          <div
            class="cover-item"
            v-for="(img,index) in article.cover.images"
            :key="index"
          >
            <van-image
              :src="img"
              fit="cover"
              class='cover-item-img'
            ></van-image>
          </div>

        </div>
        <!-- 详情 -->
        <div class="label-info-wrap">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}评论</span>
          <span>{{article.pubdate | relativeTime}}</span>
        </div>
      </div>
      <!-- 1图 -->
      <van-image
        v-if="article.cover.type===1"
        slot='default'
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      ></van-image>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  created () {},
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      width: 232px;
      height: 146px;
      .cover-item-img {
        width: 228px;
        height: 146px;
      }
    }
  }
}
</style>
