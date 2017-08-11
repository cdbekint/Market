<template>
  <div class='activityrule' v-if="showrule" @click="showrule=false">
    <div class="rulebody">
      <div class="ruletitle">
        活动规则
      </div>
      <div class="rulecontent">
        <p>本活动由{{companyActivity.companyName}}公司(以下简称“本公司”)发起，注册会员可以直接参加活动获取优惠。本活动为
          <span v-if="companyActivity.activityType == 1">【自由模式】</span>
          <span v-if="companyActivity.activityType == 2">【组团模式】</span>，您可直接参团并获取折扣信息，运用此折扣购买关联的商品，</p>
        <p v-if="companyActivity.activityType == 1">自由模式</p>
        <div v-if="companyActivity.activityType == 2">
          <p>组团模式</p>
          <div v-for="item in discountLevel">
            <p>{{item.discount}}人-{{item.mans}}折</p>
          </div>
          <p>团长福利：{{companyActivity.groupRate}}分</p>
          <p>活动时间：{{startTime}} 至 {{endTime}}</p>
          <p>支付时间：{{payStartDate}} 至 {{payEndDate}}</p>
          <p>翻倍时间: {{returnStartDate}} 至 {{returnEndDate}}</p>
          <p>翻倍倍数：{{companyActivity.pointsReturnMultiple}}倍</p>
          <p>名词解释：</p>
          <p>【团长福利】：组团模式下团内每成员成交成功后，团长可获得对应积分奖励</p>
          <p>【支付时间】：只能在此期间内方可进行折扣支付，其他时间段只能原价支付</p>
          <p>【翻倍时间】：在此期间进行商品购买可获得原始获取的积分×翻倍倍数</p>
        </div>
  
      </div>
      <div class="ruletitle">
        积分规则
      </div>
      <div class="rulecontent">
        <ol>
          <li>
            本公司会员注册金额为{{company.registerMoney}}元，首次注册后即可成为终身会员并获得{{company.registerPoints}}分积分奖励；
          </li>
          <li>邀请朋友注册成为本商家会员即可获得{{company.invitedPoints}}分积分奖励</li>
          <li>每天分享活动信息到朋友圈即可获得{{company.sharePoints}}积分/次(每天前{{company.shareMax}}次)奖励</li>
          <li>自己邀请注册的会员消费返还积分比例为{{company.oneReturn}}%（即消费100元，将为您返还{{Math.floor(company.oneReturn)}}分），自己邀请注册的会员所邀请注册的会员消费返还积分比例为{{company.secondReturn}}%（即消费100元，将为您返还{{company.secondReturn}}分）</li>
          <li>自己消费金额积分返还比例为{{company.selfReturn}}%（即消费100元，返还{{Math.floor(company.selfReturn)}}分）</li>
          <li>本公司的积分转换现金比例为：{{company.toCashRate}}%，即100积分可即刻提现{{Math.floor(company.toCashRate)}}元人民币；所有积分您均可直接通过提现功能提到您的微信账户或者兑换商品。 注：本活动的最终解释权归本公司所有，注册为会员即视为认同本公司的执行方案。
          </li>
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
  watch: {
    activity(val) {
      this.showrule = val.showrule
      this.companyActivity = val
      this.getInfoByCompanyId(val.companyId)
      this.startTime = this.util.getFormatDate(val.startDate)
      this.endTime = this.util.getFormatDate(val.endDate)
      this.payStartDate = this.util.getFormatDate(val.payStartDate)
      this.payEndDate = this.util.getFormatDate(val.payEndDate)
      this.returnStartDate = this.util.getFormatDate(val.returnStartDate)
      this.returnEndDate = this.util.getFormatDate(val.returnEndDate)
      this.discountLevel = JSON.parse(val.discountLevel)
    }
  },
  methods: {
    getInfoByCompanyId(val) {
      if (val == void 0 || val == '') return
      this.http.get(this.$store.state.prefix + "/shop/?companyId=" + val).then(res => {
        if (res.error == false) {
          this.company = res.result
        }
      })
    }
  },
  created() {
    this.getInfoByCompanyId(this.activity.companyId)
  },
  data() {
    return {
      company: {},
      companyActivity: {},
      showrule: false,
      startTime: '',
      endTime: '',
      payStartDate: '',
      payEndDate: '',
      returnStartDate: '',
      returnEndDate: '',
      discountLevel:[]
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
