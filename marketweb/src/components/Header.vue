<template>
  <div class="companyName">
   {{Title}}
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Header',
  props:['Title'],
  watch:{
    Title(val){
      console.log(val)
      if(val == '' || val == void 0){
        this.Title = '射洪巴黎春天'
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
.companyName
  width:100%
  height:40px
  display:block
  background:rgb(22,37,56)
  color:#fff
  font-family:'微软雅黑'
  text-align:center
  line-height:40px
  font-size:1.2em
  font-weight:800
</style>
