<template>
  <div class="media_content">
    <div class="media" @click='palyMedia'>
      <video poster="/static/images/media.png" controls="true" preload="auto" id="media">
        <source src="https://m.market.cdbeki.com//system/Marketing.mp4" type="video/mp4"> 您的浏览器暂时不支持此视频，请换用chrome浏览器
      </video>
      <div class="pause" v-if="!onOff" >
        <img src="/static/images/zanting.png">
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onOff: false
    }
  },
  methods: {
    palyMedia() {
      var media = document.getElementById('media')
      if (!this.onOff) {
        media.play()
        this.onOff = true
      } else {
        media.pause()
        this.onOff = false
      }

    }
  }

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
    video
      width 100%
    .pause
      width 100%
      height 100%
      position absolute
      left 0
      top 0
      z-index 2000
      img
        width 100$
  .bg
    width 1400px
    height 624px
    position absolute
    left -90px
    top 32px
    background url('../../../static/images/bgT.png')  

</style>
