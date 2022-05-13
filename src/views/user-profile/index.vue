<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <van-cell title="头像"
    @click="$refs.file.click()"
     is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link  @click="isNameshow= true"/>
    <van-cell title="性别" :value="user.gender ? '女' : '男'" is-link  @click="isGendershow= true"/>
    <van-cell title="生日" :value="user.birthday || '1977-00-00'" is-link
    @click="isBirthdyshow=true"/>
  <!-- 编辑昵称弹出层 -->
<van-popup v-model="isNameshow" position="bottom" style="height:90%">
<!-- 封装内容组件 -->
<!--  组件利用v-if进行销毁创建,从而清空输入框  v-model双向绑定数据，子组件固定用value接受，然后将value赋值给子组件数据 -->
<updateName v-if="isNameshow" @close="isNameshow=false"  v-model="user.name"></updateName>
</van-popup>

<!-- 编辑性别 -->
<van-popup v-model="isGendershow" position="bottom" >
<!-- 封装内容组件 -->
<updateGender  v-if="isGendershow"  @close="isGendershow=false" v-model="user.gender"></updateGender>
</van-popup>

<!-- 编辑生日弹层 -->
    <van-popup
    v-model="isBirthdyshow"
    position="bottom">
    <updateBirthday v-model="user.birthday"
    v-if="isBirthdyshow" @close="isBirthdyshow=false"></updateBirthday>
    </van-popup>

    <!-- 头像 -->
    <!-- 1准备file类型输入框  2hidden  3通过点击头像触发input的点击事件  4监听input的change事件-->
    <input type="file" hidden ref="file" @change="onFileChange">
    <!-- 5编辑头像弹层 -->
    <van-popup
    v-model="isPhotoshow"
    position="bottom"
    style="height:100%;">
    <updatePhoto :imgsrc="img"
    v-if="isPhotoshow"
    style="height:100%;"
    @update="user.photo=$event"
    @close="isPhotoshow=false"></updatePhoto>
    </van-popup>
  </div>
</template>

<script>
import updatePhoto from './components/updatePhoto'
import updateBirthday from './components/updateBirthday'
import updateGender from './components/updateGender.vue'
import updateName from './components/updateName'
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'userProfile',
  created () {
    this.loadProfile()
  },
  data () {
    return {
      user: {},
      isNameshow: false,
      isGendershow: false,
      isBirthdyshow: false,
      isPhotoshow: false,
      img: null
    }
  },
  methods: {
    // 获取信息
    async loadProfile () {
      try {
        const res = await getUserProfile()
        this.user = res.data.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    // 监听input的change事件
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      console.log(this.img)
      // 6弹层显示
      this.isPhotoshow = true
      // 上传后清空，不然选择同一张不会触发change
      this.$refs.file.value = ''
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    updateName,
    updateGender,
    updateBirthday,
    updatePhoto
  }
}
</script>

<style scoped lang='less'>
.user-profile {
  /deep/.van-icon{
    color:#fff;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
  background: #f5f7f9;
}
}
</style>
