<template>
  <div id="app">
    <!-- <div class='modal' v-if='modal || registermodal' @click="modal= registermodal=false"></div> -->
    <div class="authmention" v-if="$store.state.showauth">
      <div class="leftmention">
        <Icon type="alert-circled" size="20"></Icon>
      </div>
      <div class="flex1">
        你可以临时访问（至{{this.util.getFormatDate(Number(authtime))}}）管理功能。如果不再需要，请 <a href="javascript:;" @click="delAuthen()">取消访问</a> 。
        或者<a href="javascript:;" @click="moreDate()">延长30分钟</a>
      </div>
    </div>
    <newheader class="header-wrapper" :userInfo="userInfo">
      <!-- 头部内容 -->
    </newheader>
    <div class="content-wrapper" v-if="$store.state.yxtoken">
      <div class="menu-wrapper">
        <!-- 菜单区域 -->
        <!-- <dl class="menulist" v-for="(m,index) in menu">
                    <dt><i :class="m.icon"></i><span v-text="m.category"></span></dt>
                    <router-link v-for="(ms,indexs) in m.subMenu" v-if="m.subMenu" :to="ms" :tag='ms.tag' v-text="ms.title" :active-class="ms.active" @click="selectThis(ms)"></router-link>
                  </dl> -->
        <dl class="menulist">
          <dt>
            <i class="fa fa-th"></i>基本信息
          </dt>
          <router-link :to="{path:'/'}" tag="dd" active-class="active" exact>主页</router-link>
          <router-link :to="{path:'/company'}" tag="dd" active-class="active" exact>公司基本信息</router-link>
          <router-link :to="{path:'/authentic'}" tag="dd" active-class="active" exact>企业认证</router-link>
          <!-- <router-link :to="{path:'/union'}" tag="dd" active-class="active" exact>商家联盟</router-link> -->
  
        </dl>
  
        <dl class="menulist">
          <dt>
            <i class="fa fa-area-chart"></i>活动管理</dt>
          <router-link :to="{path:'/music'}" tag="dd" active-class="active">音乐库</router-link>
          <router-link :to="{path:'/gift'}" tag="dd" active-class="active">礼品管理</router-link>
          <router-link :to="{path:'/activity'}" tag="dd" active-class="active">活动管理</router-link>
        </dl>
        <dl class="menulist">
          <dt>
            <i class="fa fa-shopping-cart"></i>商品管理
          </dt>
          <router-link :to="{path:'/goods'}" tag="dd" active-class="active">商品管理</router-link>
          <router-link :to="{path:'/orders'}" tag="dd" active-class="active">订单管理</router-link>
  
        </dl>
        <dl class="menulist">
          <dt>
            <i class="fa fa-money"></i>财务管理</dt>
          <router-link :to="{path:'/balancerecord'}" tag="dd" active-class="active">资金流水</router-link>
          <router-link :to="{path:'/revenue'}" tag="dd" active-class="active">营收数据</router-link>
        </dl>
        <dl class="menulist">
          <dt>
            <i class="fa fa-money"></i>交易提现</dt>
          <router-link :to="{path:'/withdraw'}" tag="dd" active-class="active">用户提现</router-link>
          <router-link :to="{path:'/largewithdraw'}" tag="dd" active-class="active">大额提现</router-link>
        </dl>
        <dl class="menulist">
          <dt>
            <i class="fa fa-user"></i>客户管理</dt>
          <router-link :to="{path:'/customer'}" tag="dd" active-class="active">客户管理</router-link>
          <router-link :to="{path:'/inviterinfo'}" tag="dd" active-class="active">邀请排行</router-link>
          <router-link :to="{path:'/alonemenber'}" tag="dd" active-class="active">孤单会员</router-link>
          <router-link :to="{path:'/point'}" tag="dd" active-class="active">积分查询</router-link>
        </dl>
  
      </div>
      <div class="realcontent-wrapper">
        <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
          <router-view></router-view>
        </transition>
      </div>
      <div class="clearfix"></div>
    </div>
    <div v-else>
      <vmedia></vmedia>
      <news :news='lists'></news>
      <free></free>
      <!-- <system></system>  -->
    </div>
    <vfooter></vfooter>
    <div class="adminauthentic" v-if="$store.state.needAuthen">
      <div class="AuthInfo">
        <div class="authtitle">
          密码授权
        </div>
        <div class="authcontent">
          <div class="authcontentinput">
            <Input type="password" v-model="inputpwd"></Input>
            <span>使用登录密码进行授权访问</span>
            <p v-text="inputinfo" style="color:red" v-if="inputinfo"></p>
          </div>
          <div class="authcontentaction">
            <Button type="primary" @click="doAuthen">授权访问</Button>
            <Button @click="$store.state.needAuthen=false">取消</Button>

          </div>
        </div>
        <div class="authnote">
          <Icon type="information-circled"></Icon>部分风险操作需要进行密码授权，每次授权后15分钟有效
        </div>
      </div>
    </div>
   
  </div>
</template>

