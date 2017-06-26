<template>
  <div class='activityMain'>
    <music :url = 'music'></music>
    <mainImg :activity = "activity" ></mainImg>
    <timeAndPro :activity = "activity" ></timeAndPro>
    <goodsList :activity="activity" @goodsClick="showGoodsDetail"></goodsList>
    <joinPeople :activity = "activity" ></joinPeople>
    <Gift :activity = "activity"></Gift>
    <Group :activity = "activity" v-if="isGroup"></Group>
    <Discount :activity="activity"></Discount>
    <Money :activity="activity"></Money>
    <Team :activity="activity" @watchGroup="getGroupInfo"  v-if="!hasGroup"></Team>
    <teamList :activity="activity" @watchGroup="getGroupInfo" v-if="!hasGroup"></teamList>
    <register :datas="activity" :state="currentState" @childClick="changeState"></register>
    <div class="homeCompany_body" style="z-index:2000;">
      <div class="body_company" @click="goCompany">
        <img :src="'/static/images/active/' + comState + '.png'">
      </div>
      <div class="body_company" @click="goHome">
        <img :src="'/static/images/active/'+homeState+'.png'" alt="">
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import mainImg from './mainImg.vue'
import timeAndPro from './timeAndPro.vue'
import register from './Register.vue'
import Gift from './Gift.vue'
import music from '../Utils/music.vue'
import Group from './Group.vue'
import Money from './Moeny.vue'
import Team from './Team.vue'
import teamList from './teamList.vue'
import Discount from './Discount.vue'
import joinPeople from './joinPeople.vue'
import goodsList from './goodsList.vue'

