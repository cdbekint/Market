<template>
  <div class="inviterlist">
    <div class="content-title" style="margin:5px;">
      <div class="titlename">
        <span>邀请排行榜</span>
      </div>
      <div class="titellink">
        <Date-picker type="date" v-model="queryinfo.month" placeholder="所在月份" format="yyyy/MM/dd" style="width: 30%;float:left"></Date-picker>
        <Select placeholder="查询条数" v-model="queryinfo.limit" style="width:30%;float:left">
          <Option value="10">前10名</Option>
          <Option value="30">前30名</Option>
          <Option value="40">前40名</Option>
          <Option value="100">前100名</Option>
        </Select>
        <Button type="primary" icon="ios-search" @click="getInviterInfo()">查询</Button>
      </div>
    </div>
    <div class="content">
    <Row>
      <Table border :columns="inviterCol" :data="inviterData" class="giftlistable"></Table>
      </Row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'InviterInfo',
  data() {
    return {
      queryinfo:{
        limit:"10",
        month:this.util.getDate(Date.now()),
        companyId:this.util.getCookie("companyId")
      },
      inviterCol: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '名称',
          key: 'nickName',
          render(row) {
            if (row.realName) {
              return '<span v-text="row.realName"></span>'
            } else {
              return '<span v-text="row.nickName"></span>'
            }
          }
        },
        {
          title: '头像',
          key: 'headImg',
          render(row) {
            return '<img :src="row.headImg" style="width:40px;height:40px;"/>'
          }
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '提现金额',
          key: 'withdrawAmount'
        },
        {
          title: '总积分',
          key: 'allPoints'
        },
        {
          title: '剩余积分',
          key: 'points'
        },
        {
          title: '会员',
          key: 'member',
          render(row) {
            if (row.member == 1)
              return '<Icon type="android-checkmark-circle" size="20" color="#3091f"></Icon>'
            else
              return '<Icon type="close-circled" size="20" color="red"></Icon>'
          }
        },
        {
          title: '员工标识',
          key: 'employee',
          render(row) {
            if (row.employee == 1)
              return '<Icon type="android-checkmark-circle" size="20" color="#3091f"></Icon>'
            else 
              return '<Icon type="close-circled" size="20" color="red"></Icon>'
          }
        },{
        title:'邀请人数',
        key:'allInviter'
        }
      ],
      inviterData: []
    }
  },
  created() {
    this.getInviterInfo()
  },
  methods: {
    getInviterInfo(){
    
      var param=JSON.parse(JSON.stringify(this.queryinfo))
      if(!param.limit){
        this.$Message.error("请选择查询条数")
        return
      }
      
      this.http.post(this.$store.state.prefix+'/company/getCompanyInviteMemberInfo',param).then(res=>{
        if(res.error==false){
          this.inviterData=res.result
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">

</style>
