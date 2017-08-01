<template>
    <div class='register'>
        <Row>
            <div class='close' @click="handleClick(this.onOFF)">
                <img src='../../../static/images/×.png'>
            </div>
            <Col span="24">
            <div class='content'>
                <div class='log'>
                    <img src='../../../static/images/LOGO2.png'>
                </div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" id='item'>
                    <Form-item class="items">
                        <h1>注册账户</h1>
                    </Form-item>
                    <Form-item prop="username" class='items'>
                        <Input v-model="formValidate.username" placeholder="登录用户名(字母开头数字,无特殊符号)" class='item'></Input>
                    </Form-item>
                    <Form-item prop="password" class='items itemstwo'>
                        <Input v-model="formValidate.password" placeholder="密码" class='item' type='text'></Input>
                    </Form-item>
                    <Form-item prop="companyName" class='items'>
                        <Input v-model="formValidate.companyName" placeholder="企业名称(允许使用简称)" class='item' type='text'></Input>
                    </Form-item>
                    <Row>
                        <Col span="12">
                        <Form-item prop="realName" class='items itemstwo'>
                            <Input v-model="formValidate.realName" placeholder="联系人姓名" class='item' type='text'></Input>
                        </Form-item>
                        </Col>
                        <Col span="12">
                        <Form-item prop="phone" class='items'>
                            <Input v-model="formValidate.phone" placeholder="联系人手机号" class='item' type='text'></Input>
                        </Form-item>
                        </Col>
                    </Row>
    
                    <Row>
                        <Col span="12">
                        <Form-item prop="email" class='items itemstwo'>
                            <Input v-model="formValidate.email" placeholder="邮箱帐号" class='item' type='text'></Input>
                        </Form-item>
                        </Col>
                        <Col span="12">
                        <Form-item prop="invitationCode" class='items'>
                            <Input v-model="formValidate.invitationCode" placeholder="邀请码" class='item' type='text'></Input>
                        </Form-item>
                        </Col>
                    </Row>
    
                    <Form-item class='lastitem'>
                        <!-- <button type="primary" @click="handleSubmit('formValidate')">注册体验(30天)</button> -->
                        <button type="primary" disabled="disabled">敬请期待</button>

                    </Form-item>
                </Form>
                <div class="clearfix"></div>
            </div>
            </Col>
        </Row>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            onOFF: false,
            formValidate: {
                username: '',
                password: '',
                companyName: '',
                realName: '',
                phone: '',
                email: '',
                invitationCode: ''
            },
            errorMessage: '',
            ruleValidate: {
                username: [
                    { required: true, message: '登录用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
                companyName: [
                    { required: true, message: '公司名称不能为空(允许使用简称)', trigger: 'blur' }
                ],
                realName: [
                    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
                    { type: 'string', pattern: /[\u4e00-\u9fa5]/gm, message: '请输入准确的联系人姓名', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '联系人手机号不能为空', trigger: 'blur' },
                    { type: 'string', pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/, message: '输入正确手机', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                invitationCode: [
                    { type: 'string', min: 8, max: 8, message: '必须是8位数的邀请码', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        handleClick(onOff) {
            this.$emit('close', this.close)
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.http.post(this.$store.state.prefix + '/pubInfo/createCompany', this.formValidate).then(res => {
                        if (res.error) {
                            this.$Message.error(res.msg)
                            this.errorMessage = res.msg
                        } else {
                            this.$Notice.success({
                                title: "恭喜您注册成功,请登录"
                            })
                            this.$emit('close', this.close)
                        }
                        console.log(res)
                    })
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        }
    }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.register
  width:70%
  max-height:1200px
  min-height:800px
  display:block
  .close
    width:49px
    height:49px
    position :absolute
    right:25%
    top:0
    cursor :pointer 
    z-index:3000 
  .content
    width:50%
    margin:0 auto
    background:rgba(255,255,255,1)
    padding:20px 45px
    display:block
    .log
      width:50px
      height auto
      margin:0 auto
      margin-bottom :10px
      img
        width:100%
    #item
      .items
        padding:0px 10px
        h1
          font-size:1.5em
        .item
          margin :0 0;
          font-size :1.2em
          background-color :#f6f6f6
          border:none
          .ivu-form-item-error-tip 
            top:75px
      .itemstwo
        margin-right :0    
      .lastitem
        float :none
        margin :0 auto
        text-align :center
        padding-left :0 
        height:50px
        line-height :50px
        width:80%
        button
          height:50px
          line-height :50px
          width:100%
          background-color :#ff017e
          cursor :pointer
          color:#fff
          border:none
          font-size:20px  

</style>
