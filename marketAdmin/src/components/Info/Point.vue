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
  	<Table border :columns="listColumns" :data="listData" class="pointlistable"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="pointpager.total" :current="pointpager.pages" @on-change="changePage($event)"></Page>
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
      listColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '头像',
          key: 'headName',
          render (row) {
            return '<img class="pointlistavater" :src="row.headImg" width="40px" height="40px"/>'
          }
        },
        {
          title: '用户名',
          key: 'name'
        },
        {
          title: '联系电话',
          key: 'phone'
        },
        {
          title: '积分',
          key: 'points'
        },{
          title: '说明',
          key: 'remarks'
        },
        {
          title: '时间',
          key: 'createDate'
        }
      ],
      listData: [],
      pointpager: {
        total: 1,
        pages: 1
      }
    }
  },
  created () {
    this.getPointList(1)
  },
  methods: {
    getPointList (pageNo) {
      this.http.get(this.$store.state.prefix + '/pointsDetails/page/' + pageNo || 1).then(res => {
        if (res.error === false) {
          this.pointpager = res.result
          this.listData = res.result.records
          this.listData.forEach(item=>{
            item.createDate = this.util.changeDateToTime(item.createDate);
            item.name = item.account.realName == ''?item.account.nickName:item.account.realName;
            item.headImg = item.account.headImg;
            item.phone = item.account.phone;
          })
        }
      })
    },
    changePage (e) {
      this.getPointList(e)
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.pointlistavater
	height:40px
	width:auto
</style>
