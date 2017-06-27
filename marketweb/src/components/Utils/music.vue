<template>
  <div class = "music">
    <audio :src="murl + music" preload="auto" autoplay="autoplay" id="bgMusic" loop ></audio>
    <img :src="'/static/images/music.png'" @click="changeState" id="musicImg">
  </div>
</template>

<script>
  export default {
    props: ['url'],
    data () {
      return {
        state:1,
        music:'',
        r:0,
        i:1,
        timer:null,
        element:null
      }
    },
    watch:{
      url(val){
        this.music = val
      }
    },
    mounted(){
      this.element = document.getElementById("musicImg");
      this.timer = setInterval(this.rotate,30)
    },
    methods: {
      rotate(){
        this.r += this.i;
        if( Math.abs(this.r) >= 360 ) this.r=0
        this.element.style.MozTransform = "rotate(" + this.r + "deg)";
        this.element.style.webkitTransform ="rotate(" + this.r + "deg)";
        this.element.style.msTransform = "rotate(" + this.r + "deg)";
        this.element.style.OTransform = "rotate(" + this.r + "deg)";
        this.element.style.transform = "rotate(" + this.r + "deg)";
      },
      changeState () {
        if (this.state == 1) {
          clearInterval(this.timer);
          this.timer = null;
          this.state = 0;
          document.getElementById('bgMusic').pause();
        } else {
          this.state = 1;
          document.getElementById('bgMusic').play();

          if(this.timer)return;
          this.timer = setInterval(this.rotate,30);
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
    top rrem(80px)
    img
      width rrem(130px)
      height rrem(130px)

</style>
