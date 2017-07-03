<template>
  <div class = "joinPeople2">
    <mainHead :val="value"></mainHead>
    <img src="/static/images/active/bg.png" class="main_bg">
    <div class="people_main">
      <span class="main_title">已参与353人</span>
      <div class="main_parent">
        <div class="parent_item" v-for="x in peoples">
          <img :src="x.headImg">
          <span>{{x.realName || x.nickName}}</span>
        </div>
        <div class="parent_item" v-if="isExceed">
          <img src="/static/images/sheng.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainHead from './mainHead.vue'
export default {
  name: 'joinPeople',
  props: ['activity'],
  components: {mainHead},
  watch: {
    activity: function (val) {
      if (val.joinActivityInfo === null) return
      this.peoples=[]
      this.isExceed=false
      if (val.joinActivityInfo.length >= 17) {
        this.peoples = val.joinActivityInfo.slice(0, 17);
        this.isExceed = true
      } else {
        this.peoples = val.joinActivityInfo
      }
    }
  },
  data () {
    return {
      value: {
        head: '正在参加的伙伴',
        name: "PARTNER",
        no: '01'
      },
      peoples: [],
      isExceed: false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .joinPeople2
    width 100%
    background #d8006b
    position relative
    overflow hidden
    .main_bg
      position absolute
      width 100%
      z-index 1
      top 0px
    .people_main
      z-index 100
      position relative
      margin auto
      width rrem(1000px)
      .main_title
        display inline-block
        height rrem(76px)
        line-height rrem(76px)
        text-align center
        width 100%
        color #fff
        font-size rrem(30px)
        font-weight bold
        background #434343
      .main_parent
        min-height rrem(256px)
        display flex
        flex-wrap wrap
        background #fff
        width 100%
        .parent_item
          height rrem(256px)
          width rrem(166px)
          text-align center
          img
            margin-top rrem(55px)
            border-radius 100%
            height rrem(120px)
            width rrem(120px)
          span
            font-size rrem(36px)
            margin-top rrem(35px)
            display block
</style>
