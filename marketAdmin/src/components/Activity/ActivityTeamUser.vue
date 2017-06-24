<template>
<div class="activitylist">
	<div class="content-title">
      <div class="titlename">
      	<span>团队成员</span>
      </div>
      <div class="titellink">
      <router-link :to="'/activity/team?id=' + routerquery.teamid" class="innerbtnlink">参团用户</router-link>
      </div>
 	</div>
 	<div class="content">
   <Table border :columns="activityteamuserColumns" :data="activityteamuserData" class="activityteamtable"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="activitypager.total" :current="activitypager.current" @on-change="changePage"></Page>
        </div>
    </div>
 	</div>
  <div class="hoverShowImg" v-if="isHover" :style="{left:Left+'px',top:Top+'px'}">
    <img :src="currentImg" width="100%" height="100%">
  </div>

    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ActivityTeamUser',
  data () {
    return {
      activityteamuserColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '团号',
          key: 'activityName'
        },
        {
          title: '昵称',
          key: 'activityImg',
          render (row) {
            return '<img class="activitylistavater" :src="murl + row.activityImg"/>'
          }
        },
        {
          title: '头像',
          key: 'joinNum',
          render (row) {
            return row.joinNum + ',' +row.payNum
          }
        },
        {
          title: '真实姓名',
          key: 'viewNum',
          render (row) {
            return row.viewNum + ',' +row.shareNum
          }
        },
        {
          title: '电话',
          key: 'startDate'
        },
        {
          title: '消费金额',
          key: 'endDate'
        },
        {
          title: '所获积分',
          key: 'id',
          render (row) {
             return '<img @mouseover="showImg" @mouseout="isHover=false" :src="generaUrl(row)" width="80px" height="80px">'
          }
        },
        {
          title: '交易额',
          key: 'id',
          render (row) {
             return '<img @mouseover="showImg" @mouseout="isHover=false" :src="generaUrl(row)" width="80px" height="80px">'
          }
        },
        {
          title: '操作',
          key: 'action',
          render (row) {
            return '<i-button type="text" size="small">移除团队</i-button>'
          }
        }
      ],
      activityteamuserData: [],
      isHover:false,
      Left:0,
      Top:0,
      currentImg:'',
      activitypager: {
        pages: 1,
        current: 1,
        total:1
      }
    }
  },
  created () {
    this.getActivityTeamUser(1)
    this.routerquery = this.util.getQuery(location.hash)
  },
  methods: {
    getActivityTeamUser(pageno){
      var query = this.util.getQuery(location.hash)
      this.http.get(this.$store.state.prefix + '/activity/getGroupMemberInfo/' + query.id ).then(res => {
        if(res.error === false) {
          this.activitypager = res.result
          this.activityteamuserData = res.result
        } else {
          this.$Notice.error("获取失败");
        }
      })
    },
    changePage () {
      this.getActivityTeamUser(this.activitypager.current)
    },
  }
}
</script>

<style  lang='stylus' rel="stylesheet/stylus">

.activityteamtable
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
.activitylistavater
  max-height:100px
  width:100%
</style>
