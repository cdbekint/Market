<template>
  <div class = "gift">
    <mainHead :val="value"></mainHead>
    <div class="section_gift">
      <img src='https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto'>
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

      .foot
        width 100%
        margin-top rrem(-320px)
        margin-left rrem(-30px)
</style>
