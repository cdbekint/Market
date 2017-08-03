<template>
  <div class="login">
    <Row class="loginrow" id="loginpanel">

      <Col span="24">
      <Form ref="formInline" class="loginmainpanel" :model="formInline" :rules="ruleInline">
        <Form-item>
          <div class='log'>
            <img src='/static/images/loginTop.png'>
          </div>
        </Form-item>
        <Form-item style="position:absolute;right:0;top:0;">
          <div class='close' @click="handleClick()"></div>
        </Form-item>
        <Form-item prop="user" style="margin-bottom:24px">
          <input type="text" size="large" v-model="formInline.username" placeholder="用户名" class="formitem">
          </input>
          <!-- <input type="text" v-model="formInline.username" placeholder="用户名" class="formitem"> -->
        </Form-item>
        <Form-item prop="password" style="margin-bottom:0">
          <input type="password" size="large" v-model="formInline.password" placeholder="密码" class="formitem">
          </input>
          <!-- <input type="password" v-model="formInline.password" placeholder="密码" class="formitem"> -->
        </Form-item>
        <Form-item style="height:53px;linge-height:53px;margin-bottom:0;">
          <div class="warn">welcome</div>
        </Form-item>
        <Form-item style="margin-bottom:24px">
          <button type="primary" @click="handleSubmit('formInline')" class="formitem btn">登录</button>
        </Form-item>
        <Form-item style="margin:0 auto;width:300px">
          <Row class="bottom">
            <!-- <Col span="8">
                <a href="javascript:;" @click="Register()">注册账户</a>
                </Col> -->
            <Col span="12" style='text-align:left;font-size:20px;color:#aeaeae'>
            忘记密码
            </Col>
            <Col span="12" style='text-align:right;font-size:20px;color:#aeaeae'>
            联系客服
            </Col>
          </Row>
        </Form-item>

      </Form>

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
    handleSubmit(name) {
      // this.$emit('close', this.onOFF)
      this.$refs[name].validate((valid) => {
        if (valid) {
          const param = JSON.parse(JSON.stringify(this.formInline))
          this.http.get(this.$store.state.prefix + '/account/login' + this.util.parseParam(param).replace('&', '?')).then(res => {
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
              debugger
              this.util.setCookie('companyName', res.result.user.company.companyName)
              this.util.setCookie('authentic', res.result.user.company.authentic)
              this.util.setCookie('companyFlag', res.result.user.company.companyFlag)
              document.getElementById("mainheader").style.height = "70px"
            } else {
              this.$Message.error(res.msg)
            }
          }, res => {
            this.$Message.error('登录失败，请重试')
          })
        } else {
          this.$Message.error('登录信息未完善!')
        }
      })
    },
    handleClick() {
      console.log(1)
      this.$emit('close',false)
    }
  },
  created() {
    this.util.delCookie('yxtoken')
    this.util.delCookie('companyId')
    var _this = this

    document.onkeydown = function (event) {
      var e = event ? event : (window.event ? window.event : null);
      if (e.keyCode == 13) {
        if (_this.formInline.username || _this.formInline.password) {
          _this.handleSubmit('formInline')

        }

      }
    }

  },
  mounted() {

    // debugger
    // var loginrow = document.documentElement.clientHeight - 160
    // document.getElementById("loginpanel").style.height = loginrow + "px"

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.loginmainpanel
  width:100%
  background:#fff
  position :relative
  .formitem
    width:300px
    margin:0 auto
    border:none
    color:#aeaeae
    font-size :20px
    height 60px
    background #f6f6f6
    padding-left 34px
    line-height 60px
  .btn
    color:#fff
    height:60px
    width 300px
    line-height:60px
    font-family :"微软雅黑"
    background-color :#3993eb
    font-size :20px
    text-align :center
    margin:0
    padding:0
    cursor pointer
  .log
    width:100%
    height 158px
    margin:0 auto
    margin-bottom 16px
    img
      width:100%
  .warn
    width:60%
    margin:0 auto
    height:62px
    line-height :62px
    color:#aeaeae
    font-size :20px
    text-align :center
  .bottom
    height:20px
    line-height 20px
    a
      color:#7454ff
      font-size :15px
  .close
    width:49px
    height:49px
    position :absolute
    right:0
    top:0
    cursor :pointer
    z-index 3000
</style>
