<template>
  <div class = 'team'>
    <div class = 'main_head'>
      <img :src="'/static/images/a'+no+'.png'" alt=''>
    </div>
    <div class = 'main_pro'>
      <div class = 'pro_line line1'>
        <div class = 'main_time' @click='payMoneyEvent' style='z-index:2000'>
          <div class = 'time_count' >
            <p>支付 <span>{{payMoney}}</span> 元参加</p>
          </div>
        </div>
        <div class = 'main_title'>
          <span class = 'text'>参团赢折扣</span>
          <img src='/static/images/line.png' alt=''>
          <span class = 'english'>THE COUNTDOWN</span>
        </div>
      </div>
      <div class = 'pro_line line2'>
        <div class = 'main_time' style='z-index:2000' @click='newTeam'>
          <div class = 'time_count' >
            <p>新开团</p>
          </div>
        </div>
        <div class = 'main_title'>
          <span class = 'text'>组团赢积分</span>
          <img src='/static/images/line.png' alt=''>
          <span class = 'english'>GROUP GET POINTS</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import progressMe from '../Utils/ProgressMe.vue'
export default {
  name: 'team',
  components: { progressMe },
  props: ['activity'],
  data () {
    return {
      isPaying: false,
      no:8,
      payMoney:0,
      payPoint:0,
      params: {
        businessId: 12,
        payType: 2,
        payPoints: 0,
        companyId: 0
      }
    }
  },
  watch: {
    activity: {
      handler (val, oldVal) {
        this.params = {
//        businessId: val.id,
//        payType: val.activityType,
          businessId: 3,
          payType: 5,
          payAmount: 1,
          companyId: val.companyId
        }
        this.http.get(this.$store.state.prefix + '/pubInfo/getCompanyRegisterIno/' + val.companyId).then((res) => {
          if(res.error == false){
            this.payPoint = res.result.registerPoints;
            this.payMoney = res.result.registerMoney;
          }
        })

        if (val.activityType != 2)
          this.value.no = 7;
      }
    },
    deep:true
  },
  methods: {
    payMoneyEvent () {
      if (this.isPaying === true) {
        return
      }

      this.isPaying = true
      this.http.post(this.$store.state.prefix + '/pay', this.params).then((res) => {
        this.isPaying = false
        if (res.error === false) {
          var row = res.result
          var onBridgeReady = () => {
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest',{
                'appId': row.appid,
                'timeStamp': row.timeStamp,
                'nonceStr': row.nonce_str,
                'package':  row.prepay_id,
                'signType': row.sign_type,
                'paySign': row.sign
              },
              function (res) {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                  alert("支付成功")
                } else {
                  alert("支付失败")
                }
              }
            )
          }
          if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
            }
          } else {
            onBridgeReady()
          }
        }
      })
    },
    newTeam () {
      console.log(123)
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  rrem(val){
    return (val/144px)rem
  }
  .team
    width 100%
    height rrem(460px)
    position relative
    background #fff
    .main_head
      position absolute
      top 0px
      width 100%
      height rrem(212px)
      z-index 1000
      img
        width rrem(288px)
        height 100%
    .main_pro
      width 100%
      height rrem(460px)
      .pro_line
        width 100%
        height rrem(120px)
        position absolute
        top rrem(80px)
        .main_time
          position absolute
          left rrem(265px)
          border-radius 40px
          background #ff6b5d
          width rrem(666px)
          height 100%
          box-shadow -3px 8px 10px #c0c0c0
          .time_count
            width 88%
            height rrem(123px)
            margin auto
            line-height rrem(123px)
        .main_title
          position absolute
          left rrem(930px)
          width rrem(460px)
          top rrem(20px)
          height 100%
          span
            position absolute
          .text
            color #000
            font-size rrem(50px)
            left rrem(95px)
            top rrem(35px)
          .english
            color #e75e54
            font-size rrem(22px)
            left rrem(95px)
            top rrem(90px)
          img
            width 100%
            position absolute
            top rrem(66px)
      .line1
        .main_time
          background #ff6b5d
          .time_count
            width 95%
          p
            font-size rrem(60px)
            color #fff
            text-align center
            span
              font-size rrem(65px)
      .line2
        top rrem(270px)
        .main_time
          background #c0bebf
          .time_count
            width 95%
          p
            font-size rrem(60px)
            color #fff
            text-align center
            span
              font-size rrem(65px)
              color red

</style>
