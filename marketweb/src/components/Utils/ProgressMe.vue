<template>
  <div class="progress" :style="{width:count + '%'}">
    {{value}}%
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ProgressMe',
  props: [ 'value' ],
  created () {
    if (this.value <= 30) {
      this.count = 30
    } else {
      this.count = this.value
    }
  },
  data () {
    return {
      over: false,
      current: 0
    }
  }
}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
rrem(val){
  return (val/144px)rem
}
.progress
  height rrem(100px)
  border-radius 40px
  background linear-gradient(to right,#960de5, #ff337c);
  text-align center
  color #fff
  padding-top rrem(10px)
  line-height rrem(100px)
  font-size rrem(56px)
  font-weight bold
</style>
