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
            <input v-else type="number" min="100" step="50" placeholder="请输入">
          </li>
        </ul>
      </div>
      <div class="payQrCode text-center"  v-if="currentStep==1">
        <img src="http://qr.liantu.com/api.php?w=200&m=5&text=http://we.cdbeki.com" alt="">
      </div>
      <div class="payStatus" v-if="currentStep==2">
          <Icon type="ios-checkmark-outline" size="100" color="#44b549"></Icon>
          <br>
          充值成功
      </div>
    </div>
    <div class="stepOperate text-right">
        <Button type="ghost"  size="small" v-if="currentStep>0&&currentStep<2" @click="switchStep(false)">上一步</Button>
        <Button type="info"  size="small" v-if="currentStep<=2" @click="switchStep(true)">
        <span v-if="!stepdone">下一步</span> <span v-else>完成</span></Button>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'WeixinPay',
  props: ['wrapper'],
  data () {
    return {
      payMoney: [
        {
          money: 100,
          active: true,
          coustom: false
        },
        {
          money: 500,
          active: false,
          coustom: false
        },
        {
          money: 1000,
          active: false,
          coustom: false
        },
        {
          money: 2000,
          active: false,
          coustom: false
        },
        {
          money: 5000,
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
      realMoney: 100
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
          if (realMoney < 100 || isNaN(realMoney)) {
            this.$Notice.error({
              title: '错误',
              desc: '自定义金额错误'
            })
            return
          }
          this.realMoney = realMoney
        }
        this.currentStep += 1
        if (this.currentStep === 2) {
          this.stepdone = true
          this.$parent[this.wrapper] = false
        }
      } else {
        this.stepdone = false
        this.currentStep -= 1
      }
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
