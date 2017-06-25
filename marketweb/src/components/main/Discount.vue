<template>
  <div class = "gift">
    <mainHead :val="value"></mainHead>
    <div class="section_gift">
      <img src="/static/images/up.png" class = "upImg">
      <div class = "activity_content" v-html="this.util.escapeToHtml(activity.content)">
      </div>
      <img src="/static/images/down.png" class="foot">
    </div>
  </div>
</template>

<script>
  import mainHead from '../Utils/mainHead.vue'
  export default {
    name:"discount",
    props: ['activity'],
    components: {mainHead},
    watch: {
      activity: function (val, oldVal) {
        this.value.name = val.companyName
        if(val.activityType != 2)
          this.value.no = 5;
      }
    },
    data () {
      return {
        value: {
          head: '优惠方案',
          name: null,
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
.activity_content
  min-height rrem(200px)
  padding-left rrem(20px)
  padding-top rrem(20px)
  p
    line-height:1em
    img
      width:100%
      margin-top rrem(20px)
</style>
