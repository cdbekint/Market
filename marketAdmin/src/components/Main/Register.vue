<template>
    <div class='register'>
        <Row>
            <div class='close' @click="handleClick(this.onOFF)">
                <img src='../../../static/images/×.png'>
            </div>
            <Col span="6">
            <div class='content'>
                <div class='log'>
                    <img src='../../../static/images/LOGO2.png'>
                </div>
                <!-- <form>
                            <input type='text' placeholder="用户名" v-model="register.username">
                            <input type='password' placeholder="密码" v-model="register.password">
                            <input type='text' placeholder="公司名" v-model="register.companyName">
                            <input type='text' placeholder="真实姓名" v-model="register.realName">
                            <input type='text' placeholder="联系电话" v-model="register.phone">
                            <input type='emial' placeholder="邮箱帐号" v-model="register.email">
                            <div class="warn">{{errorMessage}}</div>
                            <button type='button' @click='handleRegister' ref='btn'>注册</button>
                        </form> -->
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" id='item'>
                    <Form-item prop="username" class='items'>
                        <input v-model="formValidate.username" placeholder="用户名" class='item' type='text'></input>
                    </Form-item>
                    <Form-item prop="password" class='items itemstwo'>
                        <input v-model="formValidate.password" placeholder="密码" class='item' type='password'></input>
                    </Form-item>
                    <Form-item prop="companyName" class='items'>
                        <input v-model="formValidate.companyName" placeholder="公司名" class='item' type='text'></input>
                    </Form-item>
                    <Form-item prop="realName" class='items itemstwo'>
                        <input v-model="formValidate.realName" placeholder="真实姓名" class='item' type='text'></input>
                    </Form-item>
                    <Form-item prop="phone" class='items'>
                        <input v-model="formValidate.phone" placeholder="联系电话" class='item' type='text'></input>
                    </Form-item>
                    <Form-item prop="email" class='items itemstwo'>
                        <input v-model="formValidate.email" placeholder="邮箱帐号" class='item' type='text'></input>
                    </Form-item>
                    <Form-item class='lastitem'>
                        <button type="primary" @click="handleSubmit('formValidate')">提交</button>
                    </Form-item>
                </Form>
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
                email: ''
            },
            errorMessage: '',
            ruleValidate: {
                username: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
                companyName: [
                    { required: true, message: '公司名不能为空', trigger: 'blur' }
                ],
                realName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { type:'string',pattern:/[\u4e00-\u9fa5]/gm, message: '请输入准确的姓名', trigger: 'blur' }
                ],
                phone: [
                    { required: true,  message: '手机不能为空', trigger: 'blur' },
                    {type:'string',pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/, message: '输入正确手机', trigger: 'blur'}
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
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
                if (res.msg) {
                    this.$Message.error(res.msg)
                    this.errorMessage = res.msg
                } else {
                    this.$Notice.success({
                        title: "注册成功!"
                    })
                    this.$emit('close', this.close)
                }
                console.log(res)
            })
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        // handleRegister() {

        //     this.http.post(this.$store.state.prefix + '/pubInfo/createCompany', this.register).then(res => {
        //         if (res.msg) {
        //             this.$Message.error(res.msg)
        //             this.errorMessage = res.msg
        //         } else {
        //             this.$Notice.success({
        //                 title: "注册成功!"
        //             })
        //             this.$emit('close', this.close)
        //         }

        //         console.log(res)
        //     })
        // }
    }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
    .register
        width:1090px
        .close
            width:49px
            height:49px
            position :absolute
            right:0
            top:0
            cursor :pointer 
            z-index:3000 
        .content
            width:1090px
            background:#fff
            padding:36px 45px 55px 45px
            border-radius:5px
            height:660px  
            .log
                width :80px
                height:110px
                margin:0 auto
                margin-bottom :34px
            #item
                .items
                    float:left
                    margin-right :34px
                    margin-bottom :34px
                    .item
                        width:480px
                        height:70px
                        margin :0 0;
                        font-size :22px
                        background-color :#f6f6f6
                        border:none
                        padding-left :34px
                        .ivu-form-item-error-tip 
                            top:75px
                .itemstwo
                    margin-right :0    
                .lastitem
                    float :none
                    margin :0 auto
                    text-align :center
                    padding-left :0 
                    height:70px
                    line-height :70px
                    width:480px
                    position:absolute
                    left:303px
                    bottom:77px
                    button
                        height:70px
                        line-height :70px
                        width:480px
                        background-color :#ff017e
                        cursor :pointer
                        color:#fff
                        border:none
                        font-size:22px  

            // form
            //     input
            //         float :left
            //         width:480px
            //         margin-right :34px
            //         margin-top :34px
            //         height:70px
            //         line-height :70px
            //         display:block
            //         border:none
            //         padding-left :34px
            //         color:#aeaeae
            //         font-size :22px
            //         background-color :#f6f6f6
            //     input:nth-of-type(2n)
            //         margin-right :0
            //     .warn
            //         float :left
            //         width :100%
            //         height:67px
            //         line-height :67px
            //         text-align :center
            //         color:#aeaeae        
            //     // input:last-of-type
            //     button
            //         float :none
            //         margin :0 auto
            //         text-align :center
            //         background-color :#ff017e
            //         cursor :pointer
            //         color:#fff
            //         padding-left :0 
            //         height:70px
            //         line-height :70px
            //         width:480px
            //         border:none
            //         font-size:22px

</style>
