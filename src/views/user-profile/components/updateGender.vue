<template>
  <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    @cancel="$emit('close')"
    @confirm="onConfirm"
    :default-index="value"
    @change="onChange"
  />
</template>

<script>
import { updateUserProfile } from '@/api/user.js'

export default {
  props: {
    // 接受数据
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    onChange (picker, value, index) {
      console.log(picker, value, index)
      this.localGender = index
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0// 持续展示
      })
      try {
        await updateUserProfile({
          gender: this.localGender
        })
        this.$emit('input', this.localGender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
