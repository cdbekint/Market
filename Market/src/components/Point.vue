<template>
<div class="pointadd">
    <div class="content-title">
      <div class="titlename">
        <span>客户积分</span>
      </div>
      <div class="titellink">
      </div>
  </div>
  <div class="content">
  	<Table border :columns="pointlistColumns" :data="pointlistData" class="pointlistable"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="pointpager.total" :current="pointpager.current" @on-change="changePage"></Page>
        </div>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Point',
  data () {
    return {
      pointlistColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '头像',
          key: 'pointName',
          render (row) {
            return '<img class="pointlistavater" :src="row.pointImg"/>'
          }
        },
        {
          title: '客户昵称',
          key: 'pointImg'
        },
        {
          title: '客户姓名',
          key: 'pointDesc'
        },
        {
          title: '联系电话',
          key: 'pointPrice'
        },
        {
          title: '积分',
          key: 'points'
        },
        {
          title: '余额',
          key: 'balance'
        },
        {
          title: '加入时间',
          key: 'createDate'
        },
        {
          title: '操作',
          key: 'action',
          render () {
            return '<i-button type="text" size="small">修改</i-button><i-button type="text" size="small">删除</i-button>'
          }
        }
      ],
      pointlistData: [],
      pointpager: {
        total: 1,
        current: 1
      }
    }
  },
  created () {
    this.getPointList(1)
  },
  methods: {
    getPointList (pageNo) {
      this.http.get('/api/pointsDetails/page/' + pageNo || 1).then(res => {
        if (res.error === false) {
          this.pointpager = res.result
          delete this.pointpager.records
          this.pointlistData = res.result.records
        }
      })
    },
    changePage () {
      this.getPointList(this.pointpager.current)
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.pointlistavater
	height:40px
	width:auto
</style>
