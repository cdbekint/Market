<template>
  <div class="login">
    <Row class="loginrow" id="loginpanel">
  
      <Col span="24">
      <Form ref="formInline" class="loginmainpanel" :model="formInline" :rules="ruleInline">
        <Form-item>
          <div class='log'>
            <img src='/static/images/LOGO2.png'>
          </div>
        </Form-item>
        <Form-item class='close'>
          <div @click="handleClick(this.onOFF)">
            <img src='/static/images/×.png'>
          </div>
        </Form-item>
        <Form-item prop="user" style="margin-bottom:34px">
          <Input type="text" size="large" v-model="formInline.username" placeholder="用户名" class="formitem">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
          <!-- <input type="text" v-model="formInline.username" placeholder="用户名" class="formitem"> -->
        </Form-item>
        <Form-item prop="password" style="margin-bottom:0">
          <Input type="password" size="large" v-model="formInline.password" placeholder="密码" class="formitem">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
          <!-- <input type="password" v-model="formInline.password" placeholder="密码" class="formitem"> -->
        </Form-item>
        <Form-item style="margin-bottom:0">
          <div class="warn"></div>
        </Form-item>
        <Form-item style="margin-bottom:30px">
          <Button type="primary" @click="handleSubmit('formInline')" class="formitem btn">登录</Button>
        </Form-item>
        <Form-item style="margin-bottom:0">
          <Row class="bottom">
            <!-- <Col span="8">
                <a href="javascript:;" @click="Register()">注册账户</a>
                </Col> -->
            <Col span="12" style='text-align:right;padding-right:10px'>
            <a href="javascript:;">忘记密码</a>
            </Col>
            <Col span="11" style='text-align:left' offset='1'>
            <a href="javascript:;">联系客服</a>
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
      onOFF: false,
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
      this.$emit('close', this.onOFF)
      this.$refs[name].validate((valid) => {
        if (valid) {
          const param = JSON.parse(JSON.stringify(this.formInline))
          // this.jsonp(this.$store.state.prefix + '/account/login' + this.util.parseParam(param).replace('&', '?'),null,function(err,res){
          //   if (err) {
          //     console.error(err.message);
          //   } else {
          //     console.log(res);
          //   }
          // })
          this.http.get(this.$store.state.prefix + '/account/login' + this.util.parseParam(param).replace('&', '?')).then(res => {
            if (res.error === false) {
              if (res.result.access_token) {
                this.$store.state.token = res.result.access_token
                this.$store.state.companyId = res.result.user.company.id
                this.$store.state.authentic = res.result.user.company.authentic
                this.$store.state.companName = res.result.user.company.companyName
                this.$store.state.companyFlag = res.result.user.company.companyFlag
              }
              this.util.setCookie('token', res.result.access_token)
              this.util.setCookie('companyId', res.result.user.company.id)
              this.util.setCookie('companyName', res.result.user.company.companyName)
              this.util.setCookie('authentic', res.result.user.company.authentic)
              this.util.setCookie('companyFlag', res.result.user.company.companyFlag)
              document.getElementById("mainheader").style.height = "70px"
              if (this.$router.query.redirect !== undefined) {
                if (this.$router.query.redirect.indexOf('/login') > -1) {
                  this.$router.push('/')
                }
                this.$router.push(this.$route.query.redirect)
              } else {
                this.$router.push('/')
              }
            } else {
              this.$Message.error(res.msg)
            }
          }, res => {
            this.$Message.error('登录失败，请重试')
          })
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    // Register() {
    //   this.http.post(this.$store.state.prefix + '/account/register', this.register).then(res => {
    //     console.log(res)
    //   })
    // }
    handleClick(type, onOff) {
      this.$emit('close', false)
    }
  },
  created() {
    this.util.delCookie('token')
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

<style scoped lang='stylus' rel="stylesheet/stylus">
.loginmainpanel
  width:100%
  background:#fff
  padding:10px
  position :relative
  .formitem
    width:80%
    margin:0 auto
    border:none
    color:#aeaeae
    font-size :22px
  .btn
    color:#fff
    height:40px
    line-height:40px
    font-family :"微软雅黑"
    background-color :#7454ff
    font-size :20px
    text-align :center  
    margin:0
    padding:0
  .log
    width:50px
    height auto
    margin:0 auto
    margin-bottom :10px
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
</style>
