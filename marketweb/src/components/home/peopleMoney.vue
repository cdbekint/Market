<template>
  <div class='people'>
    <div class="main_money">
      <div class="money_one">
        <div class="one_jifen">
          <span class="chiness">累计积分</span>
          <img src="/static/images/line.png">
          <span class="english">ALL INTEGRAL</span>
        </div>
        <div class="one_jinum">
          <span class="chiness">995000</span>
        </div>
        <div class="one_jifen one_jiuse">
          <span class="chiness">可用积分</span>
          <img src="/static/images/line.png">
          <span class="english">USE INTEGRAL</span>
        </div>
        <div class="one_jinum jifen_num">
          <span class="chiness">9900</span>
        </div>
        <div class="one_btn">
          <span>积分换购</span>
        </div>
      </div>
      <div class="money_one money_two">
        <div class="one_jifen">
          <span class="chiness">已换现金</span>
          <img src="/static/images/line.png" style="height:1px;">
          <span class="english">USED MONEY</span>
        </div>
        <div class="one_jinum">
          <span class="chiness">995000</span>
        </div>
        <div class="one_jifen one_jiuse">
          <span class="chiness">可换现金</span>
          <img src="/static/images/line.png" style="height:1px;">
          <span class="english">USE MONEY</span>
        </div>
        <div class="one_jinum jifen_num">
          <span class="chiness">9900</span>
        </div>
        <div class="one_btn two_btn">
          <span>提&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp现</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'peopleMoney',
  props: ['data'],
//  watch: {
//    data (val) {
//      console.log(val)
//    }
//  },
  methods:{
    changeCompany (val) {
      this.menuList.forEach((item,index)=>{
        if(index == val){
          item.img = this.on;
          item.active = this.active;
        }else{
          item.img = this.off;
          item.active = this.noactive;
        }
      })
      this.$emit("getCompanyId",11);
    }
  },
  mounted () {
    this.data.menu.forEach((item,index)=>{
      var obj;
      if(index == 0){
        obj = {
          name:item,
          img:this.on,
          active:this.active
        }
      }
      else{
        obj = {
          name:item,
          img:this.off,
          active:this.noactive
        }
      }
      this.menuList.push(obj)
    });
  },
  data () {
    return {
      on:"boff.png",
      off:"bon.png",
      active:"active",
      noactive:"",
      menuList:[]
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/45px)rem
  }
  .active
    z-index 1000

  .noactive
    z-index
  .people
    width 100%
    height rrem(117px)
    position relative
    .main_money
      position absolute
      width 100%
      height rrem(120px)
      .money_one
        position absolute
        top rrem(10px)
        width 100%
        height rrem(50px)
        .one_jifen
          position absolute
          left rrem(15px)
          width 20%
          height 100%
          img
            position absolute
            display block
            margin auto
            width 100%
            top rrem(25px)
          span
            display block
            text-align center
            width 100%
          .chiness
            position absolute
            top rrem(17px)
            font-size rrem(14px)
          .english
            position absolute
            top rrem(33px)
            font-size rrem(8px)
        .one_jinum
          width 12%
          height 100%
          position absolute
          top 0px
          left 25%
          span
            display block
            font-weight bold
            text-align center
            width 100%
            position absolute
            top rrem(23px)
            font-size rrem(17px)
        .one_jiuse
          left rrem(170px)
        .jifen_num
          left rrem(260px)
        .one_btn
          width rrem(110px)
          position absolute
          top rrem(2px)
          left rrem(325px)
          border-radius rrem(30px)
          height rrem(35px)
          background #979797
          box-shadow rrem(0px) rrem(5px) rrem(10px) #979797
          span
            color #fff
            text-align center
            font-size rrem(18px)
            display block
            height 100%
            line-height 200%
      .money_two
        top rrem(65px)
        .two_btn
          background #cbcbcb


</style>
