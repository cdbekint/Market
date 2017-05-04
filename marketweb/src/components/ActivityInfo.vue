<template>
<div class='activityMain'>
  <div class='mainPic' v-if="activity.activityImg">
    <img :src='murl + activity.activityImg' alt=''>
  </div>
  <div class='countdown' v-if="activity.endDate">
    <countdown :endDate='activity.endDate'></countdown>
    <!-- 此处需要绑定结束时间 -->
  </div>
  <div class='progress commom-wrapper'>
   <div class='commom-header'>
      <div class='header-title'>
        看看伙伴的力量
      </div>
      <div class='header-titles-sub'>
        团结一致革命
      </div>
    </div>
    <div class='percentinfo'>
      当前进度:99.99%
    </div>
    <Progress :percent='80' status='active' :stroke-width='20' hide-info></Progress>
    <div class='groupinfo'>
      <div class='groupusers'>已参团111人</div>
      <div class='discountinfo'>最低折扣3.2折,当前折扣2折，仅需500人</div>
    </div>
  </div>
  <div class='attendusers'>
    <div class='attend-title'>
      <div class='title-left'>他们正在参加活动</div>
      <div class='title-right'>1193人浏览</div>
    </div>
    <div class='attend-users'>
      <Row>
        <Col span='4' class='attend-users-list'>
          <div class='attend-avater'>
            <img src='https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto'>
          </div>
          <div class='attend-name'>
            叫什么好呢
          </div>
        </Col>
         <Col span='4' class='attend-users-list'>
          <div class='attend-avater'>
            <img src='https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto'>
          </div>
          <div class='attend-name'>
            叫什么好呢
          </div>
        </Col>
         <Col span='4' class='attend-users-list'>
          <div class='attend-avater'>
            <img src='https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto'>
          </div>
          <div class='attend-name'>
            叫什么好呢
          </div>
        </Col>
         <Col span='4' class='attend-users-list'>
          <div class='attend-avater'>
            <img src='https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto'>
          </div>
          <div class='attend-name'>
            叫什么好呢
          </div>
        </Col>
         <Col span='4' class='attend-users-list'>
          <div class='attend-avater'>
            <img src='https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto'>
          </div>
          <div class='attend-name'>
            叫什么好呢
          </div>
        </Col>
         <Col span='4' class='attend-users-list'>
          <div class='attend-avater'>
            <img src='https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto'>
          </div>
          <div class='attend-name'>
            叫什么好呢
          </div>
        </Col>
         <Col span='4' class='attend-users-list'>
          <div class='attend-avater'>
            <img src='https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto'>
          </div>
          <div class='attend-name'>
            叫什么好呢
          </div>
        </Col>
         <Col span='4' class='attend-users-list'>
          <div class='attend-avater'>
            <img src='https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto'>
          </div>
          <div class='attend-name'>
            叫什么好呢
          </div>
        </Col>

         <Col span='4' class='attend-users-list'>
          <div class='attend-avater'>
            <img src='/static/images/more.png'>
          </div>
          <div class='attend-name'>
          </div>
        </Col>
      </Row>
    </div>
  </div>

  <div class='gift commom-wrapper'>
    <div class='commom-header'>
      <div class='header-title'>
        来领取礼品啦
      </div>
      <div class='header-titles-sub'>
        排队队，领礼品咯
      </div>
    </div>
    <div class='giftlist'>
      <div class='giftinfo'>
        连续分享朋友圈3次即可到店领取以下商品
      </div>
      <ul>
        <li>
          <img src='http://xdl.7192.com/static/uploadfile/2017/0318/003903744_800_500.jpg' alt=''>
          <div class='giftname'>什么名字啊</div>
        </li>
        <li>
        <img src='http://xdl.7192.com/static/uploadfile/2017/0310/232833304_800_500.jpg' alt=''>
          <div class='giftname'>什么名字啊</div>
        </li>
      </ul>
    </div>
  </div>
  <div class="groupUsers">
    <div class="group-title">
      <div class="group-title-left">
        参团成员
      </div>
      <div class="group-title-right">
        入团时间
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="groupList">
      <ul>
        <li class="displayflex">
          <div class="groupAvater">
            <img src="https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto" alt="">
          </div>
          <div class="groupName flex1">
            某某某的名字
          </div>
          <div class="attendDate flex1">
            2017-04-26 14:23:24
          </div>
        </li>
        <li class="displayflex">
          <div class="groupAvater">
            <img src="https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto" alt="">
          </div>
          <div class="groupName flex1">
            某某某的名字
          </div>
          <div class="attendDate flex1">
            2017-04-26 14:23:24
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class='activitycontent'>
    
  </div>
  <div class='withdrawlist commom-wrapper'>
  <div class='commom-header'>
    <div class='header-title'>提现排行榜</div>
    <div class='header-titles-sub'>领钱钱咯</div>
  </div>
   <div class='withdraw-wrapper'>
      <Table height='200' stripe :columns='withdrawcolumns' :data='withdrawdata'></Table>
   </div>
  </div>
</div>
</template>

