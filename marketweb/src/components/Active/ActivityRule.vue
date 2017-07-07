<template>
  <div class='activityrule' v-if="showrule" @click="showrule=false"> 
    <div class="rulebody">
      <div class="ruletitle">
        活动规则
      </div>
      <div class="rulecontent">
        <p>本活动由成都白起网络公司(以下简称“本公司”)发起，注册会员可以直接参加活动获取优惠。本活动为【自由模式/组团模式】，您可直接参团并获取折扣信息，运用此折扣购买关联的商品，</p>
        <p>自由模式</p>
        <p>组团模式</p>
        <p>30人-9折</p>
        <p>100人-8折</p>
        <p>300人-7折</p>
        <p>500人-4折</p>
        <p>团长福利：100分</p>
        <p>活动时间：2017年7月5日 16:20:53 至  2017年7月5日 16:21:00</p>
        <p>支付时间：2017年7月5日 16:21:14 至  2017年7月5日 16:21:18</p>
        <p>翻倍时间: 2017年7月5日 16:21:38  至   2017年7月5日 16:21:43</p>
        <p>翻倍倍数：1倍</p>
        <p>名词解释：</p>
        <p>【团长福利】：组团模式下团内每成员成交成功后，团长可获得对应积分奖励</p>
        <p>【支付时间】：只能在此期间内方可进行折扣支付，其他时间段只能原价支付</p>
        <p>【翻倍时间】：在此期间进行商品购买可获得原始获取的积分×翻倍倍数</p>
      </div>
      <div class="ruletitle">
        积分规则
      </div>
      <div class="rulecontent">
        <ol>
          <li>
            本公司会员注册金额为99元，首次注册后即可成为终身会员并获得10分积分奖励；
          </li>
          <li>邀请朋友注册成为本商家会员即可获得200分积分奖励</li>
          <li>每天分享活动信息到朋友圈即可获得5积分/次(每天前3次)奖励</li>
          <li>自己邀请注册的会员消费返还积分比例为100%（即消费100元，将为您返还100分），自己邀请注册的会员所邀请注册的会员消费返还积分比例为50%（即消费100元，将为您返还50分）</li>
          <li>自己消费金额积分返还比例为100%（即消费100元，返还100分）</li>
          <li>本公司的积分转换现金比例为：10%，即100积分可即刻提现10元人民币；所有积分您均可直接通过提现功能提到您的微信账户或者兑换商品。
        注：本活动的最终解释权归本公司所有，注册为会员即视为认同本公司的执行方案。</li>
          <li>技术支持：成都白起网络科技有限公司</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script  type="text/ecmascript-6">
export default {
  name: 'ActivityRule',
  props: ['activity'],
  watch:{
    activity(val){
      this.showrule=val.showrule
      this.getInfoByCompanyId(val.companyId)
    }
  },
  methods:{
    getInfoByCompanyId(val){
      if(val == void 0 || val == '')return
      this.http.get(this.$store.state.prefix + "/shop/?companyId="+val).then(res=>{
        if(res.error == false){
          this.company=res.result
        }
      })
    }
  },
  created(){
    this.getInfoByCompanyId(this.activity.companyId)
  },
  data () {
    return {
      company:{},
      showrule:false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .activityrule
    display:block
    position:fixed
    top rrem(0px)
    left rrem(0px)
    width:100%
    height:100%
    background:rgba(0,0,0,0.8)
    overflow-y:auto
    overflow-x:hidden
    color:#fff
    z-index:11111
    line-height rrem(50px)
    padding:20px 10%
    .ruletitle
      text-align:center
      font-size:1.3em
      border-bottom:1px solid #eee
    .rulecontent
      padding:10px 0px
      p
        text-indent:2em

  .marker
    font-weight:bold
    color:red
  ol
    li
      list-style:decimal
</style>
