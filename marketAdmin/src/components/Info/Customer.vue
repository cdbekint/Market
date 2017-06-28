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
        </Input>
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
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Customer',
  data () {
    return {
      searchVal:'',
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
              return '<img src="/static/images/huang.png" style="width:40px;height:40px;display: block;margin:auto;cursor:pointer" @click="removeEmployee(row.accountId)"/>'
            else if(row.member == 1)
              return '<img src="/static/images/nohuang.png" style="width:40px;height:40px;display: block;margin:auto;cursor:pointer" @click="setEmployee(row.accountId)"/>'
            else
              return ''
          }
        }

      ],
      pager: {
        total:0,
        size:12,
        current:1
      },
      companyData:[]
    }
  },
  created () {
    this.getList(1)
  },
  methods:{
    removeEmployee(id){
      if(window.confirm('取消员工后将删除该员工所有的客户资源提成，确定修改？')) {
        this.http.put(this.$store.state.prefix + '/customer/updateEmployee2User?accountId=' + id).then(res => {
          if (res.error === false) {
            this.$Message.success('取消员工成功!')
            this.getList(1)
          }
        })
      }
    },
    setEmployee(id){
      if(window.confirm('设置为员工后将获得额外提成，确定修改？')){
        this.http.put(this.$store.state.prefix + '/customer/updateUser2Employee?accountId=' + id).then(res => {
          if (res.error === false) {
            this.$Message.success('设置员工成功!')
            this.getList(1)
          }
        })
      }
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
        url = '/customer/getCompanyUserInfo/1?member=1&employee=0'
      }else if(this.searchVal == 2){
        url = '/customer/getCompanyUserInfo/1?member=0&employee=1'
      }else{
        url = '/customer/getCompanyUserInfo/1'
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
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
</style>
