<template>
  <div :class="$store.state.token ? 'header':'header loginrow'">
    <div class="header-content"> 
      <Row>
        <Col span="8" class="syslogo">
        <img src="/static/images/logo.png" alt="">
        </Col>
        <Col span="16" class="dropmenus">
          <Menu mode="horizontal" :active-name="1" v-if="$store.state.token ">
            <Submenu name="1">
              <template slot="title">
                <Icon type="stats-bars"></Icon>
                {{$store.state.companyName || userInfo.company.companyName}}
              </template>
              <Menu-group title="账号管理">
                <div style="margin:10px 0px;">
                  <a href="javascript:;" @click="changePassword=true">修改密码</a>
                </div>
                <div>
                  <a href="javascript:;" @click="loginOut()">注销</a>
                </div>
              </Menu-group>
            </Submenu>
          </Menu>
          <div class="topR" v-else>
            <div class="login" @click="handleClick('login',true)">登陆</div>
            <div class="free" @click="handleClick('register',true)">免费体验</div>
          </div>
        </Col>
      </Row>
    </div>
    <Modal v-model="changePassword" title="修改密码" @on-ok="ok" @on-cancel="cancel">
      <Input type="password" v-model="oldPass" placeholder="请输入旧密码" style="margin:10px 0;"></Input>
      <Input type="password" v-model="newPass" placeholder="请输入新密码"></Input>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Header',
  props: ['userInfo'],
  data() {
    return {
      changePassword: false,
      oldPass: '',
      newPass: '',
    }
  },
  methods: {
    ok() {
      this.http.put(this.$store.state.prefix + '/company/updateAccountPassword', {
        oldPassword: this.oldPass,
        newPassword: this.newPass
      }).then((res) => {
        if (res.error == false) {
          this.$Notice.success({ title: '提醒', desc: '修改成功' })
        } else {
          this.$Notice.error({ title: '错误', desc: res.msg })
        }
      });
      this.changePassword = false;
      this.oldPass = '';
      this.newPass = '';
    },
    cancel() {
      this.changePassword = false;
      this.oldPass = '';
      this.newPass = '';
    },
    loginOut() {
      this.$Notice.info({ title: '提醒', desc: '退出登录成功' })
      this.$store.state.token = ""
      this.util.delCookie("token")
    },
    handleClick (typeName,onOff) {
      this.$emit('loginShow',typeName,onOff)
    }
  },
  watch: {
    userInfo(val) {
      this.userInfo = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus' rel="stylesheet/stylus">
.header-content
  width: 1240px
  margin-left: auto
  margin-right: auto
  .syslogo
    text-align:left
    img
      height:70px
      width:auto
  .dropmenus
    .ivu-menu-horizontal
      height:67px
    .ivu-menu-submenu
      float:right
    .topR
      float:right
      color:#fff
      line-height :90px
      height:90px
      .login
        width:120px
        background-color :#4862ff
        float:left
        margin-right:17px
        cursor :pointer
        font-size:22px
      .free
        width:120px
        float:left
        background-color :#e13a96
        cursor :pointer
        font-size:22px
.loginrow
  width:100%
  background:url(/static/images/topBanner.png) no-repeat top
  height:780px        
</style>
