<template>
  <div class="headMoney">
    <div class="main_bg">
      <img src="/static/images/person/bg.png">
      <img :src="Person.headImg" v-if="Person.headImg" class="info_img">
      <div class="info_head">
        <div class='head_name'>
          <img src="/static/images/person/guan.png">
          <span v-text="Person.realName||Person.nickName"></span>
        </div>
        <p class="phone" v-text="'电话：'+Person.phone"></p>
        <p class="email" v-text="'邮箱：'+Person.email" ></p>
      </div>
      <div class="main_money">
        <div class="money_info">
          <div class="info_jifen">
            <span v-text="'累计积分：'+Person.totalPoint"></span>
            <span v-text="'可用积分：'+Person.points"></span>
            <span v-text="'已换现金：'+Person.usedCash"></span>
            <span v-text="'可换现金：'+Person.cashs"></span>
          </div>
        </div>
      </div>
      <img src="/static/images/person/jifen.png" class="main_jifen" @click="changePoint">
      <img src="/static/images/person/tixian.png" class="main_jifen main_tixian" @click="isWithdraw=true">
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
        <span>可提积分 {{Person.points}}({{Person.cashs}} 元)</span>
        <br>
        <p>当前提现金额: <span style="color:#131313;font-weight:bolder">{{parseFloat(Person.toCashRate*(Person.withdrawPoint>Person.points?Person.points:Person.withdrawPoint)).toFixed(2)}}元</span></p>
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

<script type="text/ecmascript-6">
export default {
  name: 'headMoney',
  props:["Person"],
  created(){
  },
  data () {
    return {
      info:{
        name:'巴黎春天',
        logo:'/static/images/a1.png'
      },
      totalPoint:0,
      points:0,
      usedCash:0,
      cashs:0,
      isWithdraw:false,
      withdrawPoint:0
    }
  },
  methods:{
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
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .headMoney
    width 100%
    height rrem(645px)
    background #d8006b
    position relative
    .main_bg
      position absolute
      background #fff
      border-radius rrem(40px)
      top rrem(40px)
      left rrem(40px)
      width rrem(1000px)
      height rrem(570px)
      img
        height 100%
        width 100%
      .info_img
        position absolute
        top rrem(52px)
        left rrem(60px)
        border rrem(8px) solid #ff007e
        border-radius 100%
        height rrem(193px)
        width rrem(193px)
      .info_head
        position absolute
        left rrem(293px)
        top rrem(90px)
        .head_name
          img
            width rrem(45px)
            height rrem(38px)
          span
            font-size rrem(36px)
            font-weight bold
            color #ff007e
        p
          font-size rrem(32px)
          line-height rrem(40px)
          color #aeaeae
          height rrem(40px)
        .phone
          margin-top rrem(10px)
      .main_money
        top rrem(287px)
        width 100%
        height rrem(220px)
        position absolute
        .money_info
          background #f7f7f7
          border-top-right-radius rrem(100px)
          border-bottom-right-radius rrem(100px)
          height 100%
          width rrem(695px)
          .info_jifen
            padding-left rrem(40px)
            padding-top rrem(38px)
            span
              margin-top rrem(10px)
              font-weight bold
              color #aeaeae
              font-size rrem(32px)
              margin-right rrem(20px)
              width rrem(285px)
              height rrem(60px)
              line-height rrem(60px)
              display inline-block
      .main_jifen
        width rrem(235px)
        height rrem(90px)
        top rrem(290px)
        right rrem(38px)
        position absolute
      .main_tixian
        top rrem(415px)
</style>
