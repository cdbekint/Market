<template>
  <div class="Home">
   <!--  <div class="content-title">
      <div class="titlename">
        <span>系统首页</span>
      </div>
      <div class="titellink">
        <router-link :to="{path:'/company/edit'}">修改</router-link>
      </div>
  </div> -->
  <div class="content">
    <Tabs value="basic">
        <Tab-pane label="基础信息" name="basic">
          
          <Form :model="companyinfo" :label-width="100" class="companyinfo">
            <Form-item label="公司名称" class="text-left">
              <span v-text="companyinfo.companyName"></span>
            </Form-item>
            <Form-item label="公司logo" class="text-left">
              <img :src="murl+companyinfo.companyLogo" alt="" v-if="companyinfo.companyLogo" class="companyavater">
            </Form-item>
            <Form-item label="公司简介" class="text-left">
              <span v-text="companyinfo.companyDesc"></span>
            </Form-item>
          <Form-item label="公司地址" class="text-left">
            <span v-text="companyinfo.companyAddr"></span>
          </Form-item>
            <Form-item label="联系电话" class="text-left">
              <span v-text="companyinfo.companyTel"></span>
            </Form-item>
           <Form-item label="账户过期时间" class="text-left">
            <span v-text="companyinfo.expireDate"></span>
          </Form-item>
          <Form-item label="公司宣传页面" class="text-left">
            <div v-html="companyinfo.show" class="richtext"></div>
          </Form-item>
        </Form>
        </Tab-pane>
        <Tab-pane label="积分规则" name="pointrule">标签二的内容</Tab-pane>
        <Tab-pane label="系统开关配置" name="sysgear">标签三的内容</Tab-pane>
        <Tab-pane label="账户中心" name="account">标签四的内容</Tab-pane>
    </Tabs>
    
  </div>
<!--  <Modal
        v-model="weixinpayModal"
        title="账户充值">
        <weixinPay :wrapper="weixinpayModal"></weixinPay>
         <div slot="footer" class="text-left">
          <Icon type="ios-information-outline"></Icon>本平台通过微信充值
        </div>
    </Modal>-->
  </div>

</template>

<script type="text/ecmascript-6">
import weixinPay from '../Util/WeixinPay'
export default {
  name: 'Home',
  components: {weixinPay},
  data () {
    return {
      companyinfo: {
        companyName: '',
        companyDesc: '',
        companyTel: '',
        companyLogo: '',
        smsTel:'',
        toCashRate: 0,
        employeeRate: '',
        sharePoints:0,
        shareMax: 1,
        registerMoney:0,
        registerPoints:0,
        selfReturn:0,
        oneReturn:0,
        secondReturn:0,
        overDate: '2017-12-30'
      },
      Group: [
        {
          mans: '',
          discount: ''
        }
      ],
      weixinpayModal: false
    }
  },
  created () {
    if (this.$store.state.companyId) {
      this.http.get(this.$store.state.prefix + '/company/' + this.$store.state.companyId).then(res => {
        if (res.error === false) {
          if (res.result !== null) {
            this.companyinfo = res.result
            this.companyinfo.expireDate = this.util.getFormatDate(this.companyinfo.expireDate)
            this.companyinfo.show = this.util.escapeToHtml(this.companyinfo.show)

            this.Group = JSON.parse(this.companyinfo.employeeRate.replace(/&quot;/g,'"'));
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.companyinfo
  font-size 40px
  padding-top:20px
  .ivu-form-item-label
    color red
    width 200px
    text-align center
    padding:5px 12px 5px 0
  .ivu-form-item
    margin-bottom:10px
    .companyavater
      width:60px
      height:auto
.richtext
  p
    img
      width:100%
</style>
