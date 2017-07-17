<template>
  <div id="app">
    <div class='modal' v-if='modal || registermodal' @click="modal= registermodal=false"></div>
    <newheader class="header-wrapper" :userInfo="userInfo" @loginShow='show'>
      <!-- 头部内容 -->
    </newheader>
    <div class="content-wrapper" v-if="$store.state.token">
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
          <router-link :to="{path:'/accountinfo'}" tag="dd" active-class="active" exact>账户信息</router-link>
          <router-link :to="{path:'/authentic'}" tag="dd" active-class="active" exact>企业认证</router-link>
          <router-link :to="{path:'/union'}" tag="dd" active-class="active" exact>商家联盟</router-link>
  
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
      <login v-if="modal" class='loginmodal' @close='hide'>
      </login>
      <register v-if='registermodal' class='registermodal' @close='hide'></register>
      <news class="news" :lists='lists'></news>
      <news :listsTwo='listsTwo' style='background:#f8f8f8'></news>
      <!-- <news class="news" :lists='lists'></news> -->
      <free @register='show'></free>
      <system></system>
    </div>
    <vfooter></vfooter>
  </div>
</template>

<script  type="text/ecmascript-6">
import vheader from '@/components/Main/Header'
import newheader from '@/components/Main/newHeader'
import login from '@/Login.vue'
import register from '@/components/Main/Register'
import vfooter from '@/components/Main/Footer'
import news from '@/components/Main/news'
import free from '@/components/Main/free'
import system from '@/components/Main/system'
export default {
  name: 'admin',
  data() {
    return {
      title: '营销系统',
      modal: false,
      registermodal: false,
      userInfo: {
        account: {},
        company: {
          companyName: ''
        },
        customer: {},
        employee: {}
      },
      lists: [
        {
          title: '互联网传播,无需发传单',
          text: '裂变营销系统基于互联网传播，客源来自网络，直接省去发传单的设计费用，物料费用，人力费用',
          imgUrl: require('../static/images/1.png')
        },
        {
          title: '二级分销，增加客户粘性',
          text: '积分可通过邀请、分享、提成、消费、等赚取，邀请越多，返利越多，诱导客户成为传播者与销售人员',
          imgUrl: require('../static/images/2.png')
        },
        {
          title: '随心所欲制定活动方案',
          text: '活动相关价格、折扣、赔率、反积分点、持续时间等参数皆可自由设定，你的活动你做主',
          imgUrl: require('../static/images/3.png')
        }
      ],
      listsTwo: [
        {
          title: '异业联盟，客户价值最大化',
          text: '异业商家租成联盟后，客户从任意商家链接进入，都能切换到其他商家店铺',
          imgUrl: require('../static/images/4.png')
        },
        {
          title: '多种价格模式的在线商城',
          text: '系统内置在线商城、现金、积分、组合商品随意上架、客户任凭积分可换购或提现',
          imgUrl: require('../static/images/5.png')
        },
        {
          title: '客户体现即时到账',
          text: '积分体现即时到账，凸显商家的真实性与权威性，让客户更加放心的去推广，宣传',
          imgUrl: require('../static/images/6.png')
        }
      ]
    }
  },
  components: { vheader, login, vfooter, news, free, system, register,newheader },
  methods: {
    selectThis(ms) {
      this.title = ms
    },
    show(data, onOff) {
      switch (data) {
        case 'login':
          this.modal = onOff
          break;
        case 'register':
          this.registermodal = onOff
          break;
      }
    },
    hide(data) {
      this.modal = data
      this.registermodal = data
    }
  },

  created() {
    this.http.get(this.$store.state.prefix + '/pubInfo/user').then(res => {
      this.userInfo = res.result
    })
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
.loginmodal
  z-index:2000
  position :fixed
  width:30%
  margin:0 auto
  left:35%
  top:100px 
.registermodal
  z-index:2000
  position :fixed
  left:15%
  top:50px 
.modal
  width:100%
  height:3246px
  background-color :rgba(0,0,0,.5)
  position :absolute
  top:0
  z-index:1000
.header-wrapper
  width:100%
  height:70px
  background:rgb(255,255,255)
  border-top:3px solid #44B549
  border-bottom:1px solid #eee

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


</style>
