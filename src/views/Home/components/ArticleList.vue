<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="item in list"
          :key="item.index"
          :title="item.title"
        /> -->
        <!-- 封装的文章列表项 -->
        <ArticleItem
          v-for="item in list"
          :key="item.index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getArticles } from '@/api/article'
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () { this.onLoad() },
  data () {
    return {
      list: [], // 文章列表数据
      error: false,
      loading: false, // 上拉加载更多的 loading 状态
      finished: false, // 是否加载结束
      timestamp: null,
      refreshing: false
    }
  },
  methods: {
    // 当触发上拉加载更多的时候调用该函数
    async  onLoad () {
      if (this.refreshing) {
        this.list = []
        this.refreshing = false
        // this.timestamp = Date.now()
      }
      try {
        // 请求获取数据
        const res = await getArticles({
          channel_id: this.id, // 频道 id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 错误测试
        // if (Math.random() > 0.5) {
        //   JSON.parse('shudnci')
        // }
        console.log(res)
        this.list = [...this.list, ...res.data.data.results]
        // console.log(this.list)
        this.loading = false
        if (res.data.data.results.length) {
          this.timestamp = res.data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log('获取失败')
        this.loading = false // 关闭 loading 效果
        this.error = true
      }
    },
    // 下拉刷新会触发
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
