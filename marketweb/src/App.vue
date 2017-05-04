<template>
  <div id="app">
    <vheader></vheader>
    <router-view></router-view>
    <vfooter></vfooter>
  </div>
</template>

<script  type="text/ecmascript-6">
import vheader from '@/components/Header'
import vfooter from '@/components/Footer'
export default {
  name: 'app',
  data () {
    return {
      title: 'hello'
    }
  },
  components: { vheader, vfooter },
  created () {
    if (!this.$store.state.token) {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang='stylus' rel="stylesheet/stylus">

</style>
