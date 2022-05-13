<template>
  <div class="search-container">
    <!-- 搜索栏 开始-->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <!-- <form action="/"> -->
    <van-search
      v-model="searchValue"
      show-action
      background="#3296FA"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      @focus="isResultShow = false"
    />
    <!-- </form> -->
    <!-- 搜索栏 结束-->

    <!-- 搜索结果 开始  -->
    <search-result v-if="isResultShow" :searchValue="searchValue" />
    <!-- 搜索结果 结束 -->

    <!-- 搜索建议 开始 -->

    <search-suggestion
      v-else-if="searchValue"
      :searchValue="searchValue"
      @search="onSearch"
    >
    </search-suggestion>
    <!-- 搜索建议 结束 -->

    <!-- 搜索历史 开始 -->
    <search-history
      @search="onSearch"
      v-else
      :historyList="historyList"
      @clearHistory="historyList = []"
    />
    <!-- 搜索历史 结束 -->
  </div>
</template>

<script>
import { getItem, setItem } from '@/utils/storage'
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
const HISTORYLIST = 'HISTORYLIST'
export default {
  name: 'search-container',
  created () {},
  data () {
    return {
      searchValue: '',
      isResultShow: false, // 搜索结果状态
      historyList: getItem(HISTORYLIST) || []
    }
  },
  methods: {
    // 触发搜索  电脑回车
    onSearch (val) {
      console.log(val)
      // 点击联想建议搜索 将关键词传给建议
      this.searchValue = val
      // 存储历史搜索记录
      this.historyList.unshift(val)
      this.historyList = [...new Set(this.historyList)]
      this.isResultShow = true
    },
    // 取消按钮 回到上一页面
    onCancel () {
      this.$router.back()
    }
  },
  computed: {},
  watch: {
    historyList: {
    // 同步到本地存储
      handler (val) {
        setItem(HISTORYLIST, val)
      },
      deep: true
    }
  },
  filters: {},
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  }
}
</script>

<style scoped lang='less'>
// 搜索框固定定位
.search-container {
  padding-top: 106px;
  .van-search {
    position: fixed;
    width: 100vw;
    top: 0;
    // left: 0;
    // right: 0;
    z-index: 1;
  }
}
</style>
