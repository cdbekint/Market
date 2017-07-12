<template>
<div class="activitylist">
	<div class="content-title">
      <div class="titlename">
      	<span>活动商品交易</span>
      </div>
      <div class="titellink">
      <router-link to="/activity" class="innerbtnlink">活动列表</router-link>
      </div>
 	</div>
 	<div class="content">
   <Table border :columns="activitytradeColumns" :data="activitytradeData" class="activitytradeable"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="activitypager.total" :current="activitypager.current" @on-change="changePage"></Page>
        </div>
    </div>
 	</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ActivityTrade',
  data () {
    return {
      activitytradeColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '购买者',
          key: 'account',
          render (row) {
            if(row.account.realName) {
              return row.account.realName
            } else {
              return row.account.nickName
            }
          }
        },
        {
          title: '商品',
          key: 'goodsName'
        },
        {
          title: '金额',
          key: 'payAmount'
        },
        {
          title: '积分',
          key: 'payPoints'
        },
        {
          title: '折扣',
          key: 'discount'
        },
        {
          title: '支付时间',
          key: 'payDate'
        },
        {
          title: '备注',
          key: 'remarks'
        },
        {
          title: '状态',
          key: 'payStatus',
          render(row){
          	if(row.payStatus==1){
          		return '成功'
          	}else{
          		return '失败'
          	}
          }
        }
      ],
      activitytradeData: [],
      isHover:false,
      Left:0,
      Top:0,
      currentImg:'',
      activitypager: {
        pages: 1,
        current: 1,
        total:1
      }
    }
  },
  created () {
    this.getActivityTrade()
  },
  methods: {
    getActivityTrade(pageno){
      var query = this.util.getQuery(location.hash)
      if(pageno){
      	this.activitypager.current=pageno
      }else{
      	this.activitypager.current=1
      }
      this.http.get(this.$store.state.prefix + '/pay/getGoodsTradingRecord/'+this.activitypager.current+'?activityId=' + query.id+'&companyId='+this.util.getCookie('companyId')).then(res => {
        if(res.error === false) {
          if(res.result){
            
            res.result.forEach((item)=>{
            	item.payDate=this.util.getFormatDate(item.payDate,1)
            })
            this.activitypager = res.result
            this.activitytradeData = res.result
          }
          
        } else {
          this.$Notice.error("获取失败");
        }
      })
    },
    viewmenber(id) {
      var querys = this.util.getQuery(location.hash)
      this.router.push({path: '/activity/teamuser', query: {id: id,activityid: querys.id}})
    },
    changePage() {
      this.getActivityTrade(this.activitypager.current)
    },
  }
}
</script>

<style  lang='stylus' rel="stylesheet/stylus">

.activitytradeable
  .activitydesc
  	max-width:250px
  .copylink
  	font-size:0.8em
  	text-decoration:none
  	color:#6bbef2

.ivu-table
  td,th
    text-align:center
    .activityavater
      width:100px
      height:auto
      max-height:100px
.activitylistavater
  max-height:100px
  width:100%
</style>
