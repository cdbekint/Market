<template>
  <div class="login">
    <Row class="loginrow" id="loginpanel">
      <div class="logincontent">
        <div class="log"><img src="/static/images/loginTop.png" alt=""></div>
         <div class='close' @click="handleClick"></div>
        <div class="logformcontent">
          <div class="username logincommon">
              <Input class="logininput" v-model="formInline.username" placeholder="登录账户名" autocomplete="off" autofocus="autofocus"></Input>
          </div>
          <div class="password logincommon">
            <Input class="logininput" v-model="formInline.password" type="password" placeholder="账户密码"></Input>
          </div>
          <div class="erroinfo logincommon" v-text='formInline.errorInfo' v-if="formInline.errorInfo">
            
          </div>
          <div class="loginactions logincommon">
             <i-button type="primary" class="loginbtns" @click="doLogin()" @keyup.enter="doLogin" v-if="formInline.loading==false">登录</i-button>
             <i-button type="primary" class="loginbtns" loading v-else>登录中</i-button>
          </div>
          <div class="loginlinks">
          <div class="flex1">
            <a href="javascript:;">忘记密码</a>
          </div>
            <div class="flex1">
              <a href="https://wpa.qq.com/msgrd?v=3&uin=1002293285&site=qq&menu=yes" target="_blank">联系客服</a>
              <!-- <p style="color:#000;height:20px;line-height:20px">09:00-20:00</p> -->
            </div>
            
          </div>
        </div>
      </div>
  
    </Row>
  
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Login',
  data() {
    return {
      formInline: {
        loading:false,
        errorInfo:'',
        username: '',
        password: '',
        type: 2
      },
      register: {
        username: '',
        password: '',
        companyName: ''
      },
      ruleInline: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 3, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    doLogin() {
          this.formInline.loading=true
          this.formInline.errorInfo=""
          const param = JSON.parse(JSON.stringify(this.formInline))
          if(!/^[a-zA-z]\w{3,15}$/.test(param.username)){
            this.formInline.loading=false
            this.formInline.errorInfo="登录账户名必须为4-16位字母开头的字符"
            return false
          }else{
            this.formInline.errorInfo=""
          }
          if(param.password.length < 6){
            this.formInline.loading=false
            this.formInline.errorInfo="登陆密码至少6位"
            return false
          }else{
            this.formInline.errorInfo=""
          }

          this.http.get(this.$store.state.prefix + '/account/login' + this.util.parseParam(param).replace('&', '?')).then(res => {
            this.formInline.loading=false
            if (res.error === false) {
              this.util.setCookie('pwd',this.md5(param.password+res.result.access_token))
              if (res.result.access_token) {
                this.$store.state.yxtoken = res.result.access_token
                this.$store.state.companyId = res.result.user.company.id
                this.$store.state.authentic = res.result.user.company.authentic
                this.$store.state.companName = res.result.user.company.companyName
                this.$store.state.companyFlag = res.result.user.company.companyFlag
              }
              this.util.setCookie('yxtoken', res.result.access_token)
              this.util.setCookie('companyId', res.result.user.company.id)
              this.util.setCookie('companyName', res.result.user.company.companyName)
              this.util.setCookie('authentic', res.result.user.company.authentic)
              this.util.setCookie('companyFlag', res.result.user.company.companyFlag)
              document.getElementById("mainheader").style.height = "70px"
            } else {
              this.formInline.errorInfo=res.msg
            }
          })
    },
    handleClick() {
      this.$emit('close', false)
    }
  },
  created() {
    this.util.delCookie('yxtoken')
    this.util.delCookie('companyId')
    this.util.delCookie("authtime")
    this.$store.state.showauth=false
    this.$store.state.authentic=Date.now()
    var _this = this

    document.onkeydown = function (event) {
      var e = event ? event : (window.event ? window.event : null);
      if (e.keyCode == 13) {
        _this.doLogin()
      }
    }

  },
  mounted() {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.loginrow
  height 440px
  position:relative
  .logincontent
    padding:0px
    .close
      position:absolute
      right:0px
      top:0px
      height:50px
      width:50px
    .log
      padding:0px
      img
        width:100%
    .logformcontent
      background:#fff
      padding:0px 50px
      border-bottom-left-radius:10px
      border-bottom-right-radius:10px
      .logincommon
        .ivu-input
          height:38px
        .loginbtns
          padding:5px 20px
          min-width:100px
          font-size:1em
          letter-spacing:3px
        .logininput
          color:#434343
      .erroinfo
        color:red
        height:30px
        line-height:30px
        text-align:center
        font-size:0.8em
      .loginlinks
        font-size:0.8em
        display:flex
</style>
