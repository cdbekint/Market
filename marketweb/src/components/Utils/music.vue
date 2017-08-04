<template>
  <div class="music">
    <audio :src="murl + music" preload="auto" autoplay="autoplay" id="bgMusic" loop></audio>
    <img :src="changeSkin.realBgUrl" @click="changeState" id="musicImg">
  </div>
</template>

<script>
export default {
  props: ['url'],
  data() {
    return {
      state: 1,
      music: '',
      r: 0,
      i: 1,
      timer: null,
      element: null,
      musicImgUrl: {
        musicImg: require('../../../static/images/music.png'),
        musicImgColor: require('../../../static/images/music2.png'),
        musicImgPink: require('../../../static/images/music3.png'),
        musicImgGolden: require('../../../static/images/music4.png'),
        musicImgBlue: require('../../../static/images/music5.png')
      },
      skin:1,
      changeSkin: {
        realBgUrl: {}
      },
    }
  },
  watch: {
    url(val) {
      this.music = val
    }
  },
  created () {
    this.skin = localStorage.getItem('skin')
    if (this.skin == 1) {
      this.changeSkin.realBgUrl = this.musicImgUrl.musicImg
    } else if (this.skin == 2) {
      this.changeSkin.realBgUrl = this.musicImgUrl.musicImgColor
    } else if (this.skin == 3) {
      this.changeSkin.realBgUrl = this.musicImgUrl.musicImgBlue
    } else if (this.skin == 4) {
      this.changeSkin.realBgUrl = this.musicImgUrl.musicImgGolden
    } else if (this.skin == 5) {
      this.changeSkin.realBgUrl = this.musicImgUrl.musicImgPink
    } else {
      this.changeSkin.realBgUrl = this.musicImgUrl.musicImg
    }
  },
  mounted() {
    this.element = document.getElementById("musicImg");
    this.timer = setInterval(this.rotate, 30)
  },
  methods: {
    rotate() {
      this.r += this.i;
      if (Math.abs(this.r) >= 360) this.r = 0
      this.element.style.MozTransform = "rotate(" + this.r + "deg)";
      this.element.style.webkitTransform = "rotate(" + this.r + "deg)";
      this.element.style.msTransform = "rotate(" + this.r + "deg)";
      this.element.style.OTransform = "rotate(" + this.r + "deg)";
      this.element.style.transform = "rotate(" + this.r + "deg)";
    },
    changeState() {
      if (this.state == 1) {
        clearInterval(this.timer);
        this.timer = null;
        this.state = 0;
        document.getElementById('bgMusic').pause();
      } else {
        this.state = 1;
        document.getElementById('bgMusic').play();

        if (this.timer) return;
        this.timer = setInterval(this.rotate, 30);
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
