<template>
  <div id="app">

    <vheader class="header-wrapper" :userInfo="userInfo">
        <!-- 头部内容 -->
    </vheader>
    <div class="content-wrapper" v-if="$store.state.operatetoken">
      <div class="menu-wrapper">
        <dl class="menulist">
          <dt>
          <i class="fa fa-th"></i>概览
          </dt>
          <router-link :to="{path:'/'}"  tag="dd" active-class="active" exact>主页</router-link>
        </dl>

        <dl class="menulist">
          <dt><i class="fa fa-area-chart"></i>公司管理</dt>
          <router-link :to="{path:'/companylist'}" tag="dd" active-class="active">公司列表</router-link>
          <router-link :to="{path:'/companyAdd'}" tag="dd" active-class="active">新增公司</router-link>
          <router-link :to="{path:'/customerList'}" tag="dd" active-class="active">客户系统</router-link>
          <router-link :to="{path:'/companybalance'}" tag="dd" active-class="active">商家资金</router-link>
        </dl>
        <dl class="menulist">
          <dt>
          <i class="fa fa-shopping-cart"></i>商家提现
          </dt>
          <router-link :to="{path:'/withdrawlist'}"  tag="dd" active-class="active">提现申请</router-link>
          <router-link :to="{path:'/waitaudit'}"  tag="dd" active-class="active">待审提现</router-link>
        </dl>
        <dl class="menulist">
          <dt>
          <i class="fa fa-tags"></i>商家认证
          </dt>
          <router-link :to="{path:'/EnterPriseAuthentic'}"  tag="dd" active-class="active">商家待办认证</router-link>
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
    <login>

    </login>
    </div>
    <vfooter></vfooter>
  </div>
</template>

<script  type="text/ecmascript-6">
import vheader from '@/components/Main/Header'
import login from '@/Login.vue'
import vfooter from '@/components/Main/Footer'
export default {
  name: 'admin',
  data () {
    return {
      title: '营销系统-运营平台',
      userInfo: {
        account: {},
        company: {
          companyName: ''
        },
        customer: {},
        employee: {}
      }
    }
  },
  components: { vheader, login, vfooter },
  methods: {
    selectThis (ms) {
      this.title = ms
    }
  },
  created () {
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
