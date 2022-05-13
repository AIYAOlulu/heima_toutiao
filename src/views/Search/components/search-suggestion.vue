<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      icon="search"
      @click="$emit('search',item)"
    >
      <span
        slot="title"
        v-html="acFn(item)"
      ></span>
    </van-cell>
  </div>
</template>

<script>
// 3 封装并引入接口数据
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    // 1 接受搜索关键词
    searchValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: []
    }
  },
  computed: {

  },
  watch: {
    // 2 侦听值的更新
    searchValue: {
      // 监视的处理函数
      // debounce 防抖函数
      handler: debounce(function (newVal) {
        //  5 调用方法 实参为新的关键词
        this.loadSearchSuggestion(newVal)
      }, 1000),
      // 首次监视触发
      immediate: true
    }
  },
  created () {

  },

  mounted () {},
  methods: {
    // 4封装获取联想建议的方法
    async loadSearchSuggestion (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.list = data.data.options
      } catch (err) {
        this.$toast.fail('获取失败')
      }
    },
    // 高亮方法
    acFn (text) {
      if (text) {
        const activeItem = `<span style="color: red">${this.searchValue}</span>`
        const reg = new RegExp(this.searchValue, 'gi')
        return text.replace(reg, activeItem)
      } else {
        console.log('搜索建议为空')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
