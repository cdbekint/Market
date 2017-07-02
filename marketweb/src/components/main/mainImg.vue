<template>
  <div class='main'>
    <div class = "main_head">
      <img src="/static/images/a1.png" alt="">
    </div>
    <img :src='murl + activity.activityImg' v-if="activity.activityImg" class = "main_img">
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
    return (val/144px)rem
  }
  .main
    width 100%
    position relative
    .main_head
      position absolute
      top 0px
      width 100%
      img
        height rrem(212px)
        width rrem(280px)
    .main_img
      width:100%
      height auto
</style>
