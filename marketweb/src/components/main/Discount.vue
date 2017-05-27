<template>
  <div class = "gift">
    <mainHead :val="value"></mainHead>
    <div class="section_gift">
      <img src="/static/images/up.png" class = "upImg">
      <div class = "gift_img">
        <img :src='murl + activity.activityImg' class = "main_img">
      </div>
      <img src="/static/images/down.png" class="foot">
    </div>
  </div>
</template>

<script>
  import mainHead from '../Utils/mainHead.vue'
  export default {
    props: ['activity'],
    components: {mainHead},
    data () {
      return {
        value: {
          head: '优惠方案',
          name: this.activity.companyName,
          no: 6
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/144px)rem
  }
  .gift
    width:100%
    height auto
    position relative
    background #fff
    .section_gift
      width:96%
      margin auto
      position relative
      .upImg
        position absolute
        top rrem(-75px)
        left rrem(20px)
        width 100%
      .foot
        width 100%
        margin-top rrem(-320px)
        margin-left rrem(-30px)
      .gift_img
        width 97%
        margin auto
        img
          width 100%
          display block
          margin auto
</style>
