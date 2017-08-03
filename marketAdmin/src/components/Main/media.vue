<template>
  <div class="media_content">
    <div class="media">
      <img src="/static/images/media.png">
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
.media_content
  width 1240px
  height 625px
  position relative
  margin 134px auto 116px auto
  .media
    width 1110px
    height 625px
    margin 0 auto
    position absolute
    left 64px
    z-index 100
    box-shadow 0 6px 29px 0px rgba(0,0,0,.1)
    img
      width 100%
  .bg
    width 1400px
    height 624px
    position absolute
    left -90px
    top 32px
    background url('../../../static/images/bgT.png')  

</style>
