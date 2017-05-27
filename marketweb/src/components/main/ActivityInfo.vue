<template>
  <div class='activityMain'>
    <music :url = activity></music>
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
      userInfo: {},
      pageConfig: {
        Music: {},
        musicPlaying: false
      },
      activity: {
        activityImg: 'FsQbJ3uQMu7OWOSPacBTeZYAcNVI',
        activityLevel: '100,9;200,8;500,3',
        activityMoney: 9.9,
        activityName: '活动名称',
        companyName: '巴黎春天',
        activityNum: 10,
        activityType: 1,
        auditRemarks: '',
        auditStatus: 0,
        backMusic: 'FtMT4UwpmOTXO72pQcKWdVFceu9R',
        content: 'string',
        createDate: '2017-04-26T03:08:01.928Z',
        customerAmount: 9.9,
        discount: 5.9,
        endDate: '2017-03-26T03:08:01.928Z',
        giftIds: 'string',
        id: 0,
        shareDes: '这是分享描述',
        shareGift: 1,
        shareImg: ' FppqRP5R6C5YFGQgg49QKMxZ6JH-',
        shareTimes: 5,
        startDate: '2017-04-26T03:08:01.928Z',
        totalMan: 100,
        viewNum: 4350
      },
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
        // 如果有背景音乐，进行背景音乐加载
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
    MusicControl () {
      if (this.pageConfig.musicPlaying === true) {
        this.pageConfig.Music.pause()
      } else {
        this.pageConfig.Music.play()
      }
      this.pageConfig.musicPlaying = !this.pageConfig.musicPlaying
    }
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
