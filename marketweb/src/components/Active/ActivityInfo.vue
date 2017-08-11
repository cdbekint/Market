<template>
  <div :class='[changeSkin.activeClass]'>
    <music :url='music'></music>
    <companyHead :companyId="activity.companyId" v-if="skin==1"></companyHead>
    <mainImg :activity="activity" @showRule="showRuleNote"></mainImg>
    <activityrule :activity="activity"></activityrule>
    <timeAndPro :activity="activity"></timeAndPro>
    <goodsList :activity="activity" @goodsClick="showGoodsDetail" @goodImgClick="showGoodsDirect"></goodsList>
    <joinPeople :activity="activity"></joinPeople>
    <Gift :activity="activity"></Gift>
    <Group :activity="activity" v-if="isGroup"></Group>
    <Discount :activity="activity"></Discount>
    <Money :activity="activity"></Money>
    <register :datas="activity" :state="currentState" @childClick="changeState"></register>
    <div class="activeInfo_team" v-if="!hasGroup" style="z-index: 1000;">
      <img :src="changeSkin.realValue">
      <div class="team_peopleInfo">
        <img :src="currentGroup.img" v-if="currentGroup.img">
      </div>
      <div class="team_peopleName">
        <p class="peopleName">{{currentGroup.name}}</p>
        <p>正在邀请你</p>
        <p>已有 {{currentGroup.peopleNum}} 人加入</p>
      </div>
      <img :src="changeSkin.realBgUrl.topBtn" class="team_startTeam" @click="newTeam" v-if="activity.activityType==2">
      <img :src="changeSkin.realBgUrl.botBtn" class="team_joinTeam" @click="joinTeam">
    </div>
    <div class="homeCompany_body" style="z-index:2000;" v-if="!currentState">
      <div class="body_company" @click="goCompany">
        <img :src="'/static/images/active/' + comState + '.png'">
      </div>
      <div class="body_company" @click="goHome">
        <img :src="'/static/images/active/'+homeState+'.png'" alt="">
      </div>
    </div>
    <Modal v-model="LoginSuccess" :closable="false" width="1000">
      <p class="modelTitleone">
        <img src='/static/images/company/jifenTishi.png'>
      </p>
      <p class="modelPicone">
        <img src="/static/images/company/jifenTwo.png">
        <span>昨日收益{{pointMention.allPoints}}积分</span>
        <span class="model_money">({{pointMention.allMoney}}元)</span>
      </p>
      <p style="text-align:center">昨日在《{{pointMention.companyInfo.companyName}}》获得的积分</p>
      <div class="modelTableone">
        <ul>
          <li>邀请好友注册会员</li>
          <li>{{pointMention.companyInfo.invitedPoints}}分/人</li>
          <li>{{pointMention.invitedMemPoints}}分</li>
          <li>转发有效活动链接</li>
          <li>
            <span>{{pointMention.companyInfo.sharePoints}}分/次</span>
            <span>({{pointMention.shareTimes}}/{{pointMention.companyInfo.shareMax}}日)</span>
          </li>
          <li>{{pointMention.sharePoints}}分</li>
          <li>消费返还</li>
          <li>
            <span>{{pointMention.companyInfo.selfReturn/100}}%</span>
          </li>
          <li>{{pointMention.oneInvitedPoints}}分</li>
          <li>一级消费提成</li>
          <li>
            <span>{{pointMention.companyInfo.oneReturn/100}}%</span>
          </li>
          <li>{{pointMention.oneInvitedPoints}}分</li>
          <li>二级消费提成</li>
          <li>
            <span>{{pointMention.companyInfo.secondReturn/100}}%</span>
          </li>
          <li>{{pointMention.secondInvitedPoints}}分</li>
        </ul>
      </div>
      <p slot="footer" class="modelBackone" @click="LoginSuccess=false">我知道了</p>
    </Modal>
  </div>
</template>

<script type='text/ecmascript-6'>
import companyHead from './companyHead.vue'
import mainImg from './mainImg.vue'
import timeAndPro from './timeAndPro.vue'
import register from './Register.vue'
import Gift from './Gift.vue'
import music from '../Utils/music.vue'
import Group from './Group.vue'
import Money from './Moeny.vue'
import Discount from './Discount.vue'
import joinPeople from './joinPeople.vue'
import goodsList from './goodsList.vue'
import activityrule from './activityRule.vue'