<script  type="text/ecmascript-6">
import vheader from '@/components/Main/Header'
import newheader from '@/components/Main/newHeader'
import register from '@/components/Main/Register'
import vfooter from '@/components/Main/Footer'
import news from '@/components/Main/news'
import free from '@/components/Main/free'
import system from '@/components/Main/system'
import vmedia from '@/components/Main/media'
export default {
  name: 'admin',
  data() {
    return {
      title: '营销系统',
      modal: false,
      registermodal: false,
      inputpwd:'',
      inputinfo:'',
      authtime:this.util.getCookie("authtime")||Date.now(),
      userInfo: {
        account: {},
        company: {
          companyName: '',
          companyFlag: 0
        },
        customer: {},
        employee: {}
      },
      lists: [
        {
          title: '前雇员联盟',
          text: '所有的员工与企业形成联盟体，离开的员工更是企业的一笔宝贵的财富',
        },
        {
          title: '企业客户资源管理',
          text: '企业的客户资源由企业自由管理，不再受到人为因素的影响',
        },
        {
          title: '商家异业联盟',
          text: '与多行业商家形成会员互惠联盟，给予客户最大的实惠，为异业商家联盟吸纳更多的会员及消费',
        },
        {
          title: '客户员工化',
          text: '客户成为移动广告牌，运用自身资源为企业进行抓单、营销。客户积极主动去寻找身边资源，比企业销售人员销售效率和成交率高百倍',
        },
        {
          title: '吸纳客户神器',
          text: '二级分销模式让客户呈现指数级增长，1变2，2变4，4变16，…………；让您的客户迅速暴增',
        },
        {
          title: '最夯营销工具',
          text: '团购，秒杀，红包，众筹等一系列的活动工具陆续上线中，你不是没有市场，只是缺少一个营销工具。',
        }
      ]
    }
  },
  components: { vheader, vfooter, news, free, system, register, newheader, vmedia },
  methods: {
    selectThis(ms) {
      this.title = ms
    },
    doAuthen(){
      var pwd=this.util.getCookie("pwd")
      this.inputinfo=""
      if(this.md5(this.inputpwd+this.$store.state.yxtoken)===pwd){
        this.inputpwd=""
        this.$store.state.needAuthen=false
        this.$store.state.showauth=true
        this.util.setCookie("authtime",Date.now()+900000)
        this.authtime=Date.now()+900000
        this.$router.push({path:'/company'})
        
      }else{
        this.inputinfo="密码不匹配，请重新输入"
      }
    },
    delAuthen(){
      this.util.delCookie("authtime")
      this.$store.state.showauth=false
      if(this.$router.history.current.path.indexOf("/company")>-1){
        this.$router.push({path:"/"})
      }
    },
    moreDate(){
      var now=Number(this.util.getCookie("authtime"))
      this.util.setCookie("authtime",now+1800000)
      this.authtime=now+1800000
    }
  },

  created() {
    if (this.$store.state.yxtoken) {
      this.http.get(this.$store.state.prefix + '/pubInfo/user').then(res => {
        console.log(res)
        if (!res.error) {
          if (res.result) {
            this.userInfo = res.result
          }
        }
      })
    }

  }
}
</script>

<style lang='stylus' rel="stylesheet/stylus">
html,
body
  background:#E7E8EB !important
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  background #fff
.header-wrapper
  width:100%
  height:70px

.content-wrapper
  width:80%
  display:block
  max-width:1560px
  min-width:1000px
  margin-top:20px
  margin-left:auto
  margin-right:auto
  .menu-wrapper
    width:20%
    border:1px solid #eee
    float:left
    display:block
    background:#fff
    min-height:400px
    .menulist
      border-bottom:1px solid #E7E7EB
      dt,
      dd
        height:35px
        line-height:35px
        padding:0px 0px 0px 30px
        text-align:left
      dt
        color:#B2B2B2
        .fa
          margin-right:10px
      dd
        padding:0px 0px 0px 58px
        font-size:0.9em
        cursor:pointer
        &:hover
          background:#F4F5F9
        a
          text-decoration:none
      dd.active
        background:#44B549
        color:#fff
  .realcontent-wrapper
    width:calc(80% - 5px)
    min-height:400px
    border:1px solid #eee
    border-left:0px
    background:#eee
    float:left
    display:block
    background:#fff
    padding:0px 10px
    .content-title
      height:40px
      line-height:40px
      border-bottom:1px solid #eee
      .titlename
        text-align:left
        width:48%
        float:left
        display:block
      .titellink
        text-align:right
        float:left
        width:50%
        .innerbtnlink
          width:auto
          display:inline-block
          text-decoration:none
          border-radius:3px
          background:#44B549
          padding:0px 15px
          height:25px
          line-height:25px
          border:1px solid #ccc
          color:#fff
          font-size:0.8em
          &:hover
            background:#2F9833

.operabtns
  color:#6BBEF2
  text-decoration:none
  margin:0px 3px
.adminauthentic
  width:100%
  height:100%
  min-height:768px
  position:fixed
  top:0px
  left:0px
  background:rgba(0,0,0,0.3)
  z-index:100
  .AuthInfo
    width:500px
    height:300px
    background:#fff
    position:absolute
    left:calc(50% - 250px)
    top:calc(50% - 200px)
    border-radius:5px
    .authtitle
      height:40px
      line-height:40px
      font-size:1.2em
      font-weight:bolder
      border-bottom:1px solid #ccc
    .authnote
      position:absolute
      bottom:0px
      width:100%
      height:40px
      line-height:40px
      font-size:1.2em
      font-weight:bolder
      border-top:1px solid #ccc
    .authcontent
      padding:10px 20%
      .authcontentinput
        margin-top:30px
        .ivu-input
          height:45px
          line-height:45px
          font-size:1.5em
          color:#434343
      .authcontentaction
        margin-top:30px
.authmention
  height:60px
  line-height:60px
  border-bottom:2px solid #A68112
  display:flex
  .leftmention
    width:40px
    height:58px
    background:#F6C342
  .flex1
    background:#fff
    height:58px
    color:#434343
    text-align:left
    padding:0px 10px
</style>
