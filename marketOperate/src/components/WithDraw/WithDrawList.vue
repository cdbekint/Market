<template>
  <div class="withdrawlist">
  	<div class="content-title">
      <div class="titlename" style="width:30%">
      	<span>提现申请列表</span>
      </div>
      <div class="titellink" style="width:68%;position:relative">

         <Input v-model="queryinfo.companyName" placeholder="公司名称" style="width:25%" @on-change="getCompanyList" class="companyfilter"></Input>
         <div class="companydrowplist" v-if="showcompanylist">
         		<ul>
         			<li v-for="cl in companyList" @click="setCompany(cl)">
         				<div class="companylogo">
         					<img :src="murl+cl.companyLogo" alt="">
         				</div>
         				<div class="companyname" v-text="cl.companyName"></div>
         			</li>
         			<li v-if="companyList.length==0" style="text-align:center">暂无匹配项</li>
         		</ul>
         </div>
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
      </div>
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
    	companyList:[],
    	showcompanylist:false,
    	isGetting:false,
    	queryinfo:{
    		companyName:'',
    		companyId:'',
    		withdrawType:'',
    		withdrawStatus:'',
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
          title: '发起人',
          key: 'realName',
          render(row){
          	return row.realName||row.nickName
          }
        },
        {
          title: '金额',
          key: 'withdrawAmount'
        },
        {
        	title:'积分',
        	key:'withdrawPoints'
        },
        {
          title: '手续',
          key: 'withdrawFactorage'
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
          title: '到账时间',
          key: 'successDate',
          sortable: true
        },
        {
          title: '状态',
          key: 'withdrawStatus',
          render(row){
          	if(row.withdrawStatus==1){
          		return '成功'
          	}else{
							return '进行中'
          	}
          }
        },
        {
          title: '操作',
          key: 'action',
          render (row) {
          	if(row.withdrawType==2&&row.withdrawStatus==2){
          		return '<i-button type="text" size="small" @click="applyWithdraw(row)">确认放款</i-button>'
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
  },
  methods:{
  	getCompanyList(){
  		this.isGetting=true
  		if(this.queryinfo.companyName=='')return;
  		this.showcompanylist=true
  		this.http.get(this.$store.state.prefix+"/operate/getCompanyBaseInfo/1?useable=1&companyName="+this.queryinfo.companyName).then(res=>{
  			if(res.error==false){
  				this.getcompanyloading=false
  				this.isGetting=false
  				this.companyList=res.result.records
  			}
  		})
  	},
  	getWithDrawList(pageno){
  		if(!isNaN(pageno)){
  			this.queryinfo.current=pageno
  		}else{
  			this.queryinfo.current=1
  		}
  		if(this.isGetting)return;
  		this.isGetting=true
  		var param=JSON.parse(JSON.stringify(this.queryinfo))
  		if(!param.companyId){
  			this.$Message.error("请先选择查询的公司")
  			return
  		}
  		delete param.companyName
  		this.http.get(this.$store.state.prefix+"/operate/getCompanyWithdrawInfo/"+param.current+"?"+this.util.parseParam(param)).then(res=>{
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
  	setCompany(company){
  		console.log(company)
  		this.queryinfo.companyId=company.id
  		this.queryinfo.companyName=company.companyName
  		this.showcompanylist=false
  		this.getWithDrawList(1)
  	},
  	applyWithdraw(row){
  		var param={
  			withdrawId:row.id,
  			companyId:this.queryinfo.companyId
  		}
  		this.$Modal.confirm({
            title: '确认划款',
            content: '<p>确认为'+this.queryinfo.companyName+'划款：'+Math.abs(row.withdrawAmount)+'元</p>',
            onOk: () => {
                this.http.put(this.$store.state.prefix+"/operate/applyCompanyWithdraw",param).then(res=>{
					  			if(res.error==false){

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
