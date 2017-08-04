<template>
  <div class="dashboard">
  <Row class="infos">
    <Col span="12">
      <div class="infocontanier">
        <div class="infoleft">
        </div>
        <div class="inforight cyan">
        <div class="flex1">
        	今日收入:{{baseinfo.income}}元

        </div>
        <div class="flex1">自主账户收入：{{companyinfo.mcBalance}}元<Tooltip placement="top" content="收入已入帐到您的微信商户平台">
              <Icon type="ios-help-outline" size="20"></Icon>
          </Tooltip></div>
          
        </div>
      </div>
    </Col>
    <Col span="12">
      <div class="infocontanier">
       <div class="inforight cyan">
          <div class="flex1">
          	代收余额:{{companyinfo.balance}}元
          	<Tooltip placement="top" content="收入由服务提供商代收，可提现">
			       	<Icon type="ios-help-outline" size="20"></Icon>
			    </Tooltip>
          </div>
          <div class="flex1 operatebtn">
          	<a href="javascrpit:;" @click="withdrawModal=true">代收提现</a>
          </div>
        </div>
         <div class="infoleft">
        </div>
        
      </div>
    </Col>
    <Col span="24">
      <div class="infocontanier">
      <div class="infoleft">
       </div>
       <div class="inforight cyan">
          <div class="flex1">
          	账户余额：{{companyinfo.mbBalance}}元
            <Tooltip placement="top" content="用于客户提现">
              <Icon type="ios-help-outline" size="20"></Icon>
          </Tooltip>
          </div>
          <div class="flex1">
          	客户已提现:{{baseinfo.userWithdraw}}元
          </div>
          <div class="flex1">
          	今日注册:{{baseinfo.newCustomerNum}}人
          </div>
          <div class="flex1">
            <a href="javascrpit:;" @click="weixinpayModal=true">余额充值</a>
          	  <!-- 提现 -->
          </div>
        </div>
      </div>
    </Col>
     <Col span="24">
      <div class="infocontanier">
      <div class="infoleft">
       </div>
       <div class="inforight thinred">
          <div class="flex3">
          	帐户有效期:{{util.getFormatDate(companyinfo.expireDate)}}({{~~((new Date(companyinfo.expireDate).getTime()-Date.now())/1000/3600/24)}}天)
          </div>
          <div class="flex1">
          	<span v-if="companyinfo.companyFlag==1">正式会员</span>
            <a href="javascrpit:;" v-else @click="renewModal=true">续费成为正式会员</a>
          </div>
          <div class="flex1">
            <span v-if="companyinfo.authentic==1">企业认证</span>
            <router-link :to="{path:'/authentic'}" v-else>去进行企业认证</router-link>
          </div>
          <div class="flex1">
            <a href="javascrpit:;" @click="renewModal=true">续费</a>
          	
          </div>
        </div>
      </div>
    </Col>

  </Row>
  <Row class="datas">
  		<Col span="6" class="infoitem">
	  		<div class="realinfo yellow">
	  			<div class="contenttitle">
	  				<div class="symbol">
	  					<Icon type="cash"></Icon>
	  				</div>
	  				<div class="title">
	  					<span>今日收入</span>
	  				</div>
	  			</div>

	  			<div class="contentval" v-text="baseinfo.income">

	  			</div>
	  		</div>
  		</Col>
      <Col span="6" class="infoitem">
      <div class="realinfo yellow">
        <div class="contenttitle">
          <div class="symbol">
            <Icon type="social-yen"></Icon>
          </div>
          <div class="title">
            <span>账户余额</span>
          </div>
        </div>

        <div class="contentval" v-text="~~baseinfo.balance">

        </div>
      </div>

      </Col>
  		<Col span="6" class="infoitem">
	  		<div class="realinfo orange">
	  			<div class="contenttitle">
	  				<div class="symbol">
	  					<Icon type="cash"></Icon>
	  				</div>
	  				<div class="title">
	  					<span>商家正在提现</span>
	  				</div>
	  			</div>

	  			<div class="contentval" v-text="Math.abs(baseinfo.withDrawAmount)">

	  			</div>
	  		</div>
  		</Col>


  		<Col span="6" class="infoitem">
  		<div class="realinfo orange">
  			<div class="contenttitle">
  				<div class="symbol">
            <Icon type="ios-pie-outline"></Icon>
  				</div>
  				<div class="title">
  					<span>会员已提现</span>
  				</div>
  			</div>

  			<div class="contentval" v-text="baseinfo.userWithdraw">

  			</div>
  		</div>

  		</Col>

  		<Col span="6" class="infoitem">
  		<div class="realinfo thinred">
  			<div class="contenttitle">
  				<div class="symbol">
  					<Icon type="person"></Icon>
  				</div>
  				<div class="title">
  					<span>客户总数</span>
  				</div>
  			</div>

  			<div class="contentval" v-text="baseinfo.customerNum">

  			</div>
  		</div>

  		</Col>
  		<Col span="6" class="infoitem">
  		<div class="realinfo thinred">
  			<div class="contenttitle">
  				<div class="symbol">
  				<Icon type="person-add"></Icon>
  				</div>
  				<div class="title">
  					<span>今增客户</span>
  				</div>
  			</div>

  			<div class="contentval" v-text="baseinfo.newCustomerNum">

  			</div>
  		</div>

  		</Col>
  		<Col span="6" class="infoitem">
  		<div class="realinfo green">
  			<div class="contenttitle">
  				<div class="symbol">
  					<Icon type="ios-person-outline"></Icon>
  				</div>
  				<div class="title">
  					<span>会员总数</span>
  				</div>
  			</div>

  			<div class="contentval" v-text="baseinfo.memNum">

  			</div>
  		</div>

  		</Col>

  		<Col span="6" class="infoitem">
  		<div class="realinfo green">
  			<div class="contenttitle">
  				<div class="symbol">
  					<Icon type="ios-personadd-outline"></Icon>
  				</div>
  				<div class="title">
  					<span>今增会员</span>
  				</div>
  			</div>

  			<div class="contentval" v-text="baseinfo.newMemNum">

  			</div>
  		</div>

  		</Col>
  	</Row>
    <Row class="datas">
      <Col span="6" class="infoitem">
      <div class="realinfo purple">
        <div class="contenttitle">
          <div class="symbol">
            <Icon type="ios-personadd-outline"></Icon>
          </div>
          <div class="title">
            <span>会员积分</span>
          </div>
        </div>

        <div class="contentval" v-text="baseinfo.allWithdrawPoints">

        </div>
      </div>

      </Col>
      <Col span="6" class="infoitem">
      <div class="realinfo purple">
        <div class="contenttitle">
          <div class="symbol">
            <Icon type="ios-personadd-outline"></Icon>
          </div>
          <div class="title">
            <span>会员准备金</span>
          </div>
        </div>

        <div class="contentval" v-text="~~(baseinfo.allWithdrawPoints*baseinfo.toCashRate/100)">

        </div>
      </div>

      </Col>
      <Col span="6" class="infoitem">
      <div class="realinfo cyan">
        <div class="contenttitle">
          <div class="symbol">
            <Icon type="ios-personadd-outline"></Icon>
          </div>
          <div class="title">
            <span>客户积分</span>
          </div>
        </div>

        <div class="contentval" v-text="baseinfo.allPoints-baseinfo.allWithdrawPoints">

        </div>
      </div>

      </Col>
       <Col span="6" class="infoitem">
      <div class="realinfo cyan">
        <div class="contenttitle">
          <div class="symbol">
            <Icon type="ios-personadd-outline"></Icon>
          </div>
          <div class="title">
            <span>客户准备金</span>
          </div>
        </div>

        <div class="contentval" v-text="~~((baseinfo.allPoints-baseinfo.allWithdrawPoints)*baseinfo.toCashRate/100)">

        </div>
      </div>

      </Col>
    </Row>
    <Row>
      <div id="echartzone" class="echartwrapper" style="height:400px;width:100%">
      </div>
    </Row>
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
  name: 'Dashboard',
  components:{ weixinPay, renew},
  data () {
    return {
      weixinpayModal: false,
      binduserModal:false,
      withdrawModal: false,
      renewModal:false,
      rate:this.$store.state.rate,
      withdrawMoney:1,
      companyinfo: {
        account:{
          realName:'',
          nickName:'',
          headImg:'',
          phone:''
        },
        balance:0,
        mbBalance:0,
        mcBalance:0,
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
    	baseinfo:{
				balance:0,
				customerNum:0,
				income:0,
				memNum:0,
				newCustomerNum:0,
				newMemNum:0,
				withDrawAmount:0
    	},
      echarts:{},
      myChart:{}
    }
  },
  created () {
    if (this.$store.state.companyId) {
      this.getCompanyinfo()
    }
  	this.getBaseInfo()
    this.getPayTend()

  },
  mounted(){
  this.echarts = require('echarts');
  this.myChart = this.echarts.init(document.getElementById('echartzone'));
  },
  methods:{
  	getBaseInfo(){
  		this.http.get(this.$store.state.prefix+"/company/getBaseInfo?companyId="+this.util.getCookie("companyId")).then(res=>{
  			if(res.error === false){
  				this.baseinfo=res.result
  			}
  		})
  	},
    getCompanyinfo () {
      this.http.get(this.$store.state.prefix + '/company/' + this.$store.state.companyId).then(res => {
        if (res.error === false) {
          if (res.result !== null) {

            //判断是否具有提现账户信息，没有就设置account信息。
            if(res.result.account==null){
              res.reuslt.account={
                realName:'',
                nickName:'',
                headImg:'',
                phone:''
              }
            }
            res.result.employeeRate=res.result.employeeRate?JSON.parse(res.result.employeeRate):[]
            this.companyinfo = res.result
            this.companyinfo.expireDays=~~((this.companyinfo.expireDate-Date.now())/1000/3600/24)
            this.companyinfo.expireDate = this.util.getFormatDate(this.companyinfo.expireDate)
            this.companyinfo.show = this.util.escapeToHtml(this.companyinfo.show)
            this.Group = this.companyinfo.employeeRate
          }
        }
      })
    },withDraw() {
        if(this.companyinfo.balance-Number(this.withdrawMoney) < 0) {
          this.$Message.error("提现金额过大,请重新修改金额再提现")
          return
        }
        this.http.post(this.$store.state.prefix + '/withdraw', {withdrawType:2,withdrawAmount:this.withdrawMoney,companyId:this.util.getCookie("companyId")}).then(res => {
          if(res.error === false) {
            this.$Notice.info({title:"请求已发送",desc:"请求已发送到服务商，正在快速审核中"})
            this.getCompanyinfo()
            this.withdrawModal=false
            this.withdrawMoney = 0
          } else {
            this.$Message.error(res.msg)
          }
        })
    },
    getPayTend(){
      var param={
        companyId:this.util.getCookie("companyId"),
        startDate:this.util.getFormatDate(this.util.getDate(new Date())+' 00:00:00'),
        endDate:this.util.getFormatDate(),
        payStatus:1,
        queryType:1//1为小时，2为每天
      }
      this.http.get(this.$store.state.prefix+'/pay/getPayTend?a=1'+this.util.parseParam(param)).then(res=>{
        if(res.error==false){
          if(res.result.length==0){return}
          var xData=[],yData=[]
          for(var i in res.result){
            xData.push(res.result[i].hour+'点')
            yData.push(res.result[i].allAmount)
          }
          var option = {
              title: {
                  text: '今日收益走势图',
                  subtext: '总收入'
              },
              tooltip: {
                  trigger: 'axis'
              },
              toolbox: {
                  show: true,
                  feature: {
                      dataView: {readOnly: false},
                      magicType: {type: ['line', 'bar']},
                      saveAsImage: {}
                  }
              },
              xAxis:  {
                  type: 'category',
                  boundaryGap: false,
                  data: xData,
                  axisLabel: {
                      formatter: '{value}'
                  }
              },
              yAxis: {
                  type: 'value',
                  axisLabel: {
                      formatter: '{value}元'
                  }
              },
              series: [
                  {
                      name:'收益金额',
                      type:'line',
                      data:yData,
                      markPoint: {
                          data: [
                              {type: 'max', name: '最大值'},
                              {type: 'min', name: '最小值'}
                          ]
                      },
                      markLine: {
                          data: [
                              {type: 'average', name: '平均值'}
                          ]
                      }
                  }
              ]
          }
          this.myChart.setOption(option)

        }
      })
      console.log(param)
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.dashboard
  padding:10px
  .infos
  	padding:10px
  	div
	  	.infocontanier
	  		width:100%
	  		height:40px
	  		line-height:40px
  			margin-bottom:10px
	  		display:flex
	  		.infoleft
	  			width:10px
	 				display:block
	  			margin:0px 1px
	  			background:#F3C379
		  		&hover
		  			width:20px
	  		.inforight
	  			color:#fff
	  			flex:1
	  			font-size:1.2em
	  			font-weight:bolder
	  			display:flex
  			padding-right:5px
  .datas
  	.infoitem
  		margin-bottom:10px
  		padding:0px 10px
  		.realinfo
  			border:1px solid #eee
  			border-radius:5px
  			height:80px
  			display:flex
  			.contenttitle
  				flex:2
  				display:flex
  				flex-direction:column
  				.symbol
  					flex:2
  					line-height:60px
  					font-size:3em
  				.title
  					flex:1
  					min-height:25px
  					font-size:1.2em
  			.contentval
  				flex:2
  				line-height:80px
  				font-size:1.8em
  				font-weight: bolder
.echartwrapper
  height:200px
.red
	background:#EB8265
.orange
	background:#F3C379
.yellow
	background:#EFEB87
.blue
	background:#8696C7
.green
	background:#A6D091
.thinred
	background:#EA86A2
.purple
	background:#A685BA
.cyan
	background:#96CBEB

  </style>
