<template>
  <div class="media_content">
    <div class="media" @click='palyMedia'>
      <video poster="/static/images/media.png" controls="true" preload="auto" id="media">
        <source src="https://m.market.cdbeki.com//system/Marketing.mp4" type="video/mp4"> 您的浏览器暂时不支持此视频，请换用chrome浏览器
      </video>
      <div class="pause" v-if="onOff">
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
      onOff: true
    }
  },
  methods: {
    palyMedia() {
      var media = document.getElementById('media')
      if (this.onOff) {
        media.play()
        this.onOff = !this.onOff
      } else {
        media.pause()
        this.onOff = !this.onOff
      }

    }
  }

}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
rrem(val){
  return (val/108px)rem
}
.media_content
  width rrem(1240px)
  height rrem(625px)
  position relative
  margin rrem(134px) auto rrem(116px) auto
  .media
    width rrem(1110px)
    height rrem(625px)
    margin 0 auto
    position absolute
    left rrem(64px)
    z-index 100
    box-shadow 0 rrem(6px) rrem(29px) 0px rgba(0,0,0,.1)
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
        width 100%
  .bg
    width rrem(1400px)
    height rrem(624px)
    position absolute
    left rrem(-90px)
    top rrem(32px)
    background url('../../../static/images/bgT.png')  
    background-size 100%
</style>
