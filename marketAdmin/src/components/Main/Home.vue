<template>
  <div class="Home">
   <!--  <div class="content-title">
      <div class="titlename">
        <span>系统首页</span>
      </div>
      <div class="titellink">
        
      </div>
  </div> -->
  <div class="content">
    <Tabs :value="tabs">
        <Tab-pane label="企业信息" name="basic">
          <Row>
            <Col class="text-right"><router-link :to="{path:'/company/edit',query:{type:1,name:'basic'}}">修改</router-link></Col>
          </Row>
          <Row>
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
          </Row>
          <Row>
            
          </Row>
        </Tab-pane>
        <Tab-pane label="积分规则" name="pointrule">
          <Row>
            <Col class="text-right"><router-link :to="{path:'/company/edit',query:{type:2,name:'pointrule'}}">修改</router-link></Col>
          </Row>
          <Row>
          <div class="companyinfo pointrule-wrapper">
            <div class="pointrule-table">
              <ul>
                <li>
                  <div class="flex1">
                    名称
                  </div>
                  <div class="flex1">值</div>
                  <div class="flex1">备注</div>
                </li>
              </ul>
            </div>
          </div>
            <Form :model="companyinfo" :label-width="100" class="companyinfo">
                <Form-item label="积分折现比" class="text-left">
                  <span v-text="companyinfo.toCashRate+'%（100积分折算人民币为:'+companyinfo.toCashRate+'元）'"></span>
                </Form-item>
                <Form-item label="分享赠送积分" class="text-left">
                  <span v-text="companyinfo.sharePoints+'分（客户每天分享朋友圈每次可获得积分）'"></span>
                </Form-item>
                <Form-item label="分享朋友圈次数" class="text-left">
                  <span v-text="companyinfo.shareMax+'次（客户每天分享朋友圈最大计分次数）'"></span>
                </Form-item>
                <Form-item label="会员注册金额" class="text-left">
                  <span v-text="companyinfo.registerMoney+'元'"></span>
                </Form-item>
                <Form-item label="注册返还积分" class="text-left">
                  <span v-text="companyinfo.registerPoints+'分（折算人民币:'+(companyinfo.toCashRate?(companyinfo.registerPoints*companyinfo.toCashRate/100):'0')+'元）'"></span>
                </Form-item>
               <Form-item label="邀请注册返积分" class="text-left">
                <span v-text="companyinfo.invitedPoints + '分（折算人民币:'+(companyinfo.toCashRate?(companyinfo.invitedPoints*companyinfo.toCashRate/100):'0')+'元）'"></span>
                </Form-item>
                 <Form-item label="自己消费积分返还比率" class="text-left">
                  <span v-text="companyinfo.selfReturn +'%（客户自己消费100元，返还'+companyinfo.selfReturn+'分）'"></span>
                </Form-item>
                <Form-item label="一级邀请人返还积分比率" class="text-left">
                  <span v-text="companyinfo.oneReturn +'%（客户消费100元，一级邀请人返还'+companyinfo.oneReturn+'分）'"></span>
                </Form-item>
               <Form-item label="二级邀请人返还积分比率" class="text-left">
                <span v-text="companyinfo.secondReturn +'%（客户消费100元，二级邀请人返还'+companyinfo.secondReturn+'分）'"></span>
                </Form-item>
            </Form>
          </Row>

        </Tab-pane>
        <Tab-pane label="系统配置" name="sysgear">
          <Row>
            <Col class="text-right"><router-link :to="{path:'/company/edit',query:{type:3,name:'sysgear'}}">修改</router-link></Col>
          </Row>
          <Row>
             <Form :model="companyinfo" :label-width="100" class="companyinfo">
                <Form-item label="短信通知" class="text-left">
                  <span v-text="(companyinfo.openSms==1?'已打开':'关闭')+'（客户注册，消费，一级二级积分返还的通知；不影响提现等必要通知）'"></span>
                  <p>同一手机号码接收支持1条/分钟，5条/小时，10条/天</p>
                </Form-item>
                <Form-item label="短信通知号码" class="text-left">
                  <span v-text="companyinfo.smsTel"></span>
                </Form-item>
                <Form-item label="用户提现限额" class="text-left">
                  <span v-text="companyinfo.withdrawLimit+'元（超过此限额，需商家审核后才能提现）'"></span>
                </Form-item>
                <Form-item label="员工提成比例" class="text-left">
                  <p v-for="ce in companyinfo.employeeRate" v-if="companyinfo.employeeRate"><span v-text="'大于'+ce.mans+'元业绩，提成比例为:'+ce.discount+'%'"></span></p>
                </Form-item>
            </Form>
          </Row>
        </Tab-pane>
        <Tab-pane label="账户中心" name="account">
           <Row>
             <Form :label-width="100" class="companyinfo">
                <Form-item label="会员类型" class="text-left">
                  <span v-text="companyinfo.companyFlag==1?'正式会员':'体验会员'" class="memberstatus"></span>
                </Form-item>
                <Form-item label="企业认证" class="text-left">
                  <router-link :to="{path:'/authentic'}" v-if="companyinfo.authentic==0">待认证，去认证</router-link>
                  <span v-if="companyinfo.authentic==1"><Icon type="ios-checkmark-outline" size="20" color="#44b549"></Icon>认证成功</span>
                  <span v-if="companyinfo.authentic==2"><Icon type="ios-clock" size="20"></Icon>提交成功，待审核</span>
                  <router-link :to="{path:'/authentic'}" v-if="companyinfo.authentic==3"><Icon type="alert-circled" size="20"></Icon>审核未通过，重新提交</router-link>
                </Form-item>
                <Form-item label="账户余额" class="text-left">
                  <span v-text="companyinfo.balance+'元'"></span>
                </Form-item>
                <!-- <Form-item label="账户邀请码" class="text-left">
                   <span v-text="companyinfo.selfInvitationCode" v-if="companyinfo.authentic==1" style="font-size:1.2em;font-weight:bolder;color:red"></span><span v-if="companyinfo.authentic!=1">通过企业认证获得邀请码</span>（邀请企业注册并认证成功即可获得30天账户有效期）
                </Form-item> -->
                <Form-item label="账户有效期" class="text-left">
                   <span v-text="companyinfo.expireDate+'('+companyinfo.expireDays+'天)'"></span>
                </Form-item>

            </Form>
           
          </Row>
          <Row>
            <Col span="24" class="accountbalance">
              <Col span="12" class="accountwrapper withdrawinfo">
                <div class="accountcontent withdrawinfocontent">
                  <div class="flex2 currentwithdrawuser">
                      <div class="flex1">
                        <img :src="companyinfo.account.headImg" class="withdrawuser" v-if="companyinfo.account&&companyinfo.account.headImg">
                      </div>
                      <div class="flex2">
                        <div class="currentinfo">
                          <p v-text="companyinfo.account.realName||companyinfo.account.nickName"></p>
                          <p v-text="companyinfo.account.phone"></p>
                        </div>
                        <Button type="primary" @click="setBindUserModal()">更换当前提现账户</Button>
                      </div>
                  </div>
                  <div class="flex1 rightcontent">
                    <div class="upcontent balance">
                      <span v-text="~~companyinfo.balance"></span>元
                    </div>
                    <div class="downcontent">
                        <Button type="warning" @click="withdrawModal=true">代收提现</Button>
                    </div>
                  </div>
                </div>
                
              </Col>
              <Col span="6" class="accountwrapper chargeinfo">
                <div class="accountcontent chargeinfocontent">
                    <div class="flex1">
                      <div style="width:100%;height:60px;line-height:60px;font-size:1.5em;color:#EB8265;text-align:center;font-weight:bolder">
                      <span v-text="companyinfo.expireDays"></span>天
                      </div>
                      <div style="width:100%;height:40px;line-height:40px">账户有效天</div>
                    </div>
                    <div class="flex1" style="line-height:100px">
                      <Button type="success" @click="renewModal=true">账户续期</Button>
                    </div>
                </div>
              </Col>
              <Col span="6" class="accountwrapper renewinfo">
                <div class="accountcontent renewinfocontent">
                  <div class="flex1">
                      <div style="width:100%;height:60px;line-height:60px;font-size:1.5em;color:#A7CD60;text-align:center;font-weight:bolder">
                      <span v-text="~~companyinfo.mbBalance"></span>元
                      </div>
                      <div style="width:100%;height:40px;line-height:40px">账户余额</div>
                    </div>
                    <div class="flex1" style="line-height:50px">
                      <Button type="info" @click="weixinpayModal=true">账户充值</Button>
                       <Button type="warning" @click="weixinpayModal=true">账户提现</Button>
                    </div>
                </div>
              </Col>
            </Col>
          </Row>
          <Row>
          <Col span="24" class="accountbalance">
          <h4>提现申请记录</h4>
             <Table highlight-row border :columns="withdrawColumns" :data="withdrawlist"></Table>
              <div style="margin: 10px;overflow: hidden">
                  <div style="float: right;">
                      <Page :total="queryinfo.total" :page-size="queryinfo.size" :current="queryinfo.current" @on-change="getWithDrawList"></Page>
                  </div>
              </div>
            </Col>
          </Row>
        </Tab-pane>
    </Tabs>
    
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
      v-model="binduserModal"
      title="设置提现账户" >
      <Table highlight-row border :columns="employeeColumn" :data="employeeData" @on-row-click="updateOpenId"></Table>
      <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
              <Page :total="pager.total" :page-size="pager.size" :current="pager.current" @on-change="getEmployeeList"></Page>
          </div>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  <Modal
      v-model="withdrawModal"
      title="账户提现">
      <div class="modal-content">
          <Row>
          <Col span="8" offset="8" style="font-size:1.5em">
            当前代收余额: <span v-text="companyinfo.balance">元</span>
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
            <p>账户余额=提现前余额 - 提现金额,单笔最大提现金额为20000</p> 
            {{parseFloat(companyinfo.balance-Number(withdrawMoney)).toFixed(2)}}={{companyinfo.balance}} - {{Number(withdrawMoney)}}
            

          </Row>
          <Row style="text-align:center">
           <p>到账金额=提现金额（1-手续费）</p>
           {{parseFloat(Number(withdrawMoney)*(1-rate/100)).toFixed(2)}}={{Number(withdrawMoney)}}*(1-{{rate}}%)
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
  name: 'Home',
  components:{ weixinPay, renew},
  data () {
    return {
      tabs:'basic',
      weixinpayModal: false,
      binduserModal:false,
      withdrawModal: false,
      renewModal:false,
      rate:this.$store.state.rate,//提现手续费
      companyinfo: {
        account:{
          realName:'',
          nickName:'',
          headImg:'',
          phone:''
        },
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
      weixinpayModal: false,
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
    var query = this.util.getQuery(location.hash);
    this.tabs=query.name
    this.getWithDrawList()
    if (this.$store.state.companyId) {
      this.getCompanyinfo()
    }
  },
  methods:{
    getCompanyinfo () {
      this.http.get(this.$store.state.prefix + '/company/' + this.$store.state.companyId).then(res => {
        if (res.error === false) {
          if (res.result !== null) {
            var tmp=res.result
            //判断是否具有提现账户信息，没有就设置account信息。
            if(tmp.account==undefined){
              tmp.account={
                realName:'',
                nickName:'',
                headImg:'',
                phone:''
              }
            }
            res.result.employeeRate=tmp.employeeRate?JSON.parse(res.result.employeeRate):[]
            this.companyinfo = tmp
            this.companyinfo.expireDays=~~((this.companyinfo.expireDate-Date.now())/1000/3600/24)
            this.companyinfo.expireDate = this.util.getFormatDate(this.companyinfo.expireDate)
            this.companyinfo.show = this.util.escapeToHtml(this.companyinfo.show)
            this.Group = this.companyinfo.employeeRate
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
            this.getWithDrawList()
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
  .pointrule-table
    width:60%
    ul
      padding:0px
      li
        display:flex

.richtext
  min-height:200px
  border:1px solid #ccc
  border-radius:5px
  p
    img
      width:100%
.memberstatus
  padding:3px 10px
  background:#44b549
  color:#fff
  border-radius:3px
.accountbalance
  border-top:1px solid #ccc
  margin-top:10px

.accountbalance
  padding-top:10px
  .accountwrapper
    padding:0px 10px
    .accountcontent
      height:100px
      border-radius:5px
      border:1px solid #ccc
      display:flex
.currentwithdrawuser
  display:flex
  .currentinfo
    width:100%
    height:60px
    font-size:1.1em
    text-align:left
    padding:5px
.withdrawuser
  width:80px
  height:auto
  max-height:100px
  margin-top: 10px
  border-radius:5px

.rightcontent
  border-left:1px solid #ccc
  .balance
    line-height:60px
    font-size:1.3em
    color:red
    font-weight:bolder
  .upcontent
    height:60px
  .downcontent
    height:40px
</style>
