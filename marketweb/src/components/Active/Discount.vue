<template>
  <div class = "discount">
    <mainHead :val="value"></mainHead>
    <img src="/static/images/active/bg.png" class="main_bg">
    <div class="people_main">
      <div class="main_parent">
        <div v-html="this.util.escapeToHtml(activity.content)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mainHead from './mainHead.vue'
  export default {
    name:"discount",
    props: ['activity'],
    components: {mainHead},
    watch: {
      activity: function (val, oldVal) {
        if(val.activityType != 2)
          this.value.no = "03";
      }
    },
    data () {
      return {
        value: {
          head: '优惠方案',
          name: "DISCOUNT",
          no: "04"
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .discount
    width:100%
    height auto
    position relative
    background #d8006b
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
      .main_parent
        width 100%
        img
          width 100%
</style>
