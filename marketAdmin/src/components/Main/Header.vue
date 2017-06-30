<template>
  <div class="header">
    <div class="header-content">
      <Row>
        <Col span="8" class="syslogo">
        </Col>
        <Col span="16" class="dropmenus">
         <Menu mode="horizontal" :active-name="1" v-if="$store.state.token">
           <Submenu name="1">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
                {{userInfo.company.companyName}}
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
        </Col>
      </Row>
    </div>
    <Modal
      v-model="changePassword"
      title="修改密码"
      @on-ok="ok"
      @on-cancel="cancel">
      <Input type="password" v-model="oldPass" placeholder="请输入旧密码" style="margin:10px 0;"></Input>
      <Input type="password" v-model="newPass" placeholder="请输入新密码"></Input>
    </Modal>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Header',
  props: ['userInfo'],
  data () {
    return {
      changePassword:false,
      oldPass:'',
      newPass:''
    }
  },
  methods: {
    ok () {
      this.http.put(this.$store.state.prefix + '/company/updateAccountPassword',{
        oldPassword:this.oldPass,
        newPassword:this.newPass
      }).then((res)=>{
        if(res.error == false){
          this.$Notice.success({title: '提醒', desc: '修改成功'})
        }else{
          this.$Notice.error({title: '错误', desc: res.msg})
        }
      });
      this.changePassword = false;
      this.oldPass = '';
      this.newPass = '';
    },
    cancel () {
      this.changePassword = false;
      this.oldPass = '';
      this.newPass = '';
    },
    loginOut () {
      this.$Notice.info({title: '提醒', desc: '退出登录成功'})
      this.$store.state.token=""
      this.util.delCookie("token")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus' rel="stylesheet/stylus">
.header-content
  width: 1000px
  height:60px
  margin-left: auto
  margin-right: auto
  .syslogo
    display:block
    height:60px
    background:url(/static/images/logo.png) no-repeat left
  .dropmenus
    .ivu-menu-horizontal
      height:57px
    .ivu-menu-submenu
      float:right
</style>
