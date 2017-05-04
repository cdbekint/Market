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
            <Page :total="orderpager.total" :current="orderpager.current" @on-change="changePage"></Page>
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
          key: 'orderNo'
        },
        {
          title: '商品',
          key: 'goodsId'
        },
        {
          title: '购买者',
          key: ''
        },
        {
          title: '支付金额',
          key: 'orderAmount'
        },
        {
          title: '支付积分',
          key: 'payPoints'
        },
        {
          title: '订单状态',
          key: 'payStatus'
        },
        {
          title: '操作',
          key: 'action',
          render () {
            return '<i-button type="text" size="small">修改</i-button><i-button type="text" size="small">删除</i-button>'
          }
        }
      ],
      orderlistData: [],
      orderpager: {
        total: 1,
        current: 1
      }
    }
  },
  created () {
    this.getOrderList(1)
  },
  methods: {
    getOrderList (pageNo) {
      this.http.get('/api/orders/page/' + pageNo || 1).then(res => {
        if (res.error === false) {
          this.orderpager = res.result
          delete this.orderpager.records
          this.orderlistData = res.result.records
        }
      })
    },
    changePage () {
      this.getOrderList(this.orderpager.current)
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
</style>
