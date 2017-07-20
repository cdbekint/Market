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
        	title:'会员积分和',
        	key:'allPoints'
        },
        {
          title:'会员准备金',
          render(row){
            return '<span v-text="Math.ceil(row.allPoints*row.toCashRate/100)" style="font-size:1.2em;color:red;font-weight:bolder"></span>'
          }
        },
        {
          title: '账户余额',
          key: 'balance',
          render(row){
            return '<span v-text="row.balance" style="font-size:1.2em;color:red;font-weight:bolder"></span>'
          }
        }
    	],
    	balancelist:[],
      allPreMoney:0,
      allBalance:0
    }
  },
  created () {
    this.getWithDrawList()
  },
  methods:{
  	getWithDrawList(){
  		this.http.get(this.$store.state.prefix+"/operate/getAllCompanyBalanceInfo").then(res=>{
        if(res.error==false){

          res.result.forEach((item)=>{
            this.allPreMoney+=item.allPoints*item.toCashRate
            this.allBalance+=item.balance
          })
          this.balancelist=res.result
        }
  		})
  	}
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">

</style>
