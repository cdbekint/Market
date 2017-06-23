<template>
  <div id="app">
<!--    <vheader></vheader>-->
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

    this.$store.state.token = window.localStorage["token"];
    debugger
    alert("App "+this.$store.state.token )
    if (this.$store.state.token == '' || this.$store.state.token == void 0) {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang='stylus' rel="stylesheet/stylus">

</style>
