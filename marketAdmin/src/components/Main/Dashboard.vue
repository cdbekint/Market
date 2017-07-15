<template>
  <div class="dashboard">
  	<Row>
  		
  		<Col span="6" class="infoitem">
	  		<div class="realinfo red">
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
	  		<div class="realinfo orange">
	  			<div class="contenttitle">
	  				<div class="symbol">
	  					<Icon type="cash"></Icon>
	  				</div>
	  				<div class="title">
	  					<span>正在提现</span>
	  				</div>
	  			</div>
	  			
	  			<div class="contentval" v-text="Math.abs(baseinfo.withDrawAmount)">
	  				
	  			</div>
	  		</div>
  		</Col>
  		
  		
  		<Col span="6" class="infoitem">
  		<div class="realinfo thinred">
  			<div class="contenttitle">
  				<div class="symbol">
            <Icon type="ios-pie-outline"></Icon>
  				</div>
  				<div class="title">
  					<span>用户提现</span>
  				</div>
  			</div>
  			
  			<div class="contentval" v-text="baseinfo.userWithdraw">
  				
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
  		<div class="realinfo cyan">
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
  		<div class="realinfo blue">
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
  		<div class="realinfo purple">
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
    <Row>
      <Col span="6" class="infoitem">
      <div class="realinfo green">
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
      <div class="realinfo green">
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
      <div class="realinfo green">
        <div class="contenttitle">
          <div class="symbol">
            <Icon type="ios-personadd-outline"></Icon>
          </div>
          <div class="title">
            <span>客户积分</span>
          </div>
        </div>
        
        <div class="contentval" v-text="baseinfo.allPoints">
          
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
            <span>客户准备金</span>
          </div>
        </div>
        
        <div class="contentval" v-text="~~(baseinfo.allPoints*baseinfo.toCashRate/100)">
          
        </div>
      </div>
        
      </Col>
    </Row>
    <Row>
      <div id="echartzone" class="echartwrapper" style="height:400px;width:100%">
      </div>
    </Row>
  </div>

</template>

<script type="text/ecmascript-6">

export default {
  name: 'Dashboard',
  data () {
    return {
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
    getPayTend(){
      var param={
        companyId:this.util.getCookie("companyId"),
        startDate:this.util.getFormatDate(this.util.getDate(new Date())),
        endDate:this.util.getFormatDate(),
        // startDate:'2017-07-03 00:00:00',
        // endDate:'2017-07-04 00:00:00',
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
