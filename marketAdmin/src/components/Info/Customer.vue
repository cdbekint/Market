<template>
<div class="customerlist">
	<div class="content-title" style="margin:5px;">
      <div class="titlename">
      	<span>客户列表</span>
      </div>
      <div class="titellink">
        <span>选择类型：</span>
        <Select v-model="searchVal" slot="prepend" style="width:30%;">
          <Option value="1">会员</Option>
          <Option value="2">员工</Option>
          <Option value="3">会员加员工</Option>
        </Select>
        <Input v-model="nameOrPhone" placeholder="姓名或手机" style="width: 30%"></Input>
        <Button type="primary" icon="ios-search" @click = "search">查询</Button>
      </div>
 	</div>
  <div class="content">
    <Table border :columns="companyCol" :data="companyData" class="giftlistable"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pager.total" :page-size="pager.size" :current="pager.current" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
   <Modal
      v-model="employeemodal"
      title="选取新员工" >
    <Table highlight-row border :columns="employeeColumns" :data="employee" @on-row-click="changeEmployee"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="employeepager.total" :page-size="employeepager.size" :current="employeepager.current" @on-change="getEmployeeList"></Page>
        </div>
    </div>
    </Modal>
    <Modal
      v-model="addPointmodal"
      title="自定义加分"
      @on-ok="addPointToUser"
      >
      <Input v-model="customerPoints"></Input>
      <Icon type="information-circled"></Icon>自定义积分请输入数字
    </Modal>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Customer',
  data () {
    return {
      searchVal:'',
      nameOrPhone:'',
      companyCol:[
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '名称',
          key: 'nickName',
          render (row) {
            if(row.realName){
              return '<span v-text="row.realName"></span>'
            }else{
              return '<span v-text="row.nickName"></span>'
            }
          }
        },
        {
          title: '头像',
          key: 'headImg',
          render (row) {
            return '<img :src="row.headImg" style="width:40px;height:40px;"/>'
          }
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '消费金额',
          key: 'selfExpense'
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
          title: '员工额外积分',
          key: 'employeePoints'
        },
        {
          title: '积分',
          key: 'points'
        },
        {
          title: '会员标示',
          key: 'member',
          render(row){
            if(row.member == 1)
              return '<img src="/static/images/member.png" style="width:40px;height:40px;display: block;margin:auto;"/>'
            else
              return '<img src="/static/images/nomember.png" style="width:40px;height:40px;display: block;margin:auto;"/>'
          }
        },
        {
          title: '员工标识',
          key: 'employee',
          render(row){
            if(row.employee == 1)
              return '<img src="/static/images/huang.png" style="width:40px;height:40px;display: block;margin:auto;cursor:pointer"/>'
            else if(row.member == 1)
              return '<img src="/static/images/nohuang.png" style="width:40px;height:40px;display: block;margin:auto;cursor:pointer" @click="setEmployee(row.accountId)"/>'
            else
              return ''
          }
        },{
          title: '操作',
          key: 'action',
          render(row) {
            if(row.employee == 1) {
              return  '<i-button type="text" size="small" @click="changeCustomer(row)">客资转换</i-button>'+
              '<i-button type="text" size="small" @click="addPoints(row)">自定义加分</i-button>'

            } else {
              return '<i-button type="text" size="small" @click="addPoints(row)">自定义加分</i-button>'
            }
          }
        }

      ],
      pager: {
        total:0,
        size:12,
        current:1
      },
      companyData:[],
      currentEmployee:{},
      employeemodal:false,
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
      },
      addPointmodal:false,
      customerPoints:0
    }
  },
  created () {
    this.getList(1)
    this.getEmployeeList(1)
  },
  methods:{
    changeEmployee(row){
      var _this=this
      var param={
        accountId:this.currentEmployee.accountId,
        newAccountId:row.accountId
      }
      console.log(param)
      this.$Modal.confirm({
        title: '客资转移',
        content: '<p>确定将'+this.currentEmployee.realName+'的所有客户资源转换到'+row.realName+'名下？</p>',
        onOk: () => {
            _this.http.put(_this.$store.state.prefix + '/customer/updateEmployee2Other',param).then(res => {
              if (res.error === false) {
                _this.$Message.success('客户资源转移成功!')
                _this.getList(1)
                _this.employeemodal = false
                _this.getEmployeeList(1)
              }else{
                _this.$Message.error(res.msg)
              }
            })
        },
        onCancel: () => {
        }
      })
    },getEmployeeList(pageno){
      this.http.get(this.$store.state.prefix+'/customer/getCompanyUserInfo/'+(pageno||1)+"?employee=1").then(res=>{
        if(res.error === false){
          this.employeepager=res.result
          this.employee=res.result.records
        }else{
          this.$Message.error(res.msg)
        }

      })
    },
    setEmployee(id){

      var _this=this
      this.$Modal.confirm({
        title: '新增确认',
        content: '<p>设置为员工后将获得额外提成，确定修改？</p>',
        onOk: () => {
            _this.http.put(_this.$store.state.prefix + '/customer/updateUser2Employee',{accountId:id}).then(res => {
              if (res.error === false) {
                _this.$Message.success('设置员工成功!')
                _this.getList(1)
              }
            })
        },
        onCancel: () => {
        }
      })
    },
    changeCustomer(employee){
      this.employeemodal=true
      this.currentEmployee=employee
    },
    getList (pageNo) {
      this.companyData=[];
      this.pager={
        total:0,
        size:12,
        current:1
      };
      this.http.get(this.$store.state.prefix + '/customer/getCompanyUserInfo/' + pageNo || 1).then(res => {
        if (res.error === false) {
          this.companyData = res.result.records;
          this.pager = res.result
        }
      })
    },
    search () {
      this.companyData=[]
      this.pager={
        total:0,
        size:12,
        current:1
      }
      var url = "";
      if(this.searchVal == 1){
        url = '/customer/getCompanyUserInfo/1?member=1&employee=0&nameOrPhone='+this.nameOrPhone
      }else if(this.searchVal == 2){
        url = '/customer/getCompanyUserInfo/1?member=0&employee=1&nameOrPhone='+this.nameOrPhone
      }else{
        url = '/customer/getCompanyUserInfo/1?nameOrPhone='+this.nameOrPhone
      }
      this.http.get(this.$store.state.prefix + url).then(res => {
        if (res.error === false) {
          this.companyData = res.result.records;
          this.pager = res.result
        }
      })
    },
    changePage (e) {
      var url = "";
      if(this.searchVal == 1){
        url = '/customer/getCompanyUserInfo/'+e+'?member=1&employee=0'
      }else if(this.searchVal == 2){
        url = '/customer/getCompanyUserInfo/'+e+'?member=0&employee=1'
      }else{
        url = '/customer/getCompanyUserInfo/'+ e
      }
      this.http.get(this.$store.state.prefix + url).then(res => {
        if (res.error === false) {
          this.companyData = res.result.records;
          this.pager = res.result
        }
      })
    },
    addPoints(row){
      this.addPointmodal=true
      this.willaddPointUser=row
    },
    addPointToUser(){
      this.customerPoints=~~this.customerPoints
      var _this=this
        this.$Modal.confirm({
          title: '自定义加分',
          content: '<p>确定为'+(this.willaddPointUser.realName||this.willaddPointUser.nickName)+'自定义加分为:<span style="color:red;font-weight:bold">'+this.customerPoints+(this.customerPoints<=0?'分,且不大于0':'分')+'</span></p>',
          onOk: () => {
              _this.http.put(_this.$store.state.prefix + '/customer/updateUserPoints',{accountId:this.willaddPointUser.accountId,points:this.customerPoints}).then(res => {
                if (res.error === false) {
                  _this.$Message.success('自定义积分添加成功!')
                  this.customerPoints=0
                  this.addPointmodal=false
                  this.search()
                }
              })
        },
        onCancel: () => {
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
</style>
