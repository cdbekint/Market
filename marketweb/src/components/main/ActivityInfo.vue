<template>
  <div class='activityMain'>
    <music :url = 'music'></music>
    <mainImg :activity = "activity" ></mainImg>
    <timeAndPro :activity = "activity" ></timeAndPro>
    <joinPeople :activity = "activity" ></joinPeople>
    <Gift :activity = "activity"></Gift>
    <Group :activity = "activity" v-if="isGroup"></Group>
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
      isGroup:true,
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
        activityName: '活动名称',
        activityType: 0,
        auditRemarks: '',
        auditStatus: 0,
        companyName: null,
        content: '',
        createDate: '',

        discountLevel: '',
        discount: 0,
        endDate: '',

        giftIds: 0,
        goodsIds:'',
        groupInfo:[],
        groupRate:0,

        id: 0,
        joinNum: 0,
        musicId: '',

        payEndDate:'',
        payNum:0,
        payStartDate:'',
        pointsReturnMultiple:[],
        progress:0,

        returnEndDate:'',
        returnPointsRankInfo:[],
        returnStartDate:'',

        shareDes: '这是分享描述',
        shareGift: 1,
        shareImg: '',
        shareNum:0,
        shareTimes: 5,
        startDate: '',
        viewNum: 0,
        infos:[],
        inviterId:''
      },
      music: '',
      weixinConfig: {}
    }
  },
  components: {mainImg, teamList, timeAndPro, Team, Discount, Gift, Group, Money, joinPeople, music},
  created () {
    var state = this.util.getURLParam('state').split(",")
    var activityId = state[0];
    var inviterId = state[1] === void 0 ? 0 : state[1];
    this.activity.inviterId = inviterId

    if(window.localStorage["inviterId"] != inviterId){

      var oldUrl = location.href;
      var index = oldUrl.indexOf("?");

      var preUrl = oldUrl.slice(0,index+1);
      var state = "state=" + activityId + ",0";

      var url = preUrl + state;
      window.localStorage.clear();
      location.href = url
    }

//    var inviter = this.util.getURLParam('inviter')
    // 获取登录者个人信息
    this.http.get(this.$store.state.prefix + '/pubInfo/user').then(res => {
      if (res.error === false) {
      this.userInfo = res.result
    }
  else{
      this.$Notice.error({
        title:"登陆失败",
        desc:res.msg
      })
    }
  })

    // 获取活动详细信息
    this.http.get(this.$store.state.prefix + '/activity/' + activityId+'?inviterId='+inviterId).then(res => {
      if (res.error === false) {
        this.activity = res.result
        if(this.activity.activityType == 2)
          this.isGroup = true
        else
          this.isGroup = false
        document.title = res.result.activityName
      }
  }).then(()=> {
      if(this.activity.musicId != void 0 && this.activity.musicId != ''){
        this.http.get(this.$store.state.prefix + '/music/' + this.activity.musicId).then(res2 => {
          if (res2.error === false){
            this.music = res2.result.url
          }
    else{
        this.$Notice.error({
          title:"登陆失败",
          desc:res.msg
        })
      }
        })
      }

  })
    var url = location.href.split("#")[0];
    // 获取微信分享配置
  this.http.get(this.$store.state.prefix + '/pubInfo/weChatShare/' + activityId + '?url=' + url).then(res => {

    if (res.error === false) {
      this.wx.config({
        debug: false,
        appId: res.result.appId,
        timestamp: res.result.timestamp,
        nonceStr: res.result.noncestr,
        signature: res.result.signStr,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'getNetworkType', 'chooseWXPay']
      })

      this.weixinConfig = res.result
    }
  });

    this.wx.ready(() => {
      var content = {
        wxshareTitle: this.activity.activityName,
        wxdescContent: this.activity.shareDes,
        wxlineLink: url,
        wximgUrl: this.murl + this.activity.shareImg
      };

    this.wx.onMenuShareAppMessage({
      title: content.wxshareTitle,
      desc: content.wxdescContent,
      link: content.wxlineLink,
      imgUrl: content.wximgUrl,
      type: 'link',
      dataUrl: '',
      success: function () {
        console.log('you share app message ok')
      },
      cancel: function () {
        console.log('cancel app')
      }
    });

    this.wx.onMenuShareTimeline({
      title: content.wxdescContent,
      link: content.wxlineLink,
      imgUrl: content.wximgUrl,
      success: function () {
        console.log('you share time message ok')
      },
      cancel: function () {
        console.log('cancel time')
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
