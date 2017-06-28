<template>
  <div class='headImg'>
    <div class = "main_head">
      <span class="head_name">{{data.realName?data.realName:data.nickName}}</span>
      <img src="/static/images/shuxian.png" alt="">
      <span class="head_phone">{{'TEL : '+data.phone}}</span>
    </div>
    <div class="main_companyInfo">
      <div class="main_company">
        <div class="company_info" v-for="x in companyList" :class="x.active" @click="changeCompany(x.id)">
            <img :src="'/static/images/'+x.img" >
            <span>{{x.name}}</span>
        </div>
      </div>
    </div>
    <img :src="data.headImg" class="main_img">
  </div>
</template>

<script>
export default {
  name: 'headImg',
  props: ['data'],
  watch: {
    data (val) {
      val.company.forEach((item,index)=>{
        var obj;
        item.name = this.util.sliceStr(item.name,4)
        if(index == 0){
          obj = {
            id:item.id,
            name:item.name,
            img:this.on,
            active:this.active
          }
        }
        else{
          obj = {
            id:item.id,
            name:item.name,
            img:this.off,
            active:this.noactive
          }
        }
        this.companyList.push(obj)
      });
    }
  },
  methods:{
    changeCompany (val) {
      this.companyList.forEach((item)=>{
        if(item.id == val){
          item.img = this.on;
          item.active = this.active;
        }else{
          item.img = this.off;
          item.active = this.noactive;
        }
      })
      this.$emit("head_company",val);
    }
  },
  data () {
    return {
      on:"boff.png",
      off:"bon.png",
      active:"headActive",
      noactive:"headNoActive",
      companyList:[]
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/45px)rem
  }
  .headActive
    z-index 1000

  .headNoActive
    z-index 0
  .headImg
    width 100%
    height rrem(236px)
    position relative
    border-bottom 1px solid #ededed
    .main_companyInfo
      overflow hidden
      .main_company
        position absolute
        top rrem(205px)
        height rrem(30px)
        width 100%
        overflow-x auto
        overflow-y hidden
        display flex
        .company_info
          position relative
          width rrem(106px)
          height 100%
          span
            display block
            text-overflow ellipsis
            position absolute
            width rrem(90px)
            height rrem(35px)
            top rrem(16px)
            left rrem(20px)
            color #fff
            font-size rrem(15px)
            text-align center
          img
            width rrem(130px)
            height 100%
    .main_head
      position absolute
      top rrem(20px)
      left rrem(60px)
      width rrem(65px)
      height rrem(180px)
      .head_name
        position absolute
        font-size rrem(18px)
        font-weight bold
        top rrem(15px)
        left rrem(18px)
        writing-mode vertical-lr
      .head_phone
        position absolute
        writing-mode vertical-lr
        top rrem(50px)
        left rrem(42px)
        writing-mode vertical-lr
        font-size rrem(12px)
      img
        height 100%
        width auto
        position absolute
        left rrem(30px)
    .main_img
      position absolute
      top 0px
      left 40%
      height 100%
      width 60%
      z-index -1
</style>
