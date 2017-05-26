<template>
<div class="giftlist">
	<div class="content-title">
      <!-- 页面的标题 -->

      <div class="titlename">
      	<span>礼品列表</span>
      </div>
      <div class="titellink">
      <router-link to="/gift/add" class="innerbtnlink">新增礼品</router-link>
      </div>
 	</div>
 	<div class="content">
    <Table border :columns="giftlistColumns" :data="giftlistData" class="giftlistable"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="giftpager.total" :current="giftpager.current" @on-change="changePage"></Page>
        </div>
    </div>
 	</div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Gift',
  data () {
    return {
      giftlistColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '礼品名称',
          key: 'giftName'
        },
        {
          title: '礼品图片',
          key: 'giftImg',
          className: 'giftavater-wrapper',
          render (row) {
            return '<img class="giftavater" :src="murl + row.giftImg"/>'
          }
        },
        {
          title: '礼品简介',
          key: 'giftDesc'
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
      giftlistData: [],
      giftpager: {
        pages: 1,
        current: 1
      }
    }
  },
  created () {
    this.getGiftList(1)
  },
  methods: {
    getGiftList (pageNo) {
      this.http.get('/api/gift/page/' + pageNo || 1).then(res => {
        if (res.error === false) {
          this.giftpager = res.result
          this.giftlistData = res.result.records
        }
      })
    },
    changePage () {
      this.getGiftList(this.giftpager.current)
    },
    update (id) {
      this.router.push({path: '/gift/edit', query: {id: id}});
    },
    del (id) {
      this.http.delete('/api/gift', {id: id}).then(res => {
        if (res.error === false) {
          this.$Message.success('删除成功');
          this.getGiftList(1);
        }
      })
    }
  }
}
</script>

<style lang='stylus' rel="stylesheet/stylus">
.ivu-table
  td,th
    text-align:center
    .giftavater
      width:100px
    	height:auto
    	max-height:100px
</style>