export default {
  name: 'ActivityInfo',
  data () {
    return {
      comState:"com",
      homeState:"home",
      isGroup:true,
      currentState:false,
      userInfo: {
        account: {},
        customer: {}
      },
      props: {
        endDate: '2017-04-26T23:08:01.928Z',
        tableclass: 'withdrawitems'
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
      weixinConfig: {},
      inviter:{},
      hasGroup:false
    }
  },
  components: {mainImg, teamList, timeAndPro, Team, Discount, Gift, Group, Money, joinPeople,goodsList,register, music},
  created () {
    var state = this.util.getURLParam('state').split(",")
    var activityId = state[0];
    var inviterId = state[1] == void 0 ? 0 : state[1];
    this.activityId = activityId

    if(window.localStorage["ownId"] != inviterId){
      //判断是否是已经跳转了的页面
      window.localStorage["inviterId"] = inviterId;
      window.localStorage["realInviterId"] = inviterId
      window.localStorage.removeItem("token");
      var oldUrl = location.href;
      var index = oldUrl.indexOf("?");

      var preUrl = oldUrl.slice(0,index+1);
      var state = "state=" + activityId + "," + window.localStorage["ownId"];

      var url = preUrl + state;
      location.href = url
    }else{
      window.localStorage["realInviterId"] = inviterId
    }

    // 获取登录者个人信息
    this.http.get(this.$store.state.prefix + '/pubInfo/user').then(res => {
      if (res.error === false) {
        this.userInfo = res.result;
        if(this.userInfo.customer.member == 1){
          this.$store.state.isMember = 1;
          this.currentState = false;
        }
        else{
          this.$store.state.isMember = 0;
          this.currentState = true;
        }
      }
      else{
        this.$Message.error(res.msg)
      }
    })

    //获取真正的邀请人的信息
    // this.http.get(this.$store.state.prefix + '/account/getAccount/'+window.localStorage["realInviterId"]).then(res => {
    //   if (res.error === false) {
    //     this.inviter = res.result
    //   }
    //   else{
    //     this.$Message.error(res.msg)
    //   }
    // })
    this.http.get(this.$store.state.prefix + '/activity/getGroupInfo/'+ window.localStorage["ownId"]+'/'+this.activityId).then( res=> {
        if(res.result.userGroupInfo.length>0) {
          //判断是否已经加入任意团
          this.hasGroup = true
        }
        // 获取活动详细信息
        var requesturl =""
        if(this.hasGroup){
          requesturl='/activity/' + activityId+'?inviterId='+window.localStorage["ownId"]
        }else {
          requesturl='/activity/' + activityId+'?inviterId='+window.localStorage["realInviterId"]
        }
        alert(requesturl)
        this.http.get(this.$store.state.prefix + requesturl).then(res => {
          if (res.error === false) {
            this.activity = res.result;
            if(this.activity.activityType == 2)
              this.isGroup = true
            else
              this.isGroup = false
            this.activity.discount = this.activity.discount == 0?10:this.activity.discount;
            document.title = res.result.activityName
          }
        }).then(()=> {
          if(this.activity.musicId != void 0 && this.activity.musicId != ''){
            this.http.get(this.$store.state.prefix + '/music/' + this.activity.musicId).then(res2 => {
              if (res2.error === false){
                this.music = res2.result.url
              }
              else{
                this.$Message.error(res.msg)
              }
            })
          }
        })
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
      });

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
    var _this=this
    this.wx.onMenuShareAppMessage({
      title: content.wxshareTitle,
      desc: content.wxdescContent,
      link: content.wxlineLink,
      imgUrl: content.wximgUrl,
      type: 'link',
      dataUrl: '',
      success: function () {
        _this.shareSuccess()
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
        _this.shareSuccess()
      },
      cancel: function () {
        console.log('cancel time')
      }
    })
    })
  },
  methods: {
    changeState(state){
      this.currentState = state;
    },
    showGoodsDetail(goodsId){
      if(this.$store.state.isMember == 0){
        this.currentState = true;
        return;
      }
      this.$store.state.currentActive = this.activity.id;
      this.$router.push({
        path:"/company",
        query:{
          id:goodsId,
          activeId:this.activity.id,
          companyId:this.activity.companyId
        }
      })
    },
    goCompany(){
      this.comState = "coming";
      setTimeout(()=>{
        this.comState = "com";
      },300);

      if(this.$store.state.isMember == 0){
        this.currentState = true;
        return;
      }
      this.$router.push("/company");
    },
    goHome(){
      this.homeState = "homeing";
      setTimeout(()=>{
        this.homeState = "home";
      },300);
      if(this.$store.state.isMember == 0){
        this.currentState = true;
        return;
      }
      this.$router.push("/home")
    },
    shareSuccess () {
      this.http.get(this.$store.state.prefix + '/pubInfo/shareSuccess/'+ this.activityId).then(res => {
        this.$Message.success("恭喜你分享成功");
      })
    },
    getGroupInfo () {
      this.http.get(this.$store.state.prefix + '/activity/getGroupInfo/'+ this.userInfo.account.id+'/'+this.activityId).then(res=>{
        if(res.error === false) {
          this.activity.joinActivityInfo =res.result.joinGroupInfo
          this.activity.groupInfo =res.result.userGroupInfo
          console.log(this.activity)
          debugger
          //重新计算折扣信息
          var discountLevel =this.util.ArraySort(JSON.parse(this.activity.discountLevel),'mans',true)
          var joinNum = 0
          if (~~this.activity.activityType === 1) {
            //自由模式
            debugger
            joinNum = res.result.joinNum
          } else {
            //组团模式
            debugger
            joinNum = res.result.userGroupInfo.length
          }
          this.activity.progress = Number(parseFloat(joinNum/(discountLevel[0].mans)).toFixed(2))
          this.activity.joinNum = joinNum
          debugger
          for(var i in discountLevel){
            if(joinNum > discountLevel[i].mans) {
              this.activity.discount = discountLevel[i].discount
              break
            }

          }

          if(res.result.userGroupInfo.length>0) {
            //判断是否已经加入任意团
            this.hasGroup = true
          }
          //手动触发activity的watch函数
          var nactivity=JSON.parse(JSON.stringify(this.activity))
          this.activity=nactivity
        }
      })
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
  rrem(val){
    return (val/108px)rem
  }
  html,body
    margin 0px
    padding 0px
    line-height 0
  .activityMain
    background #fff
    padding-bottom rrem(180px)
  .homeCompany_body
    position fixed
    bottom rrem(50px)
    right rrem(40px)
    width rrem(330px)
    height rrem(150px)
    display flex
    justify-content space-between
    div
      width rrem(150px)
      height rrem(150px)
      border-radius 100%
      border 1px solid #ff017e
      img
        width 100%
        height 100%

</style>
