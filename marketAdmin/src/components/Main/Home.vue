<template>
  <div class="Home">
    <div class="content-title">
      <div class="titlename">
        <span>系统首页</span>
      </div>
      <div class="titellink">
        <router-link :to="{path:'/company/edit'}">修改</router-link>
      </div>
  </div>
  <div class="content">
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
        <Form-item label="联系电话" class="text-left">
          <span v-text="companyinfo.companyTel"></span>
        </Form-item>
        <Form-item label="服务有效期" class="text-left">
          <span v-text="companyinfo.overDate"></span>
        </Form-item>
        <Form-item label="账户余额" class="text-left">
          <span v-text="companyinfo.companyBalance"></span>
          <a href="javascript:;" @click="weixinpayModal=true">充值</a>
        </Form-item>
        <Form-item label="短信消费数" class="text-left">
          <span v-text="companyinfo.smsNum"></span>
        </Form-item>
        <Form-item label="消费金额转积分" class="text-left">
          <span v-text="companyinfo.topointRate"></span>
        </Form-item>
        <Form-item label="积分抵扣现金" class="text-left">
          <span v-text="companyinfo.tocashRate"></span>
        </Form-item>
        <Form-item label="员工提成比" class="text-left">
          <span v-text="companyinfo.employeeRate"></span>
        </Form-item>
        <Form-item label="转发积分" class="text-left">
          <span v-text="companyinfo.sharePoints"></span>
        </Form-item>
         <Form-item label="转发次数" class="text-left">
          <span v-text="companyinfo.shareMax"></span>
        </Form-item>
    </Form>
  </div>
  <Modal
        v-model="weixinpayModal"
        title="账户充值">
        <weixinPay :wrapper="weixinpayModal"></weixinPay>
         <div slot="footer" class="text-left">
          <Icon type="ios-information-outline"></Icon>本平台通过微信充值
        </div>
    </Modal>
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
        companyBalance: 0,
        topointRate: 0,
        tocashRate: 0,
        employeeRate: 0,
        smsNum: 0,
        sharePoints: 0,
        shareMax: 1,
        overDate: '2017-12-30'
      },
      weixinpayModal: false
    }
  },
  created () {
    if (this.$store.state.companyId) {
      this.http.get('api/company/' + this.$store.state.companyId).then(res => {
        if (res.error === false) {
          if (res.result !== null) {
            this.companyinfo = res.result
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.companyinfo
  padding-top:20px
  .ivu-form-item
    margin-bottom:10px
    .companyavater
      width:60px
      height:auto
  .ivu-form-item-label
    padding:5px 12px 5px 0
</style>
