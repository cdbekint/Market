<template>
  <div class = "register" v-if="state">
    <div class="main_bg" @click="changeState"></div>

    <div class="main_body" v-if="!payState">
      <div class="body_join">
        <img src="/static/images/active/member.png" alt="">
      </div>
      <div class="body_input" >
        <div class="input_name">
          <input type="text" v-model="name" placeholder="   请输入您的真实姓名" >
        </div>
        <div class="input_num">
          <input type="text" v-model="phone" placeholder="   请输入您的手机号码">
        </div>
        <div class="input_email">
          <input type="text" v-model="email" placeholder="   请输入您的邮箱号码">
        </div>
        <div class="body_check">
          <img :src="'/static/images/active/'+checkState+'.png'" v-if="isCheck">
          <span>{{msg}}</span>
        </div>
      </div>
      <div class="body_pay" @click="pay">支付{{money}}元成为会员</div>
    </div>

    <div class="main_body payed_body" v-if="payState">
      <div class="body_join">
        <img src="/static/images/active/member.png" alt="">
      </div>
      <div class="body_info" >
        <span>恭喜您成为{{company}}会员，众多精彩活动、优质商品在等你喔！</span>
      </div>
      <div class="body_pay payed_pay" @click="changeState">返回当前页面</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'register',
    props:["datas","state"],
    created(){
      this.name = ''
      this.phone = ''
      this.email = ''
    },
    watch: {
      datas: {
        handler (val) {
          this.company = val.companyName;
          this.params = {
            businessId: window.localStorage["inviterId"] || 0,
            payType: 5,
            payAmount: 0,
            goodsId:val.id,
            companyId: val.companyId
          }
          this.http.get(this.$store.state.prefix + '/pubInfo/getCompanyRegisterIno/' + val.companyId).then((res) => {
            if(res.error == false){
              this.money = res.result.registerMoney;
              this.params.payAmount = this.money;
            }
            else{
              this.$Message.error(res.msg)
            }
          })
        }
      },
      deep:true
    },
    methods:{
      changeState(){
        this.$emit("childClick",false)
      },
      pay(){
        if(!this._checkInfo())
          return;

        if (this.isPaying === true)
          return;
        this.isPaying = true;
        this.http.post(this.$store.state.prefix + '/pay', this.params).then((res) => {
          this.isPaying = false;
          if (res.error === false) {
            var row = res.result;
            var onBridgeReady = () => {
              var me = this;
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
                    me.$Message.success("支付成功，您已成为会员。")
                    me.payState = true;
                    me.$store.state.isMember = 1;
                    me.http.put(me.$store.state.prefix + '/customer',{
                      realName:me.name,
                      phone:me.phone,
                      email:me.email
                    }).then(res => {
                      if (res.error === false) {
                        me.$Message.success('数据录入成功.')
                      }
                      else{
                        me.$Message.error("数据录入失败.")
                      }
                    })
                  }else{
                    me.$Message.success("支付失败。")
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
      _checkInfo(){
        if(this.name == ''){
          this.isCheck = true;
          this.checkState = "err";
          this.msg = "请输入真实姓名";
          return false;
        }
        if(this.phone == ''){
          this.isCheck = true;
          this.checkState = "err";
          this.msg = "请输入手机号码";
          return false;
        }
        else if(!(/^1[34578]\d{9}$/.test(this.phone))){
          this.isCheck = true;
          this.checkState = "err";
          this.msg = "您输入的手机号码格式错误";
          return false;
        }
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(this.email == ''){
          this.isCheck = true;
          this.checkState = "err";
          this.msg = "请输入正确的邮箱号码";
          return false;
        }
        else if(!myreg.test(this.email)) {
          this.isCheck = true;
          this.checkState = "err";
          this.msg = "您输入的邮箱号码格式错误";
          return false;
        }
        this.isCheck = true;
        this.checkState="right"
        this.msg = "验证成功"
        return true
      }
    },
    data () {
      return {
        isPaying:false,
        payState:false,
        company:"巴黎春威风威区限技公司",
        name:'',
        phone:'',
        email:'',
        params: {
          businessId: 0,
          payType: 5,
          payAmount: 0,
          companyId: 0,
          goodsId:0
        },
        isCheck:false,
        showPage:true,
        msg:"请准确输入以上信息",
        money:0,
        checkState:'err'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .register
    width:100%
    z-index 1500
    .main_bg
      width:100%
      height rrem(1922px)
      background #000
      position fixed
      top 0px
      left 0px
      z-index 1500
      opacity 0.5
    .main_body
      width rrem(1000px)
      height rrem(756px)
      z-index 1510
      position fixed
      top rrem(400px)
      left rrem(40px)
      background #fff
      .body_join
        position absolute
        left rrem(275px)
        top rrem(-69px)
        width rrem(436px)
        height rrem(140px)
        img
          height 100%
          width 100%
      .body_input
        position absolute
        top rrem(120px)
        left rrem(40px)
        width rrem(920px)
        height rrem(380px)
        input
          border 1px solid #aeaeae
          margin-bottom rrem(40px)
          height rrem(100px)
          width 100%
          line-height rrem(100px)
        .input_name
          width 100%
      .body_check
        text-align center
        display flex
        justify-content center
        img
          margin-right rrem(10px)
          width rrem(45px)
          height rrem(45px)
        span
          line-height rrem(55px)
          height rrem(45px)
      .body_pay
        background #ff007e
        position absolute
        top rrem(600px)
        left rrem(40px)
        line-height rrem(125px)
        text-align center
        font-size rrem(54px)
        color #fff
        height rrem(125px)
        width rrem(920px)
        &:hover
          background red

    .payed_body
      height rrem(530px)
      .body_info
        width rrem(920px)
        height rrem(190px)
        position absolute
        top rrem(150px)
        left rrem(40px)
        text-align center
        span
          display block
          width 100%
          height rrem(100px)
          line-height rrem(100px)
          font-size rrem(48px)
          color #ff007e
      .payed_pay
        top rrem(360px)
</style>
