<template>
  <div :class="$store.state.yxtoken ? 'header':'header loginrow'" id="mainheader">
    <div class="header-content">
      <Row>
        <Col span="8" class="syslogo">
        <img src="/static/images/logo.png" alt="">
        </Col>
        <Col span="16" class="dropmenus">
        <Menu mode="horizontal" :active-name="1" v-if="$store.state.yxtoken ">
          <Submenu name="1">
            <template slot="title">
              <span class="memberstatus" :class="{'free':($store.state.companyFlag==0),'member':($store.state.companyFlag==1)}" v-text="$store.state.companyFlag==1?'正式会员':'体验会员'">
              </span>
              {{$store.state.companyName || util.getCookie("companyName")}}
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
          <div class="login" @click="handleClick('login',true)">登录</div>
          <login class='loginmodal' @close='hide' ref='login'></login>
          <!-- <div class="free" @click="handleClick('register',true)">免费体验</div> -->
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
import login from '@/Login.vue'
export default {
  name: 'Header',
  props: ['userInfo'],
  components: { login },
  data() {
    return {
      changePassword: false,
      oldPass: '',
      newPass: '',
      topheight: 70,
      LoginHeight:0,
      speed:16,
      time:10
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
      this.$store.state.yxtoken = ""
      this.$store.state.companyName = ""
      this.util.delCookie("companyName")
      this.util.delCookie("companyId")
      this.util.delCookie("yxtoken")
      this.topheight = (window.screen.width * 780 / 1920)
      document.getElementById("mainheader").style.height = this.topheight + "px"
    },
    handleClick(typeName, onOff) {
      this.animation = (h, speed, time) => {
        this.timer = setInterval(() => {
          h += speed
          this.$refs.login.$el.style.top = h + 'px'
          if (speed >= 0) {
            if (h >= 0-speed) {
              this.$refs.login.$el.style.top = h + 'px'
              h = h
              clearInterval(this.timer)
            }
          }else{
            if (h <= -this.LoginHeight-speed) {
              h = 0
              this.$refs.login.$el.style.top = -this.LoginHeight + 'px'
              clearInterval(this.timer)
            }
          }
        }, time)
      }
      this.animation(-this.LoginHeight,this.speed, this.time)
    },
    hide(pullTop) {
      if (!pullTop) {
        this.animation(0, -this.speed, this.time)
      }
    }
  },
  watch: {
    userInfo(val) {
      console.log(val)
      this.userInfo = val
    }
  },
  mounted() {
    if (!this.$store.state.yxtoken) {
      this.topheight = (window.screen.width * 710 / 1920)
      document.getElementById("mainheader").style.height = this.topheight + "px"
    } else {
      document.getElementById("mainheader").style.height = "70px"
    }
    this.LoginHeight = document.getElementsByClassName('loginmodal')[0].clientHeight
  },
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus' rel="stylesheet/stylus">
rrem(val){
  return (val/108px)rem
}
.header-content
  width: rrem(1240px)
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
      line-height:40px
      height:40px
      position relative
      .login
        width:92px
        height 60px
        line-height 60px
        background:linear-gradient(to bottom, rgba(255,255,255,.05) 80%, rgba(255,255,255,.01))
        float:left
        cursor :pointer
        font-size:1.4em
        color #fff
      .loginmodal
        height 440px
        z-index:2000
        position :absolute
        width 400px
        margin:0 auto
        right:0
        top:-540px
        border-bottom-left-radius 13px
        border-bottom-right-radius 13px
        background #fff
        box-shadow 0 6px 29px 0px rgba(0,0,0,.1)
      .free
        width:120px
        float:left
        background-color:rgba(0,0,0,0.3)
        cursor :pointer
        font-size:22px
.loginrow
  width:100%
  background:url(/static/images/newBanner.png) no-repeat top
  background-size:100% auto
.memberstatus
  height:20px
  border-radius:3px
  font-size:0.8em
  padding:5px
  margin-right:15px
.free
  background:#eee
.member
  background:#44b549
  color:#fff
</style>
