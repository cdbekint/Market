<template>
  <div id="app">
    <div class='modal' v-if='modal || registermodal' @click="modal= registermodal=false"></div>
    <newheader class="header-wrapper" :userInfo="userInfo" @loginShow='show'>
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
      <free @register='show'></free>
      <!-- <system></system>  -->
    </div>
    <vfooter></vfooter>
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
    }
  },

  created() {
    if(this.$store.state.yxtoken){
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


</style>
