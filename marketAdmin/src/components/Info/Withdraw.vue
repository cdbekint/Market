<template>
<div class="withdrawlist">
	<div class="content-title">
      <div class="titlename">
      	<span>用户提现</span>
      </div>
      <div class="titellink">

      </div>
 	</div>
 	<div class="content">
    <Table border :columns="listColumns" :data="listData" class="giftlistable"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pager.total" :page-size="pager.size" :current="pager.current" @on-change="changePage"></Page>
      </div>
    </div>
 	</div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Withdraw',
  data () {
    return {
      listColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'realName',
          render(row){
            if(row.realName == '')
              return "<span>{{row.nickName}}</span>"
            else
              return "<span>{{row.realName}}</span>"
          }
        },
        {
          title: '头像',
          key: 'headImg',
          render (row) {
            return '<img class="goodslistavater" :src="row.headImg" style="width:40px;height:40px;"/>'
          }
        },
        {
          title: '提现内容',
          key: 'remarks'
        },
        {
          title: '提现比率',
          key: 'toCashRate'
        },
        {
          title: '提现金额',
          key: 'withdrawAmount'
        },
        {
          title: '提现描述',
          key: 'withdrawDesc'
        },
        {
          title: '提现手续费',
          key: 'withdrawFactorage'
        },
        {
          title: '提现积分',
          key: 'withdrawPoints'
        },{
          title: '提现状态',
          key: 'withdrawStatus',
          render (row){
            if(row.withdrawStatus === 1) {
              return '成功'
            }else {
              return '未成功'
            }
          }
        },
        {
          title: '提现时间',
          key: 'successDate'
        }
      ],
      listData: [],
      pager: {
        total: 1,
        pages: 1,
        current:1,
        size:12
      }
    }
  },
  created () {
    this.getwithdrawList(1)
  },
  methods: {
    getwithdrawList (pageNo) {
      this.http.get(this.$store.state.prefix + '/withdraw/page/' + pageNo || 1).then(res => {
        if (res.error === false) {
          this.pager = res.result
          this.listData = res.result.records
          this.listData.forEach(item=>{
            item.successDate = this.util.changeDateToTime(item.successDate);
          })
        }
      })
    },
    changePage (e) {
      this.getwithdrawList(e)
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.withdrawlisttable
  .withdraworigin
  	max-width:200px
  .withdrawavater
  	width:40px
  	height:auto
  	max-height:40px
  .withdrawstatus
  	width:20px
  	height:20px
</style>
