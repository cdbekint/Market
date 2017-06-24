<template>
<div class="accountinfo">
	<div class="content-title">
      <div class="titlename">
      	<span>账户信息</span>
      </div>
      <div class="titellink">

      </div>
 	</div>
 	<div class="content">
    <Row>
      <Col span="12" class="account-wrapper">
        <div class="infoitems">
          <div class="infotitle">
            公司名称
          </div>
          <div class="infocontent">
            <span v-text="companyinfo.companyName"></span>
          </div>
        </div>
        <div class="infoitems">
          <div class="infotitle">
            账户有效期
          </div>
          <div class="infocontent">
            <span v-text="companyinfo.expireDate + '(' + companyinfo.days +'天)'"></span>
          </div>
        </div>
        <div class="infoitems">
          <div class="infotitle">
            账户余额
          </div>
          <div class="infocontent">
          <Row>
            <span v-text="companyinfo.balance"></span>元
          </Row>
          <Row>
            <Button type="success" size="small" @click="weixinpayModal=true">账户充值</Button>
            <Button type="info" size="small" @click="withdrawModal=true">账户提现</Button>
          </Row>
          </div>
        </div>
        <div class="infoitems">
          <div class="infotitle">
            提现账户
          </div>
          <div class="infocontent">
          <Row>
            <div class="ownavater" v-if="companyinfo.openId">
              <img src="" alt="">
            </div>
            <div v-else>暂未设置</div>
          </Row>
            <Row>
              <Button type="error" size="small" @click="setBindUserModal()"><span v-text='companyinfo.openId?"更改":"设置"'></span>提现账户</Button>
            </Row>
            <!-- <Row style="height:200px;overflow:auto">
             <Table border :columns="employeeColumn" :data="employeeData" class="employeetable"></Table>
             </Row> -->
          </div>
        </div>
      </Col>
    </Row>
 	</div>
  <Modal
      v-model="weixinpayModal"
      title="账户充值">
      <weixinPay :wrapper="'weixinpayModal'" :company="companyinfo"></weixinPay>
       <div slot="footer" class="text-left">
        <Icon type="ios-information-outline"></Icon>本平台通过微信充值
      </div>
  </Modal>
  <Modal
      v-model="withdrawModal"
      title="账户提现">
      <div class="modal-content">
          <Row>
          <Col span="8" offset="8" style="font-size:1.5em">
            当前账户余额: <span v-text="companyinfo.balance"></span>
          </Col>
              
          </Row>
          <Row>
           <Col span="8" offset="8" style="font-size:1.5em">
              <Input-number :max="2000" :min="1" v-model="withdrawMoney" style="width:100%" placeholder="输入提现金额" ></Input-number>
          </Col>
          <Col span="4">
               <Button type="success" @click="withDraw()">立即提现</Button>
          </Col>
          </Row>
          <Row style="text-align:center">
            账户余额=提现前余额 - 提现金额 ×（1+提现手续费）

          </Row>
          <Row style="text-align:center">
            {{companyinfo.balance-Number(withdrawMoney)*(1+rate/100)}}={{companyinfo.balance}} - {{Number(withdrawMoney)}}*(1+{{rate}}%)
          </Row>
      </div>
       <div slot="footer" class="text-left">
        <Icon type="ios-information-outline"></Icon>手续费为经过微信商户平台收取的手续费
      </div>
  </Modal>
  <Modal
    v-model="binduserModal"
      title="绑定提现账户" name="binduser">
        <div>
          <Table border :columns="employeeColumn" :data="employeeData" class="employeetable"></Table>
          <div style="margin: 10px;overflow: hidden">
              <div style="float: right;"> 
                  <Page :total="pager.total" :current="pager.current" @on-change="getEmployeeList(pager.current)"  size="small"></Page>
              </div>
          </div>
        </div>
       <div slot="footer" class="text-left">
        <Icon type="ios-information-outline"></Icon>通过选取员工列表
      </div>
    
  </Modal>
</div>
</template>

<script type="text/ecmascript-6">
import weixinPay from '../Util/WeixinPay'
export default {
  components:{ weixinPay },
  name: 'AccountInfo',
  data () {
    return {
      companyinfo: {
        companyName: '',
        days: 0,
        expireDate: this.util.getFormatDate(new Date()),
        balance: 0,
        openId: ''
      },
      Group: [],
      weixinpayModal: false,
      binduserModal:false,
      withdrawModal: false,
      rate:3.6,
      employeeColumn:[
        {
          title: '昵称',
          key: 'nickName',
          render (row) {
            if (row.realName) {
              return row.realName
            } else {
              return row.nickName
            }
          }
        },
        {
          title: '头像',
          key: 'headImg',
          render (row) {
            return '<img :src="row.headImg" v-if="row.headImg" style="width:40px;height:40px" alt="">'
          }
        },
        {
          title: '操作',
          key: 'action',
          render (row) {
            return '<i-button type="text" size="small" @click="updateOpenId(row.accountid)">选定</i-button>'
          }
        }
      ],
      employeeData:[],
      pager:{
        total: 1,
        current: 1
      },
      withdrawMoney:0
    }
  },
  created () {
    if (this.$store.state.companyId) {
      this.getCompanyinfo()
    }
  },
  methods: {
    getCompanyinfo () {
      this.http.get(this.$store.state.prefix + '/company/' + this.$store.state.companyId).then(res => {
        if (res.error === false) {
          if (res.result !== null) {
            this.companyinfo = res.result
            this.companyinfo.days=~~((this.companyinfo.expireDate-new Date().getTime())/1000/3600/24)
            this.companyinfo.expireDate = this.util.getFormatDate(this.companyinfo.expireDate)
            this.Group = JSON.parse(this.companyinfo.employeeRate.replace(/&quot;/g,'"'))
          }
        }
      })
    },
    getEmployeeList (pageNo) {
      this.http.get(this.$store.state.prefix + '/customer/getCompanyUserInfo/' + pageNo||1,{pageNo:10}).then( res => {
        if(res.error === false){
          if(res.result){
            this.pager = res.result
            this.employeeData = res.result.records
          }
          
        }
      })
    },
    setBindUserModal () {
      this.binduserModal = true
      this.getEmployeeList(1)
    },
    updateOpenId (accountid) {
      console.log(accountid)
      this.http.put(this.$store.state.prefix +'/company/updateOpenId' ,{accountId: accountid}).then(res => {
        if(res.error ===false) {
          this.$Message.info("设置成功");
          this.binduserModal=false
          this.getCompanyinfo()
        }
      })
    },
    withDraw() {
        if(this.companyinfo.balance-Number(this.withdrawMoney)*(1+this.rate/100) < 0) {
          this.$Message.error("提现金额过大,请重新修改金额再提现")
          return
        }
        this.http.post(this.$store.state.prefix + '/withdraw', {withdrawType:2,withdrawAmount:this.withdrawMoney}).then(res => {
          if(res.error === false) {
            this.$Message.info("提现请求已发送")
            this.getCompanyinfo()
            this.withdrawModal=false
            this.withdrawMoney = 0
          }
        })
    }
  }
}
</script>

<style  lang='stylus' rel="stylesheet/stylus">
.account-wrapper
  border:1px solid #eee
  margin:10px 0px
  border-radius:5px
  min-height:300px
.infoitems
  width:100%
  display:flex
  padding:10px
  .infotitle
    width:20%
    text-align:center
    font-size:1.1em
    font-weight:bold
  .infocontent
    text-align:left
    flex:1
</style>
