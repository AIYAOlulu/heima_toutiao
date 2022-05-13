<template>
  <div class="update-birthdy">
    <!-- currentDate双向绑定了日期选择器  默认值且同步选择的日期 -->
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  created () {},
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserProfile({
          birthday: currentDate
        })
        this.$emit('input', currentDate)
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
