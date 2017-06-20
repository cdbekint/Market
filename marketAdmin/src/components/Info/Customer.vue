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
        </Select>
        </Input>
        <Button type="primary" icon="ios-search" @click = "search(1)">查询</Button>
      </div>
 	</div>
  <div class="content">
    <Table border :columns="companyCol" :data="companyData" class="giftlistable"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pager.totalPage" :current="pager.pageNo" @on-change="changePage($event)"></Page>
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
            if(row.realName != void 0){
              return '<span>{{row.realName}}</span>'
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
          title: '员工标示',
          key: 'employee',
          render(row){
            if(row.employee == 1)
              return '<img src="/static/images/huang.png" style="width:40px;height:40px;display: block;margin:auto;"/>'
            else
              return '<img src="/static/images/nohuang.png" style="width:40px;height:40px;display: block;margin:auto;"/>'
          }
        },
        {
          title: '操作',
          key: 'action',
          render (row) {
            if(row.member == 1 && row.employee == 1)
              return '<i-button type="text" size="small" @click = "removeEmployee(row.accountId)">取消员工</i-button>'
            else if(row.member == 1 && row.employee == 0)
              return '<i-button type="text" size="small" @click = "setEmployee(row.accountId)">设置为员工</i-button>'
            else if(row.member == 0 && row.employee == 0)
              return '<span></span>'
          }
        }

      ],
      pager: {
        totalPage: 1,
        pageNo: 1
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
      this.http.get(this.$store.state.prefix + '/customer/getCompanyUserInfo/' + pageNo || 1).then(res => {
        if (res.error === false) {
          this.pager.totalPage = res.result.totalPage
          this.pager.pageNo = res.result.pageNo
          this.companyData = res.result.records;
        }
      })
    },
    search (pageNo) {
      var url = this.searchVal == 1 ? '/customer/getCompanyUserInfo/1?member=1&employee=0':'/customer/getCompanyUserInfo/1?member=0&employee=1';
      this.http.get(this.$store.state.prefix + url).then(res => {
        if (res.error === false) {
          this.pager.totalPage = res.result.totalPage
          this.pager.pageNo = res.result.pageNo
          this.companyData = res.result.records;
        }
      })
    },
    changePage (e) {
      this.getList(e)
    }
  }

}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.customerlisttable
  .customeravater
    width:40px
    height:auto
    max-height:40px
</style>
