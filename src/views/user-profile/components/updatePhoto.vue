<template>
  <div class="photo">
    <img class="img" :src="imgsrc" ref="img" />
    <!--1 底部 -->
    <div class="toolbar">
      <div @click="$emit('close')">取消</div>
      <div @click="save">完成</div>
      <!-- //绑定完成点击事件 -->
    </div>
  </div>
</template>

<script>
import { updateUserAvatar } from '@/api/user'
// 1安装 2 引入css js
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
// 4 声明全局
let cropper = null
export default {
  props: {
    imgsrc: {
      type: [String, Object],
      required: true
    }
  },
  // 3 在mounted中初始化
  mounted () {
    const image = this.$refs.img
    // 4 为全局变量赋值
    cropper = new Cropper(image, {
      aspectRatio: 1 / 1
    })
    console.log(cropper)
  },
  created () {},
  data () {
    return {}
  },
  methods: {
    save () {
      console.log(11)
      cropper.getCroppedCanvas({}).toBlob(async (blob) => {
        // const src = URL.createObjectURL(blob)
        // console.log(src)
        try {
          const fd = new FormData()
          fd.append('photo', blob)
          const res = await updateUserAvatar(fd)
          console.log(res)
          // 同步到父组件
          this.$emit('update', res.data.data.photo)
          this.$emit('close')
        } catch (err) {
          console.log(err.message)
        }
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.photo {
  .img {
    max-width: 101%;
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    width: 100vw;
    box-sizing: border-box;
    padding: 10px 20px;
    color: #fff;
  }
}
</style>
