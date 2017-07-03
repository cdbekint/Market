<template>
  <div class='main'>
    <div class = "main_head">
      <div class="return_bg"></div>
      <div class="head_return">
        <img src="/static/images/company/return.png">
        <span>{{activity.shareNum}}</span>
      </div>
      <div class="head_return">
        <img src="/static/images/company/view.png">
        <span>{{activity.viewNum}}</span>
      </div>
    </div>
    <div class="main_rule">
      <div class="return_bg"></div>
      <span>活动规则</span>
    </div>
    <img :src='murl + activity.activityImg' class = "main_img" v-if="activity.activityImg">
  </div>
</template>

<script>
export default {
  name: 'mainImg',
  props: ['activity'],
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .main
    width 100%
    min-height rrem(540px)
    position relative
    .main_head
      position absolute
      height rrem(55px)
      top rrem(30px)
      width rrem(310px)
      display flex
      .return_bg
        width 100%
        height 100%
        position absolute
        background #000
        border-top-right-radius rrem(40px)
        border-bottom-right-radius rrem(40px)
        top 0px
        opacity 0.3
      .head_return
        flex 1
        text-align center
        padding-top rrem(8px)
        position relative
        img
          width rrem(35px)
          height rrem(35px)
        span
          position relative
          top rrem(-3px)
          font-size rrem(34px)
          color #fff
    .main_rule
      position absolute
      width rrem(190px)
      height rrem(55px)
      top rrem(105px)
      text-align center
      line-height rrem(55px)
      .return_bg
        width 100%
        height 100%
        position absolute
        background #000
        border-top-right-radius rrem(40px)
        border-bottom-right-radius rrem(40px)
        top 0px
        opacity 0.3
      span
        position relative
        font-size rrem(32px)
        color #fff
    .main_img
      width:100%
      height auto
</style>
