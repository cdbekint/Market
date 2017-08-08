<template>
<div class="weixinpay">
   <Steps :current="currentStep">
        <Step title="选择金额" content=""></Step>
        <Step title="扫码充值" content=""></Step>
        <Step title="充值完成" content=""></Step>
    </Steps>
    <div class="stepContent">
      <div class="chooseMoney" v-if="currentStep==0">
        <ul>
          <li v-for="pm in payMoney" :class="{active:pm.active,coustom:pm.coustom}" @click="selectMoney(pm)">
            <span v-text="pm.money" v-if="!pm.coustom"></span>
            <input v-else type="number" v-model="pm.money" min="100" step="50" placeholder="请输入">
          </li>
        </ul>
      </div>
      <div class="payQrCode text-center"  v-if="currentStep==1">
        <img :src="'https://pan.baidu.com/share/qrcode?w=200&h=200&url='+code_url" alt="" v-if="code_url">
        <Row>
        <span v-text="'充值金额:'+realMoney+'元'" style="font-size:1.5em"></span></br>
         <Icon type="ios-information-outline"></Icon>请使用微信扫一扫进行充值付款</Row>
      </div>
      <div class="payStatus" v-if="currentStep==2">
          <Icon type="ios-checkmark-outline" size="100" color="#44b549"></Icon>
          <br>
          充值成功
      </div>
    </div>
    <div class="stepOperate text-right">
        <Button type="ghost"  size="small" v-if="currentStep>0&&currentStep<2" @click="switchStep(false)">上一步</Button>
        <Button type="info"  size="small" v-if="currentStep<=2&&(!stepdone)" @click="switchStep(true)">
       下一步</Button>
       <Button type="info"  size="small" v-if="currentStep<=2&&(stepdone)" @click="chargeOk()">
       完成</Button>
       

    </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'WeixinPay',
  props: ['wrapper', 'company'],
  data () {
    return {
      payMoney: [
        {
          money: 500,
          active: true,
          coustom: false
        },
        {
          money: 1000,
          active: false,
          coustom: false
        },
        {
          money: 3000,
          active: false,
          coustom: false
        },
        {
          money: 5000,
          active: false,
          coustom: false
        },
        {
          money: 10000,
          active: false,
          coustom: false
        },
        {
          money: null,
          active: false,
          coustom: true
        }
      ],
      currentStep: 0,
      stepdone: false,
      realMoney: 500,
      code_url:'',
      repeateNum:0
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    selectMoney (pm) {
      for (var i in this.payMoney) {
        this.payMoney[i].active = false
      }
      pm.active = true
    },
    switchStep (type) {
      if (type === true) {
        if (this.currentStep === 0) {
          var realMoney = 0
          for (var i in this.payMoney) {
            if (this.payMoney[i].active === true) {
              realMoney = this.payMoney[i].money
              break
            }
          }
          if (realMoney < 500 || isNaN(realMoney)) {
            this.$Notice.error({
              title: '错误',
              desc: '充值金额必须大于500'
            })
            return
          }
          this.realMoney = realMoney
          var param = {
            payType: 4,
            payAmount: Number(this.realMoney),
            companyId :this.company.id,
            businessId: 0,
            goodsId: 0,
            companyId:this.util.getCookie("companyId")
          }
          this.http.post(this.$store.state.prefix + '/pay' , param).then (res => {
            if (res.error === false) {
              this.code_url = res.result.code_url
              this.currentStep ++
              var _this=this
              setTimeout(function(){
                  _this.checkStatus(res.result.out_trade_no)
              },3000)
              
            } else {
              this.$Message.error(res.msg)
            }
          })

        }
        if(this.currentStep === 2){
         this.stepdone = true
        }
      } else {
        this.stepdone = false
        this.currentStep -= 1
      }
    },
    chargeOk() {
       var _this=this
          for(var i=0;i<100;i++){
            if(_this.$parent[this.wrapper] === undefined){
              _this = _this.$parent
              
            }else{
              _this.$parent[this.wrapper] = false
              this.stepdone = false
              this.currentStep = 0
              _this.$parent.getCompanyinfo()
              break
            }
          }
    },
    checkStatus (out_trade_no) {
        if(this.wrapper==false)return
        this.http.post(this.$store.state.prefix + '/pay/getByOutTradeNo', {outTradeNo: out_trade_no}).then(res => {
        if (res.error === false) {
            if(res.result.payStatus === 1){
              this.currentStep ++
              this.switchStep(true)
            }else{
              var _this=this
              if(this.repeateNum<200){
                setTimeout(function(){
                  _this.checkStatus(out_trade_no)
                },1000)
              }
              
            }
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.stepContent
  padding:20px 5px
  .chooseMoney
    ul
      width:80%
      margin:0px auto
      li
        padding: 5px 10px
        border:1px solid #ccc
        border-radius:3px
        text-align:center
        display:inline-block
        margin:0px 5px 5px 5px
        cursor:pointer
        min-width:60px
      li.active
        background:#63c168
        color:#fff
      li.coustom
        padding:0px
        width:100px
        border:0px
        input
          width:100%
          height:30px
          border:1px solid #ccc
          border-radius:3px
          padding:0px 3px
  .payQrCode
    text-align:center
    img
      margin:0px auto
  .payStatus
    text-align:center

</style>
