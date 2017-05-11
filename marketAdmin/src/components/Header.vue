<template>
  <div class="header">
    <div class="header-content">
      <Row>
        <Col span="8" class="syslogo">
        </Col>
        <Col span="16" class="dropmenus">
         <Menu mode="horizontal" :active-name="1" v-if="$store.state.token">
           <Submenu name="1">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
                {{userInfo.company.companyName}}
            </template>
            <Menu-group title="账号管理">
                <Menu-item name="1-1">修改密码</Menu-item>
                <Menu-item name="1-2">充值提现</Menu-item>
                <Menu-item name="1-3">个人信息</Menu-item>
                <a href="javascript:;" @click="loginOut()">注销</a>
            </Menu-group>
        </Submenu>
        </Menu>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Header',
  props: ['userInfo'],
  data () {
    return {}
  },
  methods: {
    loginOut () {
      this.$Notice.info({title: '提醒', desc: '即将退出登录'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus' rel="stylesheet/stylus">
.header-content
  width: 1000px
  height:60px
  margin-left: auto
  margin-right: auto
  .syslogo
    display:block
    height:60px
    background:url(https://res.wx.qq.com/mpres/htmledition/images/bg/bg_logo318e8e.png) no-repeat left
  .dropmenus
    .ivu-menu-horizontal
      height:57px
    .ivu-menu-submenu
      float:right
</style>
