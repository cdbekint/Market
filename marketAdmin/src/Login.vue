<template>
  <div class="login">
    <Row class="loginrow" id="loginpanel">
      <div class="logincontent">
        <div class="log"><img src="/static/images/loginTop.png" alt=""></div>
         <div class='close' @click="handleClick"></div>
        <div class="logformcontent">
          <div class="username logincommon">
              <Input v-model="formInline.username" placeholder="登录账户名" autocomplete="off" autofocus="autofocus"></Input>
          </div>
          <div class="password logincommon">
            <Input v-model="formInline.password" type="password" placeholder="账户密码"></Input>
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
              <a href="javascript:;">联系客服</a>
            </div>
            
          </div>
        </div>
      </div>
      <Col span="24">
 <!--      <Form ref="formInline" class="loginmainpanel" :model="formInline" :rules="ruleInline">
        <Form-item>
          <div class='log'>
            <img src='/static/images/loginTop.png'>
          </div>
        </Form-item>
        <Form-item style="position:absolute;right:0;top:0;">
          <div class='close' @click="handleClick"></div>
        </Form-item>
        <Form-item prop="user" style="margin-bottom:24px">
          <input type="text" size="large" v-model="formInline.username" placeholder="用户名" class="formitem">
          </input>
        </Form-item>
        <Form-item prop="password" style="margin-bottom:0">
          <input type="password" size="large" v-model="formInline.password" placeholder="密码" class="formitem">
          </input>
          <input type="password" v-model="formInline.password" placeholder="密码" class="formitem">
        </Form-item>
        <Form-item style="height:53px;linge-height:53px;margin-bottom:0;">
          <div class="warn">welcome</div>
        </Form-item>
        <Form-item style="margin-bottom:24px">
          <button type="primary" @click="handleSubmit('formInline')" class="formitem btn">登录</button>
        </Form-item>
        <Form-item style="margin:0 auto;width:300px">
          <Row class="bottom">
            <Col span="12" style='text-align:left;font-size:20px;color:#aeaeae'> 忘记密码
            </Col>
            <Col span="12" style='text-align:right;font-size:20px;color:#aeaeae'> 联系客服
            </Col>
          </Row>
        </Form-item>
  
      </Form> -->
  
      </Col>
  
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
