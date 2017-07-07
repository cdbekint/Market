<template>
<div class='comapanyinfo'>
<div class='content-title'>
      <!-- 页面的标题 -->

      <div class='titlename'>
        <span v-text="queryinfo.employeeName+'的客户资源'"></span>
      </div>
      <div class='titellink'>
      <router-link to='/customer' class='innerbtnlink'>返回</router-link>
      </div>
 </div>
 <div class='content'>
  <Table border :columns="ResourceCol" :data="ResourceData" class="giftlistable"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pager.total" :page-size="pager.size" :current="pager.current" @on-change="getEmployeeInfo"></Page>
      </div>
    </div>
 </div>
</div>


</template>

<script  type='text/ecmascript-6'>
export default {
  name: 'company',
  data () {
    return {
     ResourceCol:[{
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '头像',
          key: 'headImg',
          render (row) {
            return '<img :src="row.headImg" style="width:40px;height:40px"/>'
          }
        },
        {
          title: '会员姓名',
          key: 'realName',
          render(row){
            return row.realName||row.nickName
          }
        },
        {
          title:'消费金额',
          key: 'selfExpense'
        },
        {
          title:'提现金额',
          key: 'withDrawAmount'
        },
        {
          title:'累计积分',
          key: 'allPoints'
        },
        {
          title:'剩余积分',
          key: 'points'
        },
        {
          title:'邀请人数',
          key: 'invitedMems'
        }],
     ResourceData:[],
     pager:{
      total:1,
      current:1,
      size:1
     },
     queryinfo:{
      employeeId:'',
      companyId:this.util.getCookie("companyId")
     }
    }
  },
  methods: {
    getEmployeeInfo(pageno){
      if(pageno){
        this.pager.current=pageno
      }else{
        this.pager.current=1
      }
    this.http.get(this.$store.state.prefix+'/customer/getEmployeeInviterInfo/'+this.pager.current+'?companyId='+this.queryinfo.companyId+'&employeeId='+this.queryinfo.employeeId).then(res=>{
      if(res.error==false){
        this.ResourceData=res.result.records
        this.pager=res.result
      }
    })

    }
  },
  created () {
    var query = this.util.getQuery(location.hash);
    this.queryinfo.employeeId=query.id
    this.queryinfo.companyId=this.util.getCookie("companyId")
    this.queryinfo.employeeName=decodeURIComponent(query.name)
    this.getEmployeeInfo()
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>

</style>
