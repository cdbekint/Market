<template>
  <div class="withdrawlist">
  	<div class="content-title">
      <div class="titlename" style="width:30%">
      	<span>待审提现</span>
      </div>
     <!--  <div class="titellink" style="width:68%;position:relative">
        <Date-picker type="date" placeholder="选择日期" style="width: 20%"></Date-picker>
        </Col>
      	<Select v-model="queryinfo.withdrawType" slot="prepend" style="width:15%;" placeholder="提现类型">
          <Option value="1">用户提现</Option>
          <Option value="2">商家提现</Option>
        </Select>
        <Select v-model="queryinfo.withdrawStatus" slot="prepend" style="width:15%;" placeholder="提现状态">
          <Option value="1">成功</Option>
          <Option value="2">进行中</Option>
        </Select>
        <Input v-model="queryinfo.nameOrPhone" placeholder="姓名或手机" style="width:20%"></Input>
        <Button type="primary" icon="ios-search" @click = "getWithDrawList">查询</Button>
      </div> -->
 	</div>
 	<div class="content">
 			<Table highlight-row border :columns="withdrawColumns" :data="withdrawlist"></Table>
	    <div style="margin: 10px;overflow: hidden">
	        <div style="float: right;">
	            <Page :total="queryinfo.total" :page-size="queryinfo.size" :current="queryinfo.current" @on-change="getWithDrawList"></Page>
	        </div>
	    </div>
 	</div>
  </div>

</template>

<script type="text/ecmascript-6">
export default {
  name: 'WithDrawList',
  data () {
    return {
    	queryinfo:{
    		withdrawType:'2',
        dealDate:this.util.getDate(),
    		withdrawStatus:'2',
    		nameOrPhone:'',
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
          title: '提现公司',
          key: 'remarks'
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
        },
        {
          title: '操作',
          key: 'action',
          width: 70,
          render (row) {
          	if(row.withdrawType==2&&row.withdrawStatus==2){
          		return '<i-button type="text" size="small" @click="applyWithdraw(row)">放款</i-button>'
          	}else{
          		return ''
          	}
          }
        }
    	],
    	withdrawlist:[]
    }
  },
  created () {
    this.getWithDrawList()
  },
  methods:{
  	getWithDrawList(pageno){
  		if(!isNaN(pageno)){
  			this.queryinfo.current=pageno
  		}else{
  			this.queryinfo.current=1
  		}
  		var param=JSON.parse(JSON.stringify(this.queryinfo))
  		this.http.get(this.$store.state.prefix+"/operate/getCompanyWithdrawInfo/"+param.current+"?a=1"+this.util.parseParam(param)).then(res=>{
  			this.isGetting=false
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
  	},
  	applyWithdraw(row){
  		var param={
  			withdrawId:row.id,
  			companyId:row.companyId
  		}
  		this.$Modal.confirm({
            title: '确认划款',
            content: '<p>确认为'+row.companyName+'划款：'+Math.abs(row.withdrawAmount)+'元</p>',
            onOk: () => {
                this.http.put(this.$store.state.prefix+"/operate/applyCompanyWithdraw",param).then(res=>{
					  			if(res.error==false){
                    this.$Message.success("放款成功")
                    this.getWithDrawList()
					  			}else{
					  				this.$Message.error(res.msg);
					  			}
					  		})
            },
            onCancel: () => {
                
            }
        });
  		
  	}
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.title-name
	width:30% !important
.content
	padding-top:10px
.companydrowplist
	position:absolute
	width:200px
	top:40px
	left:10%
	min-height:100px
	max-height:300px
	overflow-y:auto
	z-index:1000
	border:1px solid #ccc
	background:#fff
	border-radius:5px
	ul
		li
			overflow:hidden
			display:flex
			border-bottom:1px solid #eee
			cursor:pointer
			.companylogo
				width:40px
				height:40px
				overflow:hidden
				img
					width:100%
					height:auto
			.companyname
				flex1:1
				text-align:left


</style>
