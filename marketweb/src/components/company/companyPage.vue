<template>
  <div class="companyPage">
    <img src="/static/images/company/bg.png" class="page_img">
    <div class="page_bg"></div>
    <companyHead ></companyHead>
    <companyContent></companyContent>
  </div>
</template>

<script type="text/ecmascript-6">
import companyHead from './companyHead.vue'
import companyContent from './companyContent.vue'
export default {
  name: 'companyPage',
  components:{companyHead,companyContent},
  methods:{
  },
  created(){
  },
  data () {
    return {
    }
  }
}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .companyPage
    width 100%
    height auto
    margin-bottom 20px
    position relative
    .page_img
      width 100%
      position fixed
      top 0px;
    .page_bg
      background #ef0075
      z-index -1
      top 0px
      width 100%
      height rrem(1920px)
      position fixed
</style>
