<template>
<div class="activitylist">
	<div class="content-title">
      <!-- 页面的标题 -->

      <div class="titlename">
      	<span>活动列表</span>
      </div>
      <div class="titellink">
      <router-link to="/activity/add" class="innerbtnlink">新增活动</router-link>
      </div>
 	</div>
 	<div class="content">
   <Table border :columns="activitylistColumns" :data="activitylistData" class="activitylistable"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="activitypager.total" :current="activitypager.current" @on-change="changePage"></Page>
        </div>
    </div>
 	</div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Activity',
  data () {
    return {
      activitylistColumns: [
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
/*        {
          title: '活动大图',
          key: 'activityImg',
          render (row) {
            return '<img class="activitylistavater" :src="murl + row.activityImg"/>'
          }
        },
        */
        {
          title: '参加人数',
          key: 'activityNum'
        },
        {
          title: '开始时间',
          key: 'startDate'
        },
        {
          title: '截止时间',
          key: 'startDate'
        },
        {
          title: '二维码',
          key: 'id'
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
      activitylistData: [],
      activitypager: {
        pages: 1,
        current: 1
      }
    }
  },
  created () {
    this.getActivityList(1)
  },
  methods: {
    getActivityList (pageNo) {
      this.http.get('/api/activity/' + this.$store.state.companyId + '/page/' + pageNo || 1).then(res => {
        if (res.error === false) {
          this.activitypager = res.result;
          this.activitylistData = res.result.records;
        }
      })
    },
    changePage () {
      this.getActivityList(this.activitypager.current)
    },
    update (id) {
      this.router.push({path: '/activity/edit', query: {id: id}});
    },
    del (id) {
      this.http.delete('/api/activity', {id: id}).then(res => {
        if (res.error === false) {
          this.$Message.success('删除成功')
          this.getActivityList(1);
        }
      })
    }
  }
}
</script>

<style  lang='stylus' rel="stylesheet/stylus">
.activitylisttable
  .activitydesc
  	max-width:250px
  .copylink
  	font-size:0.8em
  	text-decoration:none
  	color:#6bbef2

.ivu-table
  td,th
    text-align:center
    .activityavater
      width:100px
      height:auto
      max-height:100px
</style>
