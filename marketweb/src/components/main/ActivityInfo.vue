<template>
  <div class='activityMain'>
    <music :url = 'music'></music>
    <mainImg :activity = "activity" ></mainImg>
    <timeAndPro :activity = "activity" ></timeAndPro>
    <joinPeople :activity = "activity" ></joinPeople>
    <Gift :activity = "activity"></Gift>
    <Group :activity = "activity"></Group>
    <Discount :activity="activity"></Discount>
    <Money :activity="activity"></Money>
    <Team :activity="activity"></Team>
    <teamList :activity="activity"></teamList>
  </div>
</template>

<script type='text/ecmascript-6'>
import mainImg from './mainImg.vue'
import timeAndPro from './timeAndPro.vue'
import Gift from './Gift.vue'
import music from '../Utils/music.vue'
import Group from './Group.vue'
import Money from './Moeny.vue'
import Team from './Team.vue'
import teamList from './teamList.vue'
import Discount from './Discount.vue'
import joinPeople from './joinPeople.vue'

export default {
  name: 'ActivityInfo',
  data () {
    return {
      props: {
        endDate: '2017-04-26T23:08:01.928Z',
        tableclass: 'withdrawitems'
      },
      userInfo: {
        account: {},
        company: '',
        customer: '',
        employee: {}
      },
      activity: {
        activityImg: '',
        activityLevel: '',
        activityMoney: 0,
        activityName: '活动名称',
        companyName: null,
        activityNum: 0,
        activityType: 0,
        auditRemarks: '',
        auditStatus: 0,
        backMusic: '',
        musicId: '',
        content: '',
        createDate: '',
        customerAmount: 0,
        discount: 0,
        endDate: '',
        giftIds: 0,
        id: 0,
        shareDes: '这是分享描述',
        shareGift: 1,
        shareImg: '',
        shareTimes: 5,
        startDate: '',
        totalMan: 0,
        joinCustomers: [],
        payedCustomers: [],
        viewNum: 0
      },
      music: '',
      weixinConfig: {}
    }
  },
  components: {mainImg, teamList, timeAndPro, Team, Discount, Gift, Group, Money, joinPeople, music},
  created () {
    var id = this.util.getURLParam('state')
//    var inviter = this.util.getURLParam('inviter')
    var url = location.href.split('#')[0]
    // 获取登录者个人信息
    this.http.get(this.$store.state.prefix + '/pubInfo/user').then(res => {
      if (res.error === false) {
        this.userInfo = res.result
      }
    })

    // 获取活动详细信息
    this.http.get(this.$store.state.prefix + '/activity/' + id).then(res => {
      if (res.error === false) {
        this.activity = res.result
        document.title = res.result.activityName
        this.http.get(this.$store.state.prefix + '/music/' + this.activity.musicId).then(res2 => {
          if (res2.error === false) {
            this.music = res2.result.url
          }
        })
      }
    })

    // 获取微信分享配置
    this.http.get(this.$store.state.prefix + '/pubInfo/weChatShare/' + id + '/' + this.util.parseParam({url: url}).replace('&', '?')).then(res => {
      if (res.error === false) {
        this.wx.config({
          debug: true,
          appId: res.result.appId,
          timestamp: res.result.timestamp,
          nonceStr: res.result.nonceStr,
          signature: res.result.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'getNetworkType', 'chooseWXPay']
        })
        this.weixinConfig = res.result
      }
    })

    this.wx.ready(function () {
      var content = {
        wxshareTitle: this.activity.activityName,
        wxdescContent: this.weixinConfig.shareDes,
        wxlineLink: location.href.split('#')[0],
        wximgUrl: this.murl + this.weixinConfig.shareImg
      }
      this.wx.onMenuShareAppMessage({
        title: content.wxshareTitle,
        desc: content.wxdescContent,
        link: content.wxlineLink,
        imgUrl: content.wximgUrl,
        type: 'link',
        dataUrl: '',
        success: function () {
        },
        cancel: function () {
        }
      })
      this.wx.onMenuShareTimeline({
        title: content.wxdescContent,
        link: content.wxlineLink,
        imgUrl: content.wximgUrl,
        success: function () {
        },
        cancel: function () {
        }
      })
    })
  },
  methods: {
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
  html,body
    margin 0px
    padding 0px
    line-height 0
.activityMain
  background #fff
  padding-bottom 20px;
</style>
