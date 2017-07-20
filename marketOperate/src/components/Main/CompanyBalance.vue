<template>
  <div class="withdrawlist">
  	<div class="content-title">
      <div class="titlename" style="width:30%">
      	<span>商家所有资金</span>
      </div>
      <div class="titellink" style="width:68%;position:relative">
      </div>
 	</div>
 	<div class="content">
 			<Table highlight-row border :columns="balanceColumns" :data="balancelist"></Table>
	   
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
    	balanceColumns:[
    		{
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '公司名称',
          key: 'companyName'
        },
        {
          title: 'logo',
          key: 'companyLogo',
          render(row){
            return '<img :src="murl+row.companyLogo" alt="" style="width:40px;height:auto;max-height:40px" v-if="row.companyLogo">'
          }
        },
        {
        	title:'积分',
        	key:'allPoints'
        },
        {
          title: '账户余额',
          key: 'balance'
        },
        {
          title: '积分折现比例',
          key: 'toCashRate'
        }
    	],
    	balancelist:[]
    }
  },
  created () {
    this.getWithDrawList()
  },
  methods:{
  	getWithDrawList(){
  		this.http.get(this.$store.state.prefix+"/operate/getAllCompanyBalanceInfo").then(res=>{
        if(res.error==false){
          this.balancelist=res.result
        }
  		})
  	}
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">

</style>
