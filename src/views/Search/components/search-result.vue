<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  props: {
    searchValue: {
      type: String,
      require: true
    }
  },
  name: 'SearchResult',
  components: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 20
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onLoad()
  },
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const res = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perpage,
          q: this.searchValue
        })
        console.log(res)
        this.list.push(...res.data.data.results)
        this.loading = false
        if (res.data.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail(err.message)
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
