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
      <Col span="10" class="account-wrapper">
        <div class="infoitems">
          <div class="infotitle">
            公司名称
          </div>
          <div class="infocontent">
          <div class="iccontent">
            <span v-text="companyinfo.companyName"></span>
          </div>
            
          </div>
        </div>
        <div class="infoitems">
          <div class="infotitle">
            账户有效期
          </div>
          <div class="infocontent">
          <div class="iccontent" v-text="companyinfo.expireDate + '(' + companyinfo.days +'天)'">
          </div>
          <div class="icaction">
            <Button type="text" @click="renewModal=true">续期</Button>
          </div>
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
              <div class="withdrawuser">
                <img :src="companyinfo.account.headImg" alt="">
               
              </div><span v-text="companyinfo.account.realName||companyinfo.account.nickName"></span>
            </div> 
            <div v-else>暂未设置</div>
          </Row>
            <Row>
              <Button type="error" size="small" @click="setBindUserModal()"><span v-text='companyinfo.openId?"更改":"设置"'></span>提现账户</Button>
            </Row>
            <Row style="height:200px;overflow:auto" v-if="employeeData.length>0">
             <Table border :columns="employeeColumn" :data="employeeData" class="employeetable" @on-row-click="updateOpenId"></Table>
             </Row>
          </div>
        </div>
       <!--  <div class="infoitems">
           <Table border :columns="employeeColumn" :data="employeeData" class="employeetable"></Table>
        </div> -->
      </Col>
      <Col span="14" class="withdrawlist">
        当前申请提现
        <Table highlight-row border :columns="withdrawColumns" :data="withdrawlist"></Table>
      <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
              <Page :total="queryinfo.total" :page-size="queryinfo.size" :current="queryinfo.current" @on-change="getWithDrawList"></Page>
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
      v-model="renewModal"
      title="账户续期">
      <renew :wrapper="'renewModal'" :company="companyinfo"></renew>
       <div slot="footer" class="text-left">
        <Icon type="ios-information-outline"></Icon>本平台通过微信支付
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
              <Input-number :max="20000" :min="1" v-model="withdrawMoney" style="width:100%" placeholder="输入提现金额" ></Input-number>
          </Col>
          <Col span="4">
               <Button type="success" @click="withDraw()">立即提现</Button>
          </Col>
          </Row>
          <Row style="text-align:center">
            账户余额=提现前余额 - 提现金额 ×（1+提现手续费）
          </Row>
          <Row style="text-align:center">
            {{parseFloat(companyinfo.balance-Number(withdrawMoney)*(1+rate/100)).toFixed(2)}}={{companyinfo.balance}} - {{Number(withdrawMoney)}}*(1+{{rate}}%)
          </Row>
      </div>
       <div slot="footer" class="text-left">
        <Icon type="ios-information-outline"></Icon>手续费为经过微信商户平台收取的手续费
      </div>
  </Modal>
</div>
</template>

<script type="text/ecmascript-6">
import weixinPay from '../Util/WeixinPay'
import renew from '../Util/Renew'
export default {
  components:{ weixinPay, renew},
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
      renewModal:false,
      weixinpayModal: false,
      binduserModal:false,
      withdrawModal: false,
      rate:this.$store.state.rate,//提现手续费
      employeeColumn:[
        {
           type: 'selection',
           width: 60,
           align: 'center'
        },
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
            return '<i-button type="text" size="small">选定</i-button>'
          }
        }
      ],
      employeeData:[],
      pager:{
        total: 1,
        current: 1
      },
      withdrawMoney:0,
      queryinfo:{
        companyId:this.util.getCookie("companyId"),
        withdrawType:'2',
        withdrawStatus:'2',
        current:1,
        size:12,
        total:1
      },
      withdrawColumns:[
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '收款人',
          key: 'realName',
          render(row){
            return row.realName||row.nickName
          }
        },
        {
          title: '金额',
          key: 'withdrawAmount',
          render(row){
            return '<p style="font-size:1.2em;color:red;font-weight:bold" v-text="row.withdrawAmount"></p>'
          }
        },
        {
          title: '手续',
          key: 'withdrawFactorage',
          width: 70
        },
        {
          title: '申请时间',
          key: 'applyDate'
        },
        {
          title: '预结算',
          key: 'dealDate',
          sortable: true
        },{
        title:'状态',
        key:'withdrawStatus',
        render(row){
          if(row.withdrawStatus==1){ 
            return "完成"
          }else {
            return '申请中'
          }
        }
        }
      ],
      withdrawlist:[]
    }
  },
  created () {
    if (this.$store.state.companyId) {
      this.getCompanyinfo()
      this.getWithDrawList()
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
      this.http.get(this.$store.state.prefix + '/customer/getCompanyUserInfo/' + (pageNo||1)+ "?pageSize=100&employee=1").then( res => {
        if(res.error === false){
          if(res.result){
            this.pager = res.result
            this.employeeData = []
            for(var obj of res.result.records){
              if(obj.employee === 1){
              this.employeeData.push(obj)
              }
            }
            //this.employeeData = res.result.records
          }
          
        }
      })
    },
    setBindUserModal () {
      this.binduserModal = true
      this.getEmployeeList(1)
    },
    updateOpenId (newdata,olddata) {
      if(!newdata){return}
      var params={
        accountId:newdata.accountId
      }
      this.http.put(this.$store.state.prefix +'/company/updateOpenId' , {accountId: newdata.accountId}).then(res => {
        if(res.error ===false) {
          this.$Message.info("设置成功");
          this.binduserModal=false
          this.getCompanyinfo()
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    withDraw() {
        if(this.companyinfo.balance-Number(this.withdrawMoney)*(1+this.rate/100) < 0) {
          this.$Message.error("提现金额过大,请重新修改金额再提现")
          return
        }
        this.http.post(this.$store.state.prefix + '/withdraw', {withdrawType:2,withdrawAmount:this.withdrawMoney,companyId:this.util.getCookie("companyId")}).then(res => {
          if(res.error === false) {
            this.$Message.info("提现请求已发送")
            this.getCompanyinfo()
            this.withdrawModal=false
            this.withdrawMoney = 0
          } else {
            this.$Message.error(res.msg)
          }
        })
    },
    getWithDrawList(pageno){
      if(!isNaN(pageno)){
        this.queryinfo.current=pageno
      }else{
        this.queryinfo.current=1
      }
      var param=JSON.parse(JSON.stringify(this.queryinfo))
      if(!param.companyId){
        this.$Message.error("请先选择查询的公司")
        return
      }
      delete param.companyName
      this.http.get(this.$store.state.prefix+"/operate/getCompanyWithdrawInfo/"+param.current+"?a=1"+this.util.parseParam(param)).then(res=>{
        if(res.error==false){
          this.queryinfo.current=res.result.current
          this.queryinfo.total=res.result.total
          this.queryinfo.size=res.result.size
          res.result.records.forEach((item)=>{
            item.dealDate=item.dealDate?this.util.getFormatDate(item.dealDate,1):''
            item.applyDate=item.applyDate?this.util.getFormatDate(item.applyDate,1):''
            item.successDate=item.successDate?this.util.getFormatDate(item.successDate,1):''
          })
          this.withdrawlist=res.result.records
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
    display:flex
    .iccontent
      flex:2
      text-align:left
    .icaction
      flex:1
      text-align:center
.withdrawuser
  width:60px
  height:60px
  overflow:hidden
  img
    width:100%
    border-radius:5px
</style>
