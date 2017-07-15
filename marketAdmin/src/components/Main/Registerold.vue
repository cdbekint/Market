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
                <form>
                    <input type='text' placeholder="用户名" v-model="register.username">
                    <input type='password' placeholder="密码" v-model="register.password">
                    <input type='text' placeholder="公司名" v-model="register.companyName">
                    <input type='text' placeholder="真实姓名" v-model="register.realName">
                    <input type='text' placeholder="联系电话" v-model="register.phone">
                    <input type='emial' placeholder="邮箱帐号" v-model="register.email">
                    <div class="warn">{{errorMessage}}</div>
                    <button type='button' @click='handleRegister' ref='btn'>注册</button>
                </form>
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
            register: {
                username: '',
                password: '',
                companyName: '',
                realName: '',
                phone: '',
                email: ''
            },
            errorMessage: ''
        }
    },
    updated() {
        const { username, password, phone, email, realName ,companyName} = this.register;
        var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        var reg1 = /^[\x00-\xff\w\-\,]{3,20}$/;
        var reg2 = /^\d+$/;
        console.log(this.$refs.btn)
        if (username) {
            if (reg1.test(username)) {
                if (reg2.test(username)) {
                    this.$Message.error('用户名不能为纯数字')
                    this.errorMessage = '用户名不能为纯数字'

                }
            }
        }
        if (phone.length > 0) {
            if (phone.length != 13) {
                this.$Message.error('请输入13位的手机号码')
                this.errorMessage = '请输入13位的手机号码'
                return false;
            } 
            if (isNaN(phone - 0)) {
                this.$Message.error('手机号必须是数字')
                this.errorMessage = '手机号必须是数字'
                return false;
            } 
        }
        if (realName) {
            if (!isNaN(realName - 0)) {
                this.$Message.error('请输入真实姓名')
                this.errorMessage = '请输入真实姓名'
                return false;
            } 
        }
        if (email.length > 0) {
            if (!regEmail.test(email)) {
                this.$Message.error('邮箱格式不正确，请重新输入！');
                this.errorMessage = '邮箱格式不正确，请重新输入！'
            }
        }
    },
    methods: {
        handleClick(onOff) {
            this.$emit('close', this.close)
        },
        handleRegister() {
        
            this.http.post(this.$store.state.prefix + '/pubInfo/createCompany', this.register).then(res => {
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
        }
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
            form
                input
                    float :left
                    width:480px
                    margin-right :34px
                    margin-top :34px
                    height:70px
                    line-height :70px
                    display:block
                    border:none
                    padding-left :34px
                    color:#aeaeae
                    font-size :22px
                    background-color :#f6f6f6
                input:nth-of-type(2n)
                    margin-right :0
                .warn
                    float :left
                    width :100%
                    height:67px
                    line-height :67px
                    text-align :center
                    color:#aeaeae        
                // input:last-of-type
                button
                    float :none
                    margin :0 auto
                    text-align :center
                    background-color :#ff017e
                    cursor :pointer
                    color:#fff
                    padding-left :0 
                    height:70px
                    line-height :70px
                    width:480px
                    border:none
                    font-size:22px

</style>