<script type='text/ecmascript-6'>
import countdown from './Utils/Countdown'
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
        activityNum: 10,
        activityType: 1,
        auditRemarks: '',
        auditStatus: 0,
        backMusic: 'FtMT4UwpmOTXO72pQcKWdVFceu9R',
        content: 'string',
        createDate: '2017-04-26T03:08:01.928Z',
        customerAmount: 9.9,
        discount: 0,
        endDate: '2017-04-26T03:08:01.928Z',
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
      weixinConfig: {},
      withdrawcolumns: [
        {
          type: 'index',
          title: '排名',
          width: 70,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          width: 70
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '返现金额',
          key: 'withdraw',
          width: 100
        }
      ],
      withdrawdata: [
        {
          name: '小王',
          phone: '183**8322',
          withdraw: 18
        },
        {
          name: '小吧',
          phone: '183**9434',
          withdraw: 99
        }
      ]
    }
  },
  components: { countdown },
  created () {
    var id = this.util.getURLParam('id')
    var inviter = this.util.getURLParam('inviter')
    var url = location.href.split('#')[0]
    // 获取登录者个人信息
    this.http.get('/api/pubInfo/user').then(res => {
      if (res.error === false) {
        this.userInfo = res.result
      }
    })
    // 获取活动详细信息
    this.http.get('/api/activity/' + id).then(res => {
      if (res.error === false) {
        this.activity = res.result
        document.title = res.result.activityName
        // 如果有背景音乐，进行背景音乐加载
        if (res.result.backMusic) {
          this.pageConfig.Music = new Audio(this.murl + res.result.backMusic)
          this.pageConfig.Music.autoplay = true
          this.pageConfig.Music.loop = true
          this.pageConfig.musicPlaying = true
        }
      }
    })
    // 获取微信分享配置
    this.http.get('/api/pubInfo/weChatShare/' + id + '/' + this.util.parseParam({url: url}).replace('&', '?')).then(res => {
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
    console.log(id)
    console.log(inviter)
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
.activityMain
  .mainPic
    img
      width:100%
      height:auto
  .progress
    .percentinfo
      width:60%
      margin:0px auto
      padding:2px
      text-align:center
      color:#000
      border:0px
      border-radius:4px
      background:#fff
      margin-bottom:10px
      position:relative
      &:after
        position:absolute
        width: 0px
        height: 0px
        border-left: 50px solid transparent
        border-right: 50px solid transparent
        border-top: 100px solid #fff
    .groupinfo
      width:80%
      margin:0 auto
      background:#fff
      border-radius:50px
      text-align:center
      line-height:25px
      height:50px
      margin-top:10px
      .groupusers,
      .discountinfo
        width:100%
  .attendusers
    width:100%
    .attend-title
      width:100%
      height:30px
      background-color:rgb(22,37,56)
      line-height:30px
      color:#fff
      .title-left,
      .title-right
        width:50%
        display:block
        border:0px
        float:left
      .title-left
        text-align:left
        padding-left:5px
      .title-right
        text-align:right
        padding-right:5px
    .attend-users
      width:100%
      .attend-users-list
        padding:3px
        text-align:center
        .attend-avater
          width:40px
          height:40px
          margin:0 auto
          max-height:@width
          overflow-y:hidden
          display:block
          border-radius:50%
          img
            width:100%
        .attend-name
          width:100%
          overflow-x:hidden
          height:20px
          line-height:20px
          font-size:0.8em
  .groupUsers
    padding-bottom:50px
    .group-title
      width:100%
      background:#eee
      height:30px
      .group-title-left,
      .group-title-right
        width:50%
        float:left
        padding:0px 5px
        color:red
        line-height:30px
      .group-title-right
        text-align:right
    .groupList
      ul
        li
          width:100%
          height:50px
          line-height:50px
          display:flex
          .groupAvater
            width:50px
            padding:5px
            img
              width:40px
              height:auto
              max-height:40px
              border-radius:50%
              margin:0 auto
          .groupName,
          .attendDate
            font-size:0.9em
            padding:0px 5px
          .attendDate
            text-align:right
          &:first-child
            .groupName
              &:before
                content: '[团长]'
                color:red
                font-weight:bolder
  .gift
    .giftlist
      background-color:#fff
      padding:0px
      .giftinfo
        width:100%
        text-align:center
        color:#A7CD60
        font-weight:bold
        height:30px
        line-height:30px
      li
        width:100%
        margin-bottom:5px
        padding:10px
        img
          width:100%
          height:auto
        .giftname
          width:100%
          text-align:center
  .withdrawlist
    .withdraw-wrapper
      background:#fff
      padding:10px 5px
      th,
      td
        text-align:center
        padding:0px 5px
  

.ivu-table-body
  .ivu-table-cell
    padding:0px 5px !important
    text-align:center

.commom-wrapper
  background:#F0E361
  padding:10px
  .commom-header
    width:100%
    font-weight:bold
    text-align:center
    margin-bottom:10px
    .header-title
      font-size:1.5em
    .header-title-sub
      font-size:1.1em
</style>
