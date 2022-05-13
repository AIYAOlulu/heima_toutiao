<template>
  <div>
    <div class="channel-edit">
      <!-- 我的频道 -->
      <van-cell>
        <div
          slot="title"
          class="title-cell"
        >
          <h3>我的频道</h3>
          <van-button
            type="danger"
            plain
            round
            size="mini"
            @click="isEdit=!isEdit"
          >{{isEdit?'完成':'编辑'}}</van-button>
        </div>

      </van-cell>
      <van-grid
        :column-num="4"
        :gutter="10"
        class="my-gaid"
      >
        <van-grid-item
          class="grid-item"
          v-for="(item,index) in myChannels"
          :key="index"
          :style="{color:active===index?'red':'#000'}"
          @click="onMyChannelClick(item, index)"
        >
          <van-icon
            v-if="index!==0"
            v-show="isEdit"
            slot="icon"
            name="clear"
          ></van-icon>
          <span
            slot="text"
            class="text"
            :style="{color:active===index?'red':'#000'}"
          >{{item.name}}</span>
        </van-grid-item>
      </van-grid>
      <!-- /我的频道 -->

      <!-- 频道推荐 -->
      <van-cell>
        <div
          slot="title"
          class="title-cell"
        >
          <h3>频道推荐</h3>
        </div>

      </van-cell>
      <van-grid
        :column-num="4"
        :gutter="10"
        class="tuijian-grid"
      >
        <van-grid-item
          class="grid-item"
          v-for="channel in recommendChannels"
          :key="channel.index"
          icon="plus"
          :text="channel.name"
          @click="addChannel(channel)"
        />
      </van-grid>
      <!-- /频道推荐 -->
    </div>
  </div>
</template>

<script>
import { getAllChannels, editChannels } from '@/api/channel.js'
// 存数据
import { setItem } from '@/utils/storage'
// 常量
const CHANNELS = 'CHANNELS'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  name: 'ChannelEdit',
  created () {
    this.loadAllChannels()
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
      // flexChannels: []

    }
  },
  methods: {
    // 所有频道
    async loadAllChannels () {
      try {
        const res = await getAllChannels()
        console.log(res)
        this.allChannels = res.data.data.channels
      } catch (err) {
        console.log(err.message)
      }
    },
    // 添加功能
    addChannel (channel) {
      console.log(channel)
      this.myChannels.push(channel)
      this.$toast.success('添加成功')
    },
    // 切换  删除
    onMyChannelClick (item, index) {
      console.log(item, index)
      if (this.isEdit) {
        // 推荐不能删
        if (index === 0) return
        // 删除
        this.myChannels.splice(index, 1)
        // 删激活前一个index-1
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.$toast.success('删除成功')
      } else {
        // 切换
        this.$emit('update-active', index, false)
      }
    }
  },
  computed: {
    // 计算推荐频道recommendChannels=allChannels-myChannel.id
    recommendChannels () {
      // return this.allChannels.filter(channel => {
      //   const mychannel = this.myChannels.find(myChannel => {
      //     return myChannel.id === channel.id
      //   })
      //   return !mychannel
      // })
      return this.allChannels.filter(item => !this.myChannels.some(item1 => item1.id === item.id))
    }
  },
  watch: {
    // 深度监听channels
    myChannels: {
      deep: true,
      async handler (newVal) {
        // 已登录  封装接口  把修改以后的数据传过去
        if (this.$store.state.user.token) {
          // console.log('登录')
          try {
            const res = await editChannels({ channels: this.myChannels })
            console.log(res)
          } catch (err) {
            // 错误提示
            this.$toast.fail(err.message)
          }
        } else {
          // console.log('未登录')
          // 未登录本地存储 数据持久化
          setItem(CHANNELS, newVal)
        }
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-edit {
  padding: 90px 0;
  .title-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .h3 {
      width: 133px;
      height: 32px;
      font-size: 32px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      line-height: 36px;
    }

    .van-button {
      width: 104px;
      height: 48px;
    }
  }
  /deep/.my-gaid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 36px;
        color: rgb(181, 181, 181);
      }
    }
  }

  /deep/.grid-item {
    width: 160px;
    height: 86px;
    border-radius: 6px;
    white-space: nowrap;

    .van-grid-item__content {
      background: #f4f5f6;
      .van-grid-item__text,
      .text {
        margin-top: 0;
        font-size: 28px;
        color: #222;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/.tuijian-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon {
          font-size: 28px;
          margin-right: 6px;
          margin-top: -2px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
