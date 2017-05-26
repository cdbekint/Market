<template>
  <div class="progress" :style="{width:value + '%'}">
    {{value}}%
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ProgressMe',
  props: [ 'value' ],
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
  margin-top rrem(10px)
  height rrem(100px)
  border-radius 40px
  background #fcfc8e
  padding-left rrem(50px)
  line-height rrem(100px)
  font-size rrem(56px)
  font-weight bold
</style>
