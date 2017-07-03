<template>
  <div class="activeHead">
    <div class="head_img">
      <img :src="murl+info.logo" alt="" v-if="info.logo">
    </div>
    <div class="head_txt">
      <p>{{info.name}}</p>
      <span>客服电话：<a :href="'tel://'+info.tel" style="color:#fff">{{info.tel}}</a></span>
      <span>会员数：{{info.member}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'companyHead',
  props:["companyId"],
  watch:{
    companyId(val){
      this.getInfoByCompanyId(val)
    }
  },
  methods:{
    getInfoByCompanyId(val){
      if(val == void 0 || val == '')return
      this.http.get(this.$store.state.prefix + "/shop/?companyId="+val).then(res=>{
        if(res.error == false){
          this.info.name = res.result.companyName;
          this.info.logo = res.result.companyLogo;
          this.info.tel = res.result.companyTel;
          this.info.member = res.result.memberNum;
        }
      })
    }
  },
  created(){
    this.getInfoByCompanyId(this.companyId)
  },
  data () {
    return {
      info:{
        name:'',
        tel:'',
        member:0,
        logo:''
      }
    }
  }
}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .activeHead
    width 100%
    height rrem(125px)
    background #434343
    position relative
    top 0px
    .head_img
      width rrem(150px)
      height rrem(125px)
      display table-cell
      vertical-align middle
      text-align center
      img
        width rrem(100px)
        height rrem(100px)
        border-radius 100%
        vertical-align middle
    .head_txt
      position absolute
      top 0px
      width 100%
      text-align center
      height rrem(125px)
      span
        color #aeaeae
        font-size rrem(24px)
        display inline-block
        margin-right rrem(25px)
      p
        text-align center
        height rrem(95px)
        line-height rrem(100px)
        font-size rrem(50px)
        font-weight bold
        color #fff
        position relative

</style>
