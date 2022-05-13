<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <!-- /导航栏 -->
  <!-- 输入框 -->
  <div style="padding: 10px;">
    <van-field
      v-model="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新昵称"
      show-word-limit
    />
  </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: 'updateName',
  props: {
    // 接受数据
    value: {
      type: String,
      required: true
    }
  },
  created () {

  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onClickRight () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0// 持续展示
      })
      try {
        if (!this.localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await updateUserProfile({
          name: this.localName
        })
        this.$emit('input', this.localName)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
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
