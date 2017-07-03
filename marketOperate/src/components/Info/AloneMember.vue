<template>
  <div class="alonemember">
    <Table border :columns="aloneColumns" :data="aloneMember"></Table>
    <Modal 
      v-model="employeemodal"
      title="选取新的邀请人" >
    <Table highlight-row border :columns="employeeColumns" :data="employee" @on-row-click="setInviterInfo"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="employeepager.total" :page-size="employeepager.size" :current="employeepager.current" @on-change="getEmployeeList"></Page>
        </div>
    </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'AloneMember',
  data () {
    return {
      employeemodal:false,
      aloneMember:[],
      aloneColumns:[
       {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '头像',
          key: 'headImg',
          render (row) {
            return '<img :src="row.account.headImg" style="width:40px;height:40px"/>'
          }
        },
        {
          title: '会员昵称',
          key: 'nickName',
          render (row) {
            return row.account.nickName
          }
        },
        {
          title: '会员姓名',
          key: 'realName',
          render (row) {
            return row.account.realName
          }
        },
        {
          title: '手机',
          key: 'phone',
          render (row) {
            return row.account.phone
          }
        },
        {
          title: '加入时间',
          key: 'createDate'
        },
        {
          title: '操作',
          key: 'action',
          render (row) {
            return '<i-button type="text" size="small" @click="chooseInviter(row)">选取邀请人</i-button>'
          }
        }
      ],
      employee:[],
      employeeColumns:[
      {
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
          key: 'realName'
        },
        {
          title:'电话',
          key: 'phone'
        }
      ],
      employeepager:{
        current:1,
        total:1,
        size:12
      }
    }
  },
  created(){
    this.getAloneMember()
    this.getEmployeeList(1)
  },
  methods: {
    getAloneMember () {
      this.http.get(this.$store.state.prefix +'/customer/getNoInviterMember').then(res => {
        if(res.error === false){
          this.aloneMember=res.result
          this.aloneMember.forEach(item=>{
            item.createDate = this.util.getFormatDate(item.createDate)
            item.ninviterId=0
          })
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    getEmployeeList(pageno){
      this.http.get(this.$store.state.prefix+'/customer/getCompanyUserInfo/'+(pageno||1)+"?employee=1").then(res=>{
        if(res.error === false){
          this.employeepager=res.result
          this.employee=res.result.records
        }else{
          this.$Message.error(res.msg)
        }
        
      })
    },
    setInviterInfo(row){
      var param={
        id:this.currentMember.id,
        inviterId:row.accountId
      }
      console.log(row)
      var _this=this
      this.$Modal.confirm({
        title: '确认分配',
        content: '<p>确认将'+_this.currentMember.account.realName+'的邀请人设为员工:'+row.realName+'?</p>',
        onOk: () => {
            _this.http.put(_this.$store.state.prefix +'/customer/updateInviterInfo',param).then(res => {
            if(res.error === false){
              _this.$Message.success("设置成功")
              _this.getAloneMember()
              _this.employeemodal=false
              this.getEmployeeList(1)
            }else{
              _this.$Message.error(res.msg)
            }
          })
        },
        onCancel: () => {
        }
      })
      
    },
    chooseInviter(member){
      this.employeemodal=true
      this.currentMember=member
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus' rel="stylesheet/stylus">

</style>
