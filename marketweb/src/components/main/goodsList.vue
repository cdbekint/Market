<template>
  <div class = "goodsList">
  </div>
</template>

<script>
export default {
  name: 'goodsList',
  props: ['activity'],
  watch: {
    activity: function (val) {
      
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .goodsList
    width 100%
</style>
