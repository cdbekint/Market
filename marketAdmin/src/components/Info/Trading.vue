<template>
<div class="tradinglist">
	<div class="content-title">
      <div class="titlename">
      	<span>交易记录</span>
      </div>
      <div class="titellink">
      
      </div>

 	</div>
 	<div class="content">
  <Table border :columns="paylistColumns" :data="paylistData" class="paylistable"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;"> 
            <Page :total="paypager.total" :current="paypager.current" @on-change="changePage"  size="small"></Page>
        </div>
    </div>

 		<table class="table table-bordered table-hover">
 			<thead>
 				<tr>
 					<th>序号</th>
 					<th>活动名称</th>
 					<th>交易号</th>
 					<th>交易时间</th>
 					<th>交易金额</th>
 					<th>交易状态</th>
 				</tr>
 			</thead>
 			<tbody>
 				<tr>
 					<td>1</td>
 					<td>巴黎春天脱毛活动，不要998，只要399</td>
 					<td>232342134242232323</td>
 					<td>2017-04-13 16:38:06</td>
 					<td>9.9</td>
 					<td>已支付</td>
 				</tr>
 			</tbody>
 		</table>
 	</div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Trading',
  data () {
    return {
      paylistColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '活动名称',
          key: 'activityName'
        },
        {
          title: '交易号',
          key: 'payNo'
        },
        {
          title: '交易时间',
          key: 'payDate'
        },
        {
          title: '交易人',
          key: 'payUser'
        },
        {
          title: '交易金额',
          key: 'payMoney'
        },
        {
          title: '交易状态',
          key: 'payStatus'
        },
        {
          title: '备注',
          key: 'remarks'
        },
        {
          title: '操作',
          key: 'action',
          render () {
            return '<i-button type="text" size="small">修改</i-button><i-button type="text" size="small">删除</i-button>'
          }
        }
      ],
      paylistData: [],
      paypager: {
        total: 1,
        current: 1
      }
    }
  },
  created () {
    this.getPayList(1)
  },
  methods: {
    getPayList (pageNo) {
      this.http.get('/api/pay/page/' + pageNo || 1).then(res => {
        if (res.error === false) {
          this.paypager = res.result
          delete this.paypager.records
          this.paylistData = res.result.records
        }
      })
    },
    changePage () {
      this.getPayList(this.paypager.current)
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
</style>
