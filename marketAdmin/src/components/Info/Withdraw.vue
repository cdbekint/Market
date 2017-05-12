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
   <Table border :columns="withdrawlistColumns" :data="withdrawlistData" class="withdrawlistable"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="withdrawpager.total" :current="withdrawpager.current" @on-change="changePage"></Page>
        </div>
    </div>
 		<table class="table table-bordered table-hover withdrawlisttable">
 			<thead>
 				<tr>
 					<th>序号</th>
 					<th>活动</th>
 					<th>头像</th>
 					<th>昵称</th>
 					<th>联系方式</th>
 					<th>提现金额</th>
 					<th>提现时间</th>
 					<th>提现状态</th>
 					<th>操作</th>
 				</tr>
 			</thead>
 			<tbody>
 				<tr>
 					<td>1</td>
 					<td class="withdraworigin">冰点脱毛秒杀开始啦！仅需399元秒杀任意部位，快来抢购</td>
 					<td><img class="withdrawavater" src="http://wx.qlogo.cn/mmopen/qGusKyb0IEeL0LcuiaCuISav37vicPlXiaibQqM4jwvnt6FLxSiaPN9WUlevzuMW2abajiaH8rlEndlATibuwCQnR0EgJBS9bgXdr0I/0" alt=""></td>
 					<td>白起网络</td>
 					<td>19392942932</td>
 					<td>482.5</td>
 					<td>2017-04-13 17:11:14</td>
 					<td><img src="/static/images/fail.png" class="withdrawstatus" alt=""></td>
 					<td>
 						
 					</td>
 				</tr>
 				<tr>
 					<td>1</td>
 					<td>冰点脱毛秒杀开始啦！仅需399元秒杀任意部位，快来抢购</td>
 					<td><img class="withdrawavater" src="http://wx.qlogo.cn/mmopen/qGusKyb0IEeL0LcuiaCuISav37vicPlXiaibQqM4jwvnt6FLxSiaPN9WUlevzuMW2abajiaH8rlEndlATibuwCQnR0EgJBS9bgXdr0I/0" alt=""></td>
 					<td>白起网络</td>
 					<td>19392942932</td>
 					<td>482.5</td>
 					<td>2017-04-13 17:11:14</td>
 					<td><img src="/static/images/success.png" class="withdrawstatus" alt=""></td>
 					<td>
 						
 					</td>
 				</tr>
 			</tbody>
 		</table>
 	</div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Withdraw',
  data () {
    return {
      withdrawlistColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '活动名称',
          key: 'wactivityName'
        },
        {
          title: '头像',
          key: 'userCphoto',
          render (row) {
            return '<img class="withdrawlistavater" :src="row.userCphoto"/>'
          }
        },
        {
          title: '昵称',
          key: 'nickName'
        },
        {
          title: '联系方式',
          key: 'phone'
        },
        {
          title: '提现金额',
          key: 'withdrawAmount'
        },
        {
          title: '提现时间',
          key: 'withdrawDate'
        },
        {
          title: '提现状态',
          key: 'storageNum',
          render (row) {
            return '<img src="/static/images/success.png" class="withdrawstatus" alt="">'
          }
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '操作',
          key: 'action',
          render () {
            return '<i-button type="text" size="small">修改</i-button><i-button type="text" size="small">删除</i-button>'
          }
        }
      ],
      withdrawlistData: [],
      withdrawpager: {
        total: 1,
        current: 1
      }
    }
  },
  created () {
    this.getwithdrawList(1)
  },
  methods: {
    getwithdrawList (pageNo) {
      this.http.get('/api/withdraw/page/' + pageNo || 1).then(res => {
        if (res.error === false) {
          this.withdrawpager = res.result
          delete this.withdrawpager.records
          this.withdrawlistData = res.result.records
        }
      })
    },
    changePage () {
      this.getwithdrawList(this.withdrawpager.current)
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
