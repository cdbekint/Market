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
          <span class="chiness">{{totalPoint}}</span>
        </div>
        <div class="one_jifen one_jiuse">
          <span class="chiness">可用积分</span>
          <img src="/static/images/line.png">
          <span class="english">USE INTEGRAL</span>
        </div>
        <div class="one_jinum jifen_num">
          <span class="chiness">{{points}}</span>
        </div>
        <div class="one_btn" @click="changePoint">
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
          <span class="chiness">{{usedCash}}</span>
        </div>
        <div class="one_jifen one_jiuse">
          <span class="chiness">可换现金</span>
          <img src="/static/images/line.png" style="height:1px;">
          <span class="english">USE MONEY</span>
        </div>
        <div class="one_jinum jifen_num">
          <span class="chiness">{{cashs}}</span>
        </div>
        <div class="one_btn two_btn" @click="isWithdraw = true">
          <span>提&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp现</span>
        </div>
      </div>
    </div>
    <Modal
      v-model="isWithdraw"
      @on-ok="ok"
      @on-cancel="cancel"
      ok-text="即刻提现"
      :closable="false"
      title="积分提现"
      style="position: relative;padding:0px 15%"
      >


      <Row style="text-align:left;padding-left:40px;font-size:1.3em;color:#AEAEAE">
      <div>
        <span>可提积分 {{points}}({{cashs}} 元)</span>
        <br>
        <p>当前提现金额: <span style="color:#131313;font-weight:bolder">{{parseFloat(cashs/points*(withdrawPoint>points?points:withdrawPoint)).toFixed(2)}}元</span></p>
      </div>
      </Row>
      <Row style="text-align:center;padding-left:40px;">
        <Input v-model="withdrawPoint" style="border-radius:0px;padding:3px;font-size:1.2em;color:#B5B5B5"></Input>
      </Row>
      <Row style="text-align:center;font-size:0.8em;padding:10px">
          提现金额不能低于1元
      </Row>
      
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'peopleMoney',
  props: ['data'],
  methods:{
    changePoint(){
      this.$emit("changePointById");
    },
    ok(){
      if(this.withdrawPoint === 0){
          this.$Message.success("提现积分必须大于0");
          return
      }
      this.http.post(this.$store.state.prefix + "/withdraw",{
        withdrawType:1,
        withdrawPoints:this.withdrawPoint
      }).then(res=> {
        if(res.error == false){
          this.$Message.success("恭喜你提现成功");
          location.reload();
        }
        else{
          this.$Message.error(res.msg);
        }
      })
    },
    cancel(){
      this.isWithdraw = false;
    },
  },
  watch:{
    data:{
      handler(val){
        this.totalPoint = val.totalPoint;
        this.points = val.points;
        this.usedCash = val.usedCash;
        this.cashs = val.cashs;
        this.toCashRate = val.toCashRate
      },
      deep:true
    }
  },
  data () {
    return {
      isWithdraw:false,
      withdrawPoint:0,
      totalPoint:0,
      points:0,
      usedCash:0,
      cashs:0,
      toCashRate:0,
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
