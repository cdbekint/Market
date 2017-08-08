<template>
<div class="weixinpay">
   <Steps :current="currentStep">
        <Step title="选择时长" content=""></Step>
        <Step title="扫码付款" content=""></Step>
        <Step title="续费完成" content=""></Step>
    </Steps>
    <div class="stepContent">
      <div class="chooseMoney" v-if="currentStep==0">
        <ul>
          <li v-for="ri in RenewInfo" v-text="ri.month+'月'" :class="{active:ri.active}" @click="selectMoney(ri)"></li>
        </ul>
        <div v-if="RenewInfo.length==0">管理员暂时未配置续费金额，请联系管理员进行设置</div>
        <div style="width:100%;display:flex;font-size:1.1em;color:red" v-if="RenewInfo.length>0">
          <div style="flex:1;text-align:center">总金额：{{realMoney}}元</div>
          <div style="flex:1;text-align:center">充值后到期日期：{{util.getFormatDate(new Date(company.expireDate).getTime()+realMonth*30*24*3600*1000)}}</div>
        </div>
      </div>
      <div class="payQrCode text-center"  v-if="currentStep==1">
        <img :src="'https://pan.baidu.com/share/qrcode?w=200&h=200&url='+code_url" alt="" v-if="code_url">
        <Row>
        <span v-text="'付费金额:'+realMoney+'元'" style="font-size:1.5em"></span></br>
         <Icon type="ios-information-outline"></Icon>请使用微信扫一扫进行付款</Row>
      </div>
      <div class="payStatus" v-if="currentStep==2">
          <Icon type="ios-checkmark-outline" size="100" color="#44b549"></Icon>
          <br>
          续期成功
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
  name: 'Renew',
  props: ['wrapper', 'company'],
  data () {
    return {
      RenewInfo:[],
      currentStep: 0,
      stepdone: false,
      realMoney: 800,
      realMonth:1,
      businessId:1,
      code_url:'',
      repeateNum:0
    }
  },
  created () {
    this.getRenewinfo()
  },
  mounted () {
  },
  methods: {
    getRenewinfo(){
      this.http.post(this.$store.state.prefix+'/pubInfo/getSystemRenewInfo',{renewType:1,chargeType:1}).then(res=>{
        if(res.error==false){
          res.result.forEach((item)=>{
            item.active=false
          })
          res.result[0].active=true
          this.realMoney=res.result[0].amount
          this.realMonth=res.result[0].month
          this.businessId=res.result[0].id
          this.RenewInfo=res.result
        }
      })
    },
    selectMoney (pm) {
      for (var i in this.RenewInfo) {
        this.RenewInfo[i].active = false
      }
      this.realMoney=pm.amount
      this.realMonth=pm.month
      this.businessId=pm.id
      pm.active = true
    },
    switchStep (type) {
      if (type === true) {
        if (this.currentStep === 0) {
          var realMoney = 0
          
          var param = {
            payType: 3,
            payAmount: Number(this.realMoney),
            companyId :this.company.id,
            businessId:this.businessId,
            goodsId: 0,
            remarks:'账户续期'+this.realMonth+'个月',
            companyId:this.util.getCookie("companyId")
          }
          console.log("请求支付")
          this.http.post(this.$store.state.prefix + '/pay' , param).then (res => {
          console.log("支付请求完成")
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
                },2000)
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
