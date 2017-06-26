<template>
  <div class="companyHead">
    <div class="head_img">
      <img :src="murl+info.logo" alt="">
    </div>
    <div class="head_txt">
      <p>{{info.name}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'companyHead',
  props:["companyId"],
  created(){
    var url = this.companyId == void 0 ? '':'?companyId='+this.companyId
    this.http.get(this.$store.state.prefix + "/shop"+url).then(res=>{
      if(res.error == false){
        this.info.name = res.result.companyName;
        this.info.logo = res.result.companyLogo;
      }
    })
  },
  data () {
    return {
      info:{
        name:'巴黎春天',
        logo:'/static/images/a1.png'
      }
    }
  }
}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .companyHead
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
      height rrem(125px)
      p
        text-align center
        height rrem(125px)
        line-height rrem(125px)
        font-size rrem(60px)
        font-weight bold
        color #fff
        position relative

</style>
