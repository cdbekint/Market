<template>
<div class="activitylist">
	<div class="content-title">
      <div class="titlename">
      	<span>团队成员</span>
      </div>
      <div class="titellink">
      <router-link :to="'/activity/team?id=' + routerquery.activityid" class="innerbtnlink">参团用户</router-link>
      </div>
 	</div>
 	<div class="content">
   <Table border :columns="activityteamuserColumns" :data="activityteamuserData" class="activityteamtable"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;"><!-- 
            <Page :total="activitypager.total" :page-size="activitypager.size" :current="activitypager.current" @on-change="changePage"></Page> -->
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
          title: '昵称',
          key: 'nickName'
        },
        {
          title: '真实姓名',
          key: 'realName'
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '消费金额',
          key: 'allPayAmount'
        },
        {
          title: '消费所得积分',
          key:'allPayPoints'
        },
        {
          title: '总得积分',
          key: 'groupPoints'
        },
        {
          title:'参团时间',
          key: 'joinDate'
        },
        {
          title: '交易状态',
          key: 'payStatus',
          render (row) {
            if(row.payStatus ==1 ){
              return '已支付'
            }else{
              return '未支付'
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          render (row) {
            return '<i-button type="text" size="small" @click="removeTeamUser(row.accountId)">移除团队</i-button>'
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
        size:12,
        total:1
      },
      routerquery:{

      }
    }
  },
  mounted () {
    this.routerquery = this.util.getQuery(location.hash)
  },
  created () {
    this.getActivityTeamUser(1)
    
  },
  methods: {
    getActivityTeamUser(pageno){
      var query = this.util.getQuery(location.hash)
      this.http.get(this.$store.state.prefix + '/activity/getGroupMemberInfo/' + query.id +'?activityId='+query.activityid ).then(res => {
        if(res.error === false) {
          if(res.result){
            //this.activitypager = res.result
            for(var i in res.result){
              res.result[i].joinDate=this.util.getFormatDate(res.result[i].joinDate)
            }
            this.activityteamuserData = res.result
          }
          
        } else {
          this.$Notice.error("获取失败");
        }
      })
    },
    changePage (e) {
      this.getActivityTeamUser(e)
    },
    removeTeamUser(accountId){
      var query = this.util.getQuery(location.hash)

        this.http.put(this.$store.state.prefix+"/activity/removeGroup/"+accountId+"/"+query.id).then(res=>{
        if(res.error==false){
          this.$Message.success("团员移除成功");
          this.getActivityTeamUser(this.activitypager.current)
        }else {
        this.$Message.error(res.msg)
        }
      })
    }
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
