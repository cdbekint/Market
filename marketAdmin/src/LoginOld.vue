<template>
<div class="login">
<Row class="loginrow" id="loginpanel">

<Col span="6" offset="16">
<Form ref="formInline" class="loginmainpanel" :model="formInline" :rules="ruleInline">
        <Form-item>
        <h3>系统用户登录</h3>
        </Form-item>
        <Form-item prop="user">
            <Input type="text" v-model="formInline.username" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="formInline.password" placeholder="密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </Form-item>
        <Form-item>
        <Row>
          <Col span="8"><a href="javascript:;" @click="Register()">注册账户</a></Col>
          <Col span="8"><a href="javascript:;">忘记密码</a></Col>
          <Col span="8"><a href="javascript:;">联系客服</a></Col>
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
  data () {
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
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const param = JSON.parse(JSON.stringify(this.formInline))
          this.http.get(this.$store.state.prefix + '/account/login' + this.util.parseParam(param).replace('&', '?')).then(res => {
            console.log(res)
            if (res.error === false) {
              if (res.result.access_token) {
                this.$store.state.token = res.result.access_token
                this.$store.state.companyId = res.result.user.company.id
                this.$store.state.authentic = res.result.user.company.authentic
                this.$store.state.companName = res.result.user.company.companyName
              }
              this.util.setCookie('token', res.result.access_token)
              this.util.setCookie('companyId', res.result.user.company.id)
              this.util.setCookie('companyName',res.result.user.company.companyName)
              this.util.setCookie('authentic',res.result.user.company.authentic)
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
    Register () {
      this.http.post(this.$store.state.prefix + '/account/register', this.register).then(res => {
        console.log(res)
      })
    }
  },
  created () {
    this.util.delCookie('token')
    this.util.delCookie('companyId')
    var _this=this

    document.onkeydown=function(event){ 
     var e = event ? event :(window.event ? window.event : null); 
      if(e.keyCode==13){ 
          if(_this.formInline.username||_this.formInline.password){
            _this.handleSubmit('formInline')

          }
        
      } 
    } 
    
  },
  mounted (){
    var loginrow=document.documentElement.clientHeight-160
      document.getElementById("loginpanel").style.height=loginrow+"px"
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.loginrow
  width:100%
  background:url(/static/images/banner.png) no-repeat top
  height:@width
.loginmainpanel
  background:#fff
  padding:20px 50px 0px 50px
  margin-top:50px
  border-radius:5px
</style>
