<template>
  <div :class="[changeSkin.activeClass]" :style="{width:count + '%'}">
    {{value}}%
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ProgressMe',
  props: ['value'],
  created() {
    if (this.value <= 30) {
      this.count = 30
    } else {
      this.count = this.value
    }
    this.skin = localStorage.getItem('skin')
    if (this.skin == 1) {
      this.changeSkin.activeClass = this.changeStyle.progress
    } else if (this.skin == 2) {
      this.changeSkin.activeClass = this.changeStyle.progresscolor
    } else if (this.skin == 3) {
      this.changeSkin.activeClass = this.changeStyle.progresspink
    } else if (this.skin == 4) {
      this.changeSkin.activeClass = this.changeStyle.progressgolden
    } else if (this.skin == 5) {
      this.changeSkin.activeClass = this.changeStyle.progressblue
    } else {
      this.changeSkin.activeClass = this.changeStyle.progress
    }
  },
  data() {
    return {
      over: false,
      current: 0,
      changeStyle: {
        progress: 'progress',
        progresscolor: 'progresscolor',
        progresspink: 'progresspink',
        progressgolden: 'progressgolden',
        progressblue: 'progressblue'
      },
      changeSkin: {
        activeClass: ''
      },
      skin: 1
    }
  },
  watch: {
    value(val) {
      if (val > 100) {
        this.count = 100
      } else {
        this.count = val
      }

    }
  }
}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
rrem(val){
  return (val/144px)rem
}
.progress
  height 100%
  border-radius 40px
  background linear-gradient(to right,#960de5, #ff337c);
  text-align center
  color #fff
  padding-top rrem(10px)
  line-height rrem(100px)
  font-size rrem(56px)
  font-weight bold
.progressblue
  height 100%
  border-radius 40px
  background linear-gradient(to right,#0089da 30%, #52b0e8);
  text-align center
  color #fff
  padding-top rrem(10px)
  line-height rrem(100px)
  font-size rrem(56px)
  font-weight bold  
.progresscolor
  height 100%
  border-radius 40px
  background linear-gradient(to right,#960de5 30%, #ff337c);
  text-align center
  color #fff
  padding-top rrem(10px)
  line-height rrem(100px)
  font-size rrem(56px)
  font-weight bold 
.progressgolden
  height 100%
  border-radius 40px
  background linear-gradient(to right,#d3bc89 30%, #f2e0b2);
  text-align center
  color #fff
  padding-top rrem(10px)
  line-height rrem(100px)
  font-size rrem(56px)
  font-weight bold   
.progresspink
  height 100%
  border-radius 40px
  background #ff017e
  text-align center
  color #fff
  padding-top rrem(10px)
  line-height rrem(100px)
  font-size rrem(56px)
  font-weight bold  
</style>
