<template>
  <div class = "music">
    <audio :src="murl + url" preload="auto" autoplay="autoplay" id="bgMusic" loop></audio>
    <img :src="'/static/images/'+ state + '.png'" @click="changeState">
  </div>
</template>

<script>
  export default {
    props: ['url'],
    data () {
      return {
        state: 'on'
      }
    },
    mounted () {
      setTimeout(() => {
        document.addEventListener('WeixinJSBridgeReady', function () {
          document.getElementById('bgMusic').play()
        }, false)
      }, 500)
    },
    methods: {
      changeState () {
        if (this.state === 'on') {
          this.state = 'off'
          document.getElementById('bgMusic').pause()
        } else {
          this.state = 'on'
          document.getElementById('bgMusic').play()
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/144px)rem
  }
  .music
    position fixed
    width rrem(130px)
    height rrem(130px)
    z-index 1000
    right rrem(70px)
    top rrem(150px)
    img
      width rrem(130px)
      height rrem(130px)

</style>
