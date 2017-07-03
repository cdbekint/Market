<template>
<div class="orderlist">
	<div class="content-title">
      <!-- 页面的标题 -->

      <div class="titlename">
      	<span>订单列表</span>
      </div>
      <div class="titellink">
        <Select v-model="orderquery.payType" slot="prepend" style="width:25%;" placeholder="订单类型">
          <Option value="">所有订单</Option>
          <Option value="2">商品订单</Option>
          <Option value="6">自助付款</Option>
          <Option value="5">注册会员</Option>
          <Option value="4">账户充值</Option>
        </Select>
        <Select v-model="orderquery.payStatus" slot="prepend" style="width:25%;" placeholder="支付状态">
          <Option value="">所有状态</Option>
          <Option value="1">成功</Option>
          <Option value="2">未成功</Option>
        </Select>
        <Input v-model="orderquery.nameOrPhone" placeholder="请输入关键字"  style="width:20%"></Input>
        <Button type="primary" icon="ios-search" @click = "getOrderList(1)" >查询</Button>
      </div>
 	</div>
 	<div class="content">
  <Table border :columns="orderlistColumns" :data="orderlistData" class="orderlistable"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="pager.total" :page-size="pager.size" :current="pager.current" @on-change="changePage($event)"></Page>
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
      orderquery:{
        payType: '',
        nameOrPhone: '',
        payStatus:''
      },
      orderlistColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'payNo',
          ellipsis:true
        },
        {
          title: '用户名',
          key: 'name'
        },
        {
          title:"头像",
          key:'headImg',
          render (row) {
            return '<img :src="row.account.headImg" style="width:40px;height:40px;" v-if="row.account&&row.account.headImg"/>'
          }
        },
        {
          title: '折扣',
          key: 'discount',
          render (row) {
            return '<span>{{row.discount}}</span>'
          }
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
          title: '支付状态',
          key: 'payStatus',
          render (row) {
            return row.payStatus==1?'<Icon type="checkmark-round"></Icon>':'<Icon type="alert" color="red" title="未成功"></Icon>'
          }
        },
        {
          title: '支付时间',
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
        size:12,
        current: 1
      }
    }
  },
  created () {
    this.getOrderList(1)
  },
  methods: {
    getOrderList (pageNo) {
      this.http.get(this.$store.state.prefix + '/pay/page/' + (pageNo || 1) + '?payType=' +this.orderquery.payType+'&nameOrPhone='+this.orderquery.nameOrPhone+"&payStatus="+this.orderquery.payStatus).then(res => {
        if (res.error === false) {
          this.pager = res.result
          this.orderlistData = res.result.records
          this.orderlistData.forEach(item=>{
            item.payDate = this.util.getFormatDate(item.payDate);
            item.name = item.account?(item.account.realName == ''?item.account.nickName:item.account.realName):'';
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
