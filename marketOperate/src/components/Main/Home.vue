<template>
  <div class="companyList">
    <div class="content-title" style="margin:5px;">
      <div class="title_name" >
        <span>公司名称：</span>
        <Input v-model="searchVal.name" style="width:20%;">
        </Input>
        <span style = "margin-left:25px;">选择是否可用：</span>
        <Select v-model="searchVal.use" slot="prepend" style="width:20%;">
          <Option value="0">不可用</Option>
          <Option value="1">可用</Option>
        </Select>
        <Button type="primary" icon="ios-search" @click = "search(1)">查询</Button>
        <Tag color="blue" style="float: right;margin-right:30px;width:100px;height:30px;font-size:1.0em;line-height: 30px;">
          <router-link to="/companyAdd" tag = "span">新增公司</router-link>
        </Tag>
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
      v-model="changePwd"
      title="修改公司密码"
      @on-ok="ok"
     >
      <Input v-model="newPassword" placeholder="请输入新密码"></Input>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'company',
    data () {
      return {
        changePwd:false,
        accountId:0,
        newPassword:'',
        searchVal:{
          name:'',
          use:''
        },
        companyCol:[
          {
            title: '序号',
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '名称',
            key: 'companyName'
          },
          {
            title: 'Logo',
            key: 'companyLogo',
            render (row) {
              console.log(row)
              return '<img :src="murl + row.companyLogo" style="width:40px;height:40px;"/>'
            }
          },
          {
            title: '地址',
            key: 'companyAddr'
          },
          {
            title: '联系方式',
            key: 'smsTel'
          },
          {
            title: '一级返还积分',
            key: 'oneReturn'
          },
          {
            title: '二级返还积分',
            key: 'secondReturn'
          },
          {
            title: '提现金额',
            key: 'withdraw'
          },
          {
            title: '邀请人积分',
            key: 'invitedPoints'
          },
          {
            title: '到账日期',
            key: 'expireDate',
            render(row){
              return "<span>{{new Date(row.expireDate)}}</span>"
            }
          },
          {
            title: '操作',
            render(row){
              return '<i-button type="text" size="small" @click = "password(row.accountId)">修改密码</i-button>' +
                '<i-button type="text" size="small" @click="info(row.id)">修改信息</i-button>'
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
      ok(){
        this.http.put(this.$store.state.prefix + '/operate/resetPassword/'+this.accountId+"?password="+this.newPassword).then(res => {
          if (res.error === false) {
            this.$Message.success('修改成功!');
          }
        })
      },
      password(id){
        this.accountId = id;
        this.changePwd = true;
      },
      info(id){
        this.$router.push({
          path:"/companyEdit",
          query:{
            id:id
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
        this.http.get(this.$store.state.prefix + '/operate/getCompanyBaseInfo/' + pageNo || 1).then(res => {
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
        var url = '/operate/getCompanyBaseInfo/1?';
        if(this.searchVal.name == '' && this.searchVal.use == '')
          return;
        else{
          if(this.searchVal.name != '' && this.searchVal.use == ''){
            url = url + 'companyName='+this.searchVal.name
          }
          else if(this.searchVal.name == '' && this.searchVal.use != ''){
            url = url + 'useable='+this.searchVal.use
          }
          else{
            url = url + 'companyName='+this.searchVal.name + "&useable="+this.searchVal.use
          }
        }
        this.http.get(this.$store.state.prefix + url).then(res => {
          if (res.error === false) {
            this.companyData = res.result.records;
            this.pager = res.result
          }
        })
      },
      changePage (e) {
        this.getList(e)
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
