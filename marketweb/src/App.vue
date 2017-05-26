<template>
  <div id="app">
    <vheader></vheader>
    <router-view></router-view>
  </div>
</template>

<script  type="text/ecmascript-6">
import vheader from '@/components/Header'
export default {
  name: 'app',
  data () {
    return {
      title: 'hello'
    }
  },
  components: { vheader },
  created () {
    if (!this.$store.state.token) {
//      this.$router.push({
//        path: '/login'
//      })
    }
  }
}
</script>

<style lang='stylus' rel="stylesheet/stylus">

</style>
