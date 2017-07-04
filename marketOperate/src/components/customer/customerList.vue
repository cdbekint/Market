<template>
  <div class="customerlist">
    <div class="content-title" style="margin:5px;">
      <div class="titlename" style="width:25%;">
        <span>客户列表</span>
      </div>
      <div class="titlelink" style="position: relative;">
        <Input v-model="companyName" @on-change="getCompanyList" placeholder="请输入公司名称" style="width: 30%;margin-right: 10px;"></Input>
        <div class="companydrowplist" v-if="showcompanylist">
          <ul>
            <li v-for="cl in companyList" @click="setCompany(cl)">
              <div class="companylogo">
                <img :src="murl+cl.companyLogo" alt="">
              </div>
              <div class="companyname" v-text="cl.companyName"></div>
            </li>
            <li v-if="companyList.length==0" style="text-align:center">暂无匹配项</li>
          </ul>
        </div>
        <span style="display: block;width:100px;">选择类型：</span>
        <Select v-model="searchVal" slot="prepend" style="width:30%;margin-top:5px;margin-right:10px;">
          <Option value="1">会员</Option>
          <Option value="2">员工</Option>
          <Option value="3">会员加员工</Option>
        </Select>
        <Input v-model="nameOrPhone" placeholder="姓名或手机" style="width: 30%;margin-right: 10px;"></Input>
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
        companyName:'',
        companyId:'',
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
        addPointmodal:false,
        companyList:[],
        showcompanylist:false,
        isGetting:false,
        customerPoints:0
      }
    },
    created () {
//      this.getList(1)
    },
    methods:{
      setCompany(company){
        this.companyId=company.id
        this.companyName=company.companyName
        this.showcompanylist=false
        this.getList(1)
      },
      getCompanyList(){
        this.isGetting=true
        if(this.companyName=='')return;
        this.showcompanylist=true
        this.http.get(this.$store.state.prefix+"/operate/getCompanyBaseInfo/1?useable=1&companyName="+this.companyName).then(res=>{
          if(res.error==false){
            this.isGetting=false
            this.companyList=res.result.records
          }
        })
      },
      getList (pageNo) {
        this.companyData=[];
        this.pager={
          total:0,
          size:12,
          current:1
        };
        this.http.get(this.$store.state.prefix + '/customer/getCompanyUserInfo/' + pageNo || 1+"?companyId="+this.companyId).then(res => {
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
          url = '/customer/getCompanyUserInfo/1?member=1&employee=0&nameOrPhone='+this.nameOrPhone+"&companyId="+this.companyId
        }else if(this.searchVal == 2){
          url = '/customer/getCompanyUserInfo/1?member=1&employee=1&nameOrPhone='+this.nameOrPhone+"&companyId="+this.companyId
        }else{
          url = '/customer/getCompanyUserInfo/1?nameOrPhone='+this.nameOrPhone+"&companyId="+this.companyId
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
          url = '/customer/getCompanyUserInfo/'+e+'?member=1&employee=0'+"&companyId="+this.companyId
        }else if(this.searchVal == 2){
          url = '/customer/getCompanyUserInfo/'+e+'?member=0&employee=1'+"&companyId="+this.companyId
        }else{
          url = '/customer/getCompanyUserInfo/'+ e+"&companyId="+this.companyId
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
    }
  }
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
  .content-title
    width 100%
    display flex
    .titlename
      width 200px
    .titlelink
      width 75%
      display flex
  .companydrowplist
    position:absolute
    width:200px
    top:40px
    left:0%
    min-height:100px
    max-height:300px
    overflow-y:auto
    z-index:1000
    border:1px solid #ccc
    background:#fff
    border-radius:5px
    ul
      li
        overflow:hidden
        display:flex
        border-bottom:1px solid #eee
        cursor:pointer
        .companylogo
          width:40px
          height:40px
          overflow:hidden
          img
            width:100%
            height:auto
        .companyname
          flex1:1
          text-align:left

</style>
