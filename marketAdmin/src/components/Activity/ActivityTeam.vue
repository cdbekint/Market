<template>
<div class="activitylist">
	<div class="content-title">
      <div class="titlename">
      	<span>参团用户</span>
      </div>
      <div class="titellink">
      <router-link to="/activity" class="innerbtnlink">活动列表</router-link>
      </div>
 	</div>
 	<div class="content">
   <Table border :columns="activityteamColumns" :data="activityteamData" class="activityteamtable"></Table>
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
  name: 'ActivityTeam',
  data () {
    return {
      activityteamColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '团长姓名',
          key: 'nickName',
          render (row) {
            if(row.realName) {
              return row.realName
            } else {
              return row.nickName
            }
          }
        },
        {
          title: '团长电话',
          key: 'phone'
        },
        {
          title: '团员数',
          key: 'groupNum'
        },
        {
          title: '交易人数',
          key: 'payNum'
        },
        {
          title: '团长福利',
          key: 'groupPoints'
        },
        {
          title: '所获积分',
          key: 'allPayPoints'
        },
        {
          title: '交易额',
          key: 'allPayAmount'
        },
        {
          title: '操作',
          key: 'action',
          render (row) {
            return '<i-button type="text" size="small" @click = "viewmenber(row.groupId)">查看团员</i-button>'
          }
        }
      ],
      activityteamData: [],
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
    this.getActivityTeam()
  },
  methods: {
    getActivityTeam(){
      var query = this.util.getQuery(location.hash)
      this.http.get(this.$store.state.prefix + '/activity/getAllGroupInfo/' + query.id).then(res => {
        if(res.error === false) {
          if(res.result)this.activitypager = res.result
          this.activityteamData = res.result
        } else {
          this.$Notice.error("获取失败");
        }
      })
    },
    viewmenber(id) {
      var querys = this.util.getQuery(location.hash)
      this.router.push({path: '/activity/teamuser', query: {id: id,activityid: querys.id}})
    },
    changePage() {
      this.getActivityTeam(this.activitypager.current)
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