export default {
  name: 'Active',
  components: { mainImg, timeAndPro, Discount, companyHead, Gift, Group, Money, joinPeople, goodsList, register, music, activityrule },
  created() {
    var state = this.util.getURLParam('state').split(",")
    var activityId = state[0];
    var inviterId = ~~((state[1] == void 0) ? 0 : state[1]);
    this.activityId = activityId;
    this.realInviterId = ~~(state[2] || this.util.getCookie("realInviterId") || window.localStorage["realInviterId"]);//获取到用户的真实
    this.ownId = state[1]
    if (window.localStorage["ownId"] != inviterId || location.href.indexOf("from") > 0 || this.realInviterId == undefined) {
      //判断是否是已经跳转了的页面
      window.localStorage["inviterId"] = inviterId;
      window.localStorage["realInviterId"] = inviterId;

      this.util.setCookie("realInviterId", inviterId)
      var oldUrl = location.href;
      var index = oldUrl.indexOf("?");
      var preUrl = oldUrl.slice(0, index + 1);
      var state = "state=" + activityId + "," + window.localStorage["ownId"] + "," + inviterId;
      var url = preUrl + state;
      location.href = url
    }


    // 获取登录者个人信息,在这个活动所在的公司里面的信息
    this.http.get(this.$store.state.prefix + '/pubInfo/user?activityId=' + this.activityId).then(res => {
      if (res.error === false) {
        this.userInfo = res.result;
        this.$store.state.account=res.result.account
        if (this.userInfo.customer.member == 1) {
          this.$store.state.isMember = 1;
          this.currentState = false;
        }
        else {
          this.$store.state.isMember = 0;
          //this.currentState = true;
        }
      }
      else {
        this.$Message.error(res.msg)
      }
    })

    //获取自己在这个活动中的团信息
    this.http.get(this.$store.state.prefix + '/activity/getGroupInfo/' + (this.ownId || window.localStorage["ownId"]) + '/' + this.activityId).then(res => {
      if (res.result.userGroupInfo.length > 0) {
        //判断是否已经加入任意团
        this.hasGroup = true
      }
      // 获取活动详细信息
      var requesturl = ""
      if (this.hasGroup) {
        requesturl = '/activity/' + activityId + '?inviterId=' + window.localStorage["ownId"]
      } else {
        if (window.localStorage["realInviterId"] == void 0)
          window.localStorage["realInviterId"] = 0;
        requesturl = '/activity/' + activityId + '?inviterId=' + this.realInviterId
      }
      this.http.get(this.$store.state.prefix + requesturl).then(res => {
        if (res.error == false) {
          this.activity = res.result;
          this.skin =  this.activity.skin
          localStorage.setItem('skin', this.skin)
          if (this.skin == 1) {
            this.changeSkin.activeClass = this.changeStyle.activityMain
            this.changeSkin.realValue = this.imgUrl.img
            this.changeSkin.realBgUrl = this.btnUrl.btn
          } else if (this.skin == 2) {
            this.changeSkin.activeClass = this.changeStyle.activityMainColor
            this.changeSkin.realValue = this.imgUrl.imgColor
            this.changeSkin.realBgUrl = this.btnUrl.btnColor
          } else if (this.skin == 3) {
            this.changeSkin.activeClass = this.changeStyle.activityMainColor
            this.changeSkin.realValue = this.imgUrl.imgPink
            this.changeSkin.realBgUrl = this.btnUrl.btnPink
          } else if (this.skin == 4) {
            this.changeSkin.activeClass = this.changeStyle.activityMainColor
            this.changeSkin.realValue = this.imgUrl.imgGolden
            this.changeSkin.realBgUrl = this.btnUrl.btnGolden
          } else if (this.skin == 5) {
            this.changeSkin.activeClass = this.changeStyle.activityMainColor
            this.changeSkin.realValue = this.imgUrl.imgBlue,
              this.changeSkin.realBgUrl = this.btnUrl.btnBlue
          } else {
            this.changeSkin.activeClass = this.changeStyle.activityMain
            this.changeSkin.realValue = this.imgUrl.img
            this.changeSkin.realBgUrl = this.btnUrl.btn
          }
          if (this.activity.activityType == 2)
            this.isGroup = true
          else
            this.isGroup = false
          this.activity.discount = this.activity.discount == 0 ? 10 : this.activity.discount;
          document.title = res.result.activityName

          var len = this.activity.groupInfo.length;
          if (len > 0) {
            var info = this.activity.groupInfo[0];
            this.currentGroup = {
              id: info.groupId,
              img: info.headImg,
              name: this.util.sliceStr(info.userName, 4),
              peopleNum: len
            }
          }
          else {
            //如果邀请人也没有团
            this.currentGroup = {
              img:this.activity.companyLogoImg?(this.murl + this.activity.companyLogoImg):'',
              name: this.util.sliceStr(this.activity.companyName),
              peopleNum: 0
            }
            //this.getInviterInfo()
          }
          this.getPointRecord()//获取积分记录
        }
      }).then(()=>{
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

          this.wx.ready(() => {
            var content = {
              wxshareTitle: this.activity.activityName,
              wxdescContent: this.activity.shareDes,
              wxlineLink: url,
              wximgUrl: this.murl + this.activity.shareImg
            };
            var _this = this
            this.wx.onMenuShareAppMessage({
              title: content.wxshareTitle,
              desc: content.wxdescContent,
              link: content.wxlineLink,
              imgUrl: content.wximgUrl,
              type: 'link',
              dataUrl: '',
              success: function () {
                _this.shareSuccess(2)
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
                _this.shareSuccess(1)
              },
              cancel: function () {
                console.log('cancel time')
              }
            })
          })
          }
        });
      }).then(() => {
        if (this.activity.musicId != void 0 && this.activity.musicId != '') {
          this.http.get(this.$store.state.prefix + '/music/' + this.activity.musicId).then(res2 => {
            if (res2.error === false) {
              this.music = res2.result.url
            }
            else {
              this.$Message.error(res.msg)
            }
          })
        }
      })
    })

    

  },
  methods: {
    handleClick() {
      console.log(this.activity.skin)
    },
    joinTeam() {
      if (this.$store.state.isMember == 0) {
        this.currentState = true;
        return;
      }
      if (this.isLoading) return;

      this.isLoading = true;

      this.http.post(this.$store.state.prefix + '/activity/addGroup', {
        groupId: this.currentGroup.id,
        activityId: this.activity.id
      }).then(res => {
        if (res.error == false) {
          this.$Message.success("恭喜你成功加入该团。");
          this.getGroupInfo();
        } else {
          this.$Message.error(res.msg)
        }
        this.isLoading = false;
      });
    },
    newTeam() {
      if (this.$store.state.isMember == 0) {
        this.currentState = true;
        return;
      }
      if (this.isLoading) return;

      this.isLoading = true;

      this.http.post(this.$store.state.prefix + '/activity/addGroup', {
        activityId: this.activity.id
      }).then(res => {
        if (res.error == false) {
          this.$Message.success("恭喜创建新团成功。")
          this.getGroupInfo();
        } else {
          this.$Message.error(res.msg)
        }
        this.isLoading = false;
      });
    },
    changeState(state) {
      this.currentState = state;
    },
    showGoodsDetail(goodsId) {
      if (this.$store.state.isMember == 0) {
        this.currentState = true;
        return;
      }
      this.$store.state.currentActive = this.activity.id;
      this.$router.push({
        path: "/company",
        query: {
          id: goodsId,
          activeId: this.activity.id,
          companyId: this.activity.companyId,
          discount: this.activity.discount
        }
      })
    },
    showGoodsDirect(goodsId) {
      if (this.$store.state.isMember == 0) {
        this.currentState = true;
        return;
      }
      this.$store.state.currentActive = this.activity.id;
      this.$router.push({
        path: "/company",
        query: {
          id: goodsId,
          companyId: this.activity.companyId
        }
      })
    },
    goCompany() {
      this.comState = "coming";
      setTimeout(() => {
        this.comState = "com";
      }, 300);

      if (this.$store.state.isMember == 0) {
        this.currentState = true;
        return;
      }
      this.$router.push({ path: "/company", query: { companyId: this.activity.companyId } });
    },
    goHome() {
      this.homeState = "homeing";
      setTimeout(() => {
        this.homeState = "home";
      }, 300);
      if (this.$store.state.isMember == 0) {
        this.currentState = true;
        return;
      }
      this.$router.push("/home")
    },
    shareSuccess(type) {
      this.http.get(this.$store.state.prefix + '/pubInfo/shareSuccess/' + this.activityId + "?shareType=" + type).then(res => {

        if (type == 1) {
          this.$Message.success("分享成功，获得积分增长");
        } else {
          this.$Message.success("恭喜你分享成功");
        }
      })
    },
    getGroupInfo() {
      this.http.get(this.$store.state.prefix + '/activity/getGroupInfo/' + this.userInfo.account.id + '/' + this.activityId).then(res => {
        if (res.error === false) {
          this.activity.joinActivityInfo = res.result.joinGroupInfo
          this.activity.groupInfo = res.result.userGroupInfo
          //重新计算折扣信息
          var discountLevel = this.util.ArraySort(JSON.parse(this.activity.discountLevel), 'mans', true)
          var joinNum = 0
          if (~~this.activity.activityType === 1) {
            //自由模式
            joinNum = res.result.joinNum
          } else {
            //组团模式
            joinNum = res.result.userGroupInfo.length
          }
          this.activity.progress = Number(parseFloat(joinNum / (discountLevel[0].mans)).toFixed(2))
          this.activity.joinNum = joinNum
          for (var i in discountLevel) {
            if (joinNum > discountLevel[i].mans) {
              this.activity.discount = discountLevel[i].discount
              break
            }
          }

          if (res.result.userGroupInfo.length > 0) {
            //判断是否已经加入任意团
            this.hasGroup = true
          }
          //手动触发activity的watch函数
          var nactivity = JSON.parse(JSON.stringify(this.activity))
          this.activity = nactivity
        }
      })
    },
    getInviterInfo() {
      this.http.get(this.$store.state.prefix + '/pubInfo/account?accountId=' + this.realInviterId).then(res => {
        if (res.error === false) {
          this.currentGroup = {
            img: res.result.headImg,
            name: res.result.realName || res.result.nickName,
            peopleNum: 0
          }
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    showRuleNote() {
      console.log(JSON.parse(JSON.stringify(this.activity)))
      var activity = JSON.parse(JSON.stringify(this.activity))
      activity.showrule = true
      this.activity = activity
    },
    getPointRecord(){
      var loadHistory=localStorage.getItem("pointMention")?localStorage.getItem("pointMention").split(","):[]
      var companyId=this.activity.companyId
      var thisDay=this.util.getDate()
      var isExist=false
      if(loadHistory.length>0){
        for(var i=0;i<loadHistory.length;i++){
          if(new Date(loadHistory[i].split("|")[0]).getTime()<new Date(thisDay).getTime()){
            loadHistory.splice(i,1)
            i--
          }
          if(loadHistory[i]==(thisDay+"|"+companyId)){
            isExist=true
            break
          }
        }
        }else{
          loadHistory.push(thisDay+"|"+companyId)
        }
      

      if(isExist==false){
        this.http.get(this.$store.state.prefix+"/home/getUserObtainPointsInfo?companyId="+companyId).then(res=>{
          if(res.error==false){
            if(!(loadHistory[0]==(thisDay+"|"+companyId))){
               loadHistory.push(thisDay+"|"+companyId)
            }
            
            localStorage.setItem("pointMention",loadHistory.join(","))
            this.pointMention=res.result
            this.pointMention.allPoints=res.result.invitedMemPoints+res.result.shareTimes+res.result.oneInvitedPoints+res.result.secondInvitedPoints
            this.pointMention.allMoney=parseFloat(this.pointMention.allPoints*this.pointMention.companyInfo.toCashRate/100).toFixed(2)
            this.LoginSuccess = true
          }
        })
      }else{
        localStorage.setItem("pointMention",loadHistory.join(","))
      }

    },
  },
  data() {
    return {
      LoginSuccess: false,
      imgUrl: {
        img: require('../../../static/images/bg.png'),
        imgColor: require('../../../static/images/bg01.png'),
        imgBlue: require('../../../static/images/bg02.png'),
        imgGolden: require('../../../static/images/bg03.png'),
        imgPink: require('../../../static/images/bg04.png')
      },
      btnUrl: {
        btn: {
          topBtn: require('../../../static/images/startTeam.png'),
          botBtn: require('../../../static/images/joinTeam.png'),
        },
        btnColor: {
          topBtn: require('../../../static/images/startTeam1.png'),
          botBtn: require('../../../static/images/joinTeam1.png'),
        },
        btnPink: {
          topBtn: require('../../../static/images/startTeam2.png'),
          botBtn: require('../../../static/images/joinTeam2.png'),
        },
        btnGolden: {
          topBtn: require('../../../static/images/startTeam3.png'),
          botBtn: require('../../../static/images/joinTeam3.png'),
        },
        btnBlue: {
          topBtn: require('../../../static/images/startTeam4.png'),
          botBtn: require('../../../static/images/joinTeam4.png'),
        }
      },
      changeSkin: {
        activeClass: '',
        realValue: {},
        realBgUrl: {}
      },
      changeStyle: {
        activityMain: 'activityMain2',
        activityMainColor: 'activityMain2 activityMaincolor',
      },
      pointMention:{
        companyInfo:{},
        invitedMemNum:0,
        invitedMemPoints:0,
        oneInvitedPoints:0,
        secondInvitedPoints:0,
        sharePoints:0,
        shareTimes:0
      },
      skin: 2,
      isLoading: false,
      comState: "com",
      homeState: "home",
      isGroup: true,
      currentState: false,
      userInfo: {
        account: {},
        customer: {}
      },
      currentGroup: {
        activeId: 0,
        id: '',
        img: '',
        name: '',
        peopleNum: 0
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
        goodsIds: '',
        groupInfo: [],
        groupRate: 0,

        id: 0,
        joinNum: 0,
        musicId: '',

        payEndDate: '',
        payNum: 0,
        payStartDate: '',
        pointsReturnMultiple: [],
        progress: 0,

        returnEndDate: '',
        returnPointsRankInfo: [],
        returnStartDate: '',
        skin: 5,
        shareDes: '这是分享描述',
        shareGift: 1,
        shareImg: '',
        shareNum: 0,
        shareTimes: 5,
        startDate: '',
        viewNum: 0,
        infos: [],
        inviterId: '',
        showrule: false
      },
      music: '',
      weixinConfig: {},
      inviter: {},
      hasGroup: false
    }
  },
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
  .ivu-modal-footer
    border-top none 
  rrem(val){
    return (val/108px)rem
  }
  .ivu-modal-body
    padding 0  
    padding-top rrem(132px)
  .modelTitleone
     width rrem(436px)
     height rrem(140px)
     position absolute
     left rrem(295px) 
     top rrem(-70px)
     img
      width 100%
  .modelPicone
    height rrem(80px)
    line-height rrem(80px)
    width rrem(920px)
    margin 0 auto
    text-align center
    margin-bottom rrem(43px)
    img
      width rrem(60px)
      height rrem(60px)
      vertical-align top
    color #ff017e
    font-size rrem(48px)  
    .model_money
      font-size rrem(30px)
      color #999999

  .modelTableone
    width rrem(920px)
    height rrem(500px)
    line-height rrem(99px)
    color #999999
    font-size rrem(34px)
    margin 0 auto
    ul
      height 100%
      width 100%
      border 1px solid #ccc
      border-right none
      li
        width 33.33333333%
        float left
        border-right 1px solid #ccc
        border-bottom 1px solid #ccc
        text-align center

  .modelBackone
    width rrem(920px)
    height rrem(125px)
    line-height rrem(125px)
    background #ff017e
    text-align center  
    color #fff
    font-size rrem(50px)
    font-weight 600
    margin-bottom rrem(29px)
  @import '../../../static/css/ActivityInfo'

</style>
