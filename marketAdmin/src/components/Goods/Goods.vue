<template>
<div class="goodslist">
	<div class="content-title">
      <div class="titlename">
      	<span>商品列表</span>
      </div>
      <div class="titellink">
      <router-link to="/goods/add" class="innerbtnlink">新增商品</router-link>
      </div>
 	</div>
 	<div class="content">
    <Table border :columns="goodslistColumns" :data="goodslistData" class="goodslistable"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="goodspager.total" :current="goodspager.current" @on-change="changePage"></Page>
        </div>
    </div>
 	</div>
</div>

</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Goods',
    data () {
      return {
        goodslistColumns: [
          {
            title: '序号',
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '商品名称',
            key: 'goodsName'
          },
          {
            title: '商品图片',
            key: 'goodsImg',
            render (row) {
              return '<img class="goodslistavater" :src="murl + row.goodsImg"/>'
            }
          },
          {
            title: '商品价格',
            key: 'goodsPrice'
          },
          {
            title: '兑换积分',
            key: 'maxPoints'
          },
          {
            title: '销售量',
            key: 'saleNum'
          },
          {
            title: '库存',
            key: 'storageNum'
          },
          {
            title: '操作',
            key: 'action',
            render (row) {
              return '<i-button type="text" size="small" @click = "update(row.id)">修改</i-button>' +
                '<i-button type="text" size="small" @click="del(row.id)">删除</i-button>'
            }
          }
        ],
        goodslistData: [],
        goodspager: {
          total: 1,
          current: 1
        }
      }
    },
    created () {
      this.getGoodsList(1)
    },
    methods: {
      getGoodsList (pageNo) {
        this.http.get(this.$store.state.prefix +'/goods/page/' + (pageNo || 1)).then(res => {
          if (res.error === false) {
            this.goodspager = res.result
            for (var i in res.result.records) {
              res.result.records[i].goodsImg = res.result.records[i].goodsImg.split(',')[0]
            }
            this.goodslistData = res.result.records
          }
        })
      },
      changePage () {
        this.getGoodsList(this.goodspager.current)
      },
      update (id) {
        this.router.push({path: '/goods/edit', query: {id: id}});
      },
      del (id) {
        this.http.post(this.$store.state.prefix + '/goods/delete', {id: id}).then(res => {
          if (res.error === false) {
            this.$Message.success('删除成功')
            this.getGoodsList(1);
          }
        })
      }
    }
  }
</script>

<style lang='stylus' rel="stylesheet/stylus">
.goodslistable
  td
  	vertical-align:middle
  .goodsdesc
    max-width:200px
    overflow:hidden

.ivu-table
  td,th
    text-align:center
    .goodslistavater
      width:100px
      height:auto
      max-height:100px
</style>
