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
            <Page :total="activitypager.pages" :current="activitypager.current" @on-change="changePage"></Page>
        </div>
    </div>
 	</div>
  <div class="hoverShowImg" v-if="isHover" :style="{left:Left+'px',top:Top+'px'}">
    <img :src="currentImg" width="100%" height="100%">
  </div>


<Modal v-model="delactivitymodal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除确认</span>
        </p>
        <div style="text-align:center">
            <p>此活动删除后，用户将无法继续访问此活动。</p>
            <p>是否继续删除？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
        </div>
    </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Activity',
  data () {
    return {
      delactivitymodal:false,
      modal_loading:false,
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
        {
          title: '活动大图',
          key: 'activityImg',
          render (row) {
            return '<img class="activitylistavater" :src="murl + row.activityImg" v-if="row.activityImg"/>'
          }
        },
        {
          title: '参加,支付',
          key: 'joinNum',
          render (row) {
            return row.joinNum + ',' +row.payNum
          }
        },
        {
          title: '浏览,分享',
          key: 'viewNum',
          render (row) {
            return row.viewNum + ',' +row.shareNum
          }
        },
        {
          title: '开始时间',
          key: 'startDate'
        },
        {
          title: '截止时间',
          key: 'endDate'
        },
        {
          title: '二维码',
          key: 'id',
          render (row) {
             return '<img @mouseover="showImg" @mouseout="isHover=false" :src="generaUrl(row)" width="80px" height="80px">'
          }
        },
        {
          title: '操作',
          key: 'action',
          render (row) {
            return '<i-button type="text" size="small" @click = "update(row.id)">修改</i-button>' +
              '<i-button type="text" size="small" @click="setdel(row.id)">删除</i-button>'+
              '<i-button type="text" size="small" @click="showteam(row.id)">团队</i-button>'+
              '<i-button type="text" size="small" @click="showtrade(row.id)">交易</i-button>'
          }
        }
      ],
      activitylistData: [],
      isHover:false,
      Left:0,
      Top:0,
      currentImg:'',
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
    showImg (e) {
      this.isHover = true
      this.Left = e.x;
      this.Top = e.y;
      this.currentImg = e.target.currentSrc
    },
    getActivityList (pageNo) {
      this.http.get(this.$store.state.prefix + '/activity/' + this.$store.state.companyId + '/page/' + pageNo || 1).then(res => {
        if (res.error === false) {
          this.activitypager = res.result;
          this.activitylistData = res.result.records;
          this.activitylistData.forEach(item=>{
            item.startDate = this.util.changeDateToTime(item.startDate);
            item.endDate = this.util.changeDateToTime(item.endDate);
          })
        }
        else{
          this.$Message.error(res.msg)
        }
      })
    },
    changePage () {
      this.getActivityList(this.activitypager.current)
    },
    update (id) {
      this.router.push({path: '/activity/edit', query: {id: id}});
    },
    setdel(id) {
      this.willdelid = id
      this.delactivitymodal = true
      this.modal_loading = false
    },
    showteam(id) {
      this.router.push({path: '/activity/team', query: {id: id}})
    },
    showtrade(id){
       this.router.push({path: '/activity/trade', query: {id: id}})
    },
    del () {
      if (!this.willdelid) {
        return
      }
      this.modal_loading = true
       this.http.post(this.$store.state.prefix + '/activity/delete', {
          id: this.willdelid,
        }).then(res => {
            this.modal_loading = false
          if (res.error === false) {
            this.$Message.success('删除成功')
            this.getActivityList(1);
            this.delactivitymodal = false
            this.willdelid = ""
          }
        })
      
    },
    generaUrl (row) {
      return 'https://pan.baidu.com/share/qrcode?w=250&h=250&url=' + this.apiurl + '?state=' + row.id + ',0'
    }
  }
}
</script>

<style  lang='stylus' rel="stylesheet/stylus">
  .hoverShowImg
    width 200px
    height 200px
    background red
    position absolute
    z-index:1111
    top 0px
    left 0px
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
.activitylistavater
  max-height:100px
  width:100%
</style>
