<template>
  <div class="companyPage">
    <!-- <img src="/static/images/company/bg.png" class="page_img">  -->
    <div class="page_bg"></div>
    <companyHead :companyId="companyId"></companyHead>
    <companyContent :ids="params"></companyContent>
    <div class="homeCompany_body">
      <div class="body_company" style="border:0px;">
      </div>
      <div class="body_company" @click="goHome">
        <img src="/static/images/active/home.png">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import companyHead from './companyHead.vue'
import companyContent from './companyContent.vue'
export default {
  name: 'companyPage',
  components:{companyHead,companyContent},
  methods:{
    goHome(){
      this.$router.push("/home")
    }
  },
  created(){
    var query = this.util.getQuery();
    if(query != void 0){
      this.params = query;
    }
    if(query.companyId != void 0){
      this.companyId = query.companyId
    }
  },
  data () {
    return {
      params:null,
      companyId:null
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
    // height auto
    // margin-bottom 20px
    position relative
    padding-bottom rrem(100px)
    // .page_img
    //   width 100%
    //   position fixed
    //   top 0px;
    .page_bg
      background url('../../../static/images/company/bg1.png') 100% repeat
      background-size rrem(1080px)
      z-index -4
      top 0px
      width 100%
      height rrem(1920px)
      position fixed
</style>
