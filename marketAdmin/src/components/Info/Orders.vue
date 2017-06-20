<template>
<div class="orderlist">
	<div class="content-title">
      <!-- 页面的标题 -->

      <div class="titlename">
      	<span>订单列表</span>
      </div>
      <div class="titellink">

      </div>
 	</div>
 	<div class="content">
  <Table border :columns="orderlistColumns" :data="orderlistData" class="orderlistable"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="pager.total" :current="pager.pages" @on-change="changePage($event)"></Page>
        </div>
    </div>
 	</div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Orders',
  data () {
    return {
      orderlistColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'payNo'
        },
        {
          title: '用户名',
          key: 'name'
        },
        {
          title:"头像",
          key:'headImg',
          render (row) {
            return '<img :src="row.headImg" style="width:40px;height:40px;"/>'
          }
        },
        {
          title: '折扣',
          key: 'discount'
        },
        {
          title: '支付金额',
          key: 'payAmount'
        },
        {
          title: '支付积分',
          key: 'payPoints'
        },
        {
          title: '日期',
          key: 'payDate'
        },
        {
          title: '信息',
          key: 'remarks'
        }
      ],
      orderlistData: [],
      pager: {
        total: 1,
        pages: 1
      }
    }
  },
  created () {
    this.getOrderList(1)
  },
  methods: {
    getOrderList (pageNo) {
      this.http.get(this.$store.state.prefix + '/pay/page/' + pageNo || 1).then(res => {
        if (res.error === false) {
          this.pager.total = res.result.total
          this.pager.pages = res.result.pages
          this.orderlistData = res.result.records
          this.orderlistData.forEach(item=>{
            item.payDate = this.util.changeDateToTime(item.payDate);
            item.name = item.account.realName == ''?item.account.nickName:item.account.realName;
            item.headImg = item.account.headImg;
          })
        }
      })
    },
    changePage (e) {
      this.getOrderList(e)
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
</style>
