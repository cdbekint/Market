<template>
  <div class="companyPage">
    <img src="/static/images/company/bg.png" class="page_img">
    <div class="page_bg"></div>
    <companyHead ></companyHead>
    <companyContent :ids="params"></companyContent>
    <div class="homeCompany_body">
      <div class="body_company" @click="goCompany">
        <img src="/static/images/active/com.png">
      </div>
      <div class="body_company" @click="goHome">
        <img src="/static/images/active/home.png" alt="">
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
    goCompany(){
      this.comState = "coming";
      setTimeout(()=>{
        this.comState = "com";
      },300);

      if(this.$store.state.isMember == 0){
        this.currentState = true;
        return;
      }
      this.$router.push("/company");
    },
    goHome(){
      this.homeState = "homeing";
      setTimeout(()=>{
        this.homeState = "home";
      },300);
      if(this.$store.state.isMember == 0){
        this.currentState = true;
        return;
      }
      this.$router.push("/home")
    }
  },
  created(){
    var query = this.util.getQuery();
    alert(query.id+","+query.activeId)
    if(query.id != void 0){
      this.params = query;
    }
  },
  data () {
    return {
      params:null
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
      z-index -4
      top 0px
      width 100%
      height rrem(1920px)
      position fixed
</style>
