<template>
  <div class="companyList">
    <div class="content-title">
      <div class="title_name">
        <span>选择类型：</span>
        <Select v-model="searchVal.type" slot="prepend" style="width:30%;">
          <Option value="1">系统公司</Option>
          <Option value="2">模板公司</Option>
          <Option value="3">商家公司</Option>
        </Select>
        <span style = "margin-left:25px;">选择是否可用：</span>
        <Select v-model="searchVal.use" slot="prepend" style="width:30%;">
          <Option value="1">可用</Option>
          <Option value="2">不可用</Option>
        </Select>
        <Button type="primary" icon="ios-search" @click = "search(1)">查询</Button>
      </div>
    </div>
    <div class="content">
      <table border :columns="companycol" :data="companydata" class="giftlistable"></table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <page :total="pager.total" :page-size="pager.size" :current="pager.current" @on-change="changepage"></page>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'company',
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
        ],
        pager: {
          total:0,
          size:12,
          current:1
        },
        companyData:[],
      }
    },
    created () {
      this.getList(1)
    },
    methods:{
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
    }
  }
</script>

<style lang='stylus' rel="stylesheet/stylus">
  .companyList
    width 100%
    .content_title
      width 100%
      .title_name
        width 100%
        display flex
        margin 10px 0
        font-size 14px
  .ivu-table
    td,th
      text-align:center
      .giftavater
        width:100px
      height:auto
      max-height:100px
</style>
