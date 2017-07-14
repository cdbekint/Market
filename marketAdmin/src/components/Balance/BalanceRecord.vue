<template>
  <div class="union">
  <div class="content-title">
    <div class="titlename">
        <span>资金流水</span>
      </div>
      <div class="titellink">
      </div>
      </div>
      <div class="content">
        <Row class="recordquery">
          <Col span="6">
            <Date-picker v-model="queryinfo.date" type="daterange" format="yyyy-MM-dd" placeholder="选择查询周期" style="width: 100%"></Date-picker>
          </Col>
          <Col span="4">
             <Radio-group v-model="queryinfo.queryType" type="button">
                <Radio label="1"><span>支出</span></Radio>
                <Radio label="2"><span>收入</span></Radio>
            </Radio-group>
          </Col>
          <Col span="4">
             <Radio-group  v-model="queryinfo.queryStatus" type="button">
                <Radio label="1"><span>成功</span></Radio>
                <Radio label="2"><span>失败</span></Radio>
            </Radio-group>
          </Col>
           <Col span="4">
             <Input  v-model="queryinfo.nameOrPhone" placeholder="姓名或者手机号"></Input>
          </Col>
           <Col span="4">
             <Button type="primary" @click="getBalanceRecord()">查询</Button>
          </Col>
        </Row>
        <Row class="recordcontent">
          <Table border :columns="balanceColumn" :data="balanceData"></Table>
          <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                  <Page :total="pager.total" :page-size="pager.size" :current="pager.current" @on-change="getBalanceRecord"></Page>
              </div>
          </div>

        </Row>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'BalanceRecord',
  data () {
    return {
      queryinfo:{
        date:[],
        queryType:1,
        queryStatus:1,
        nameOrPhone:''
      },
      balanceColumn:[
        {
            title: '序号',
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '用户',
            key: 'realName',
            render(row){
              return row.realName||row.nickName||row.account.realName||row.account.nickName
            }
          },
          {
            title: '说明',
            key: 'remarks'
          },
          {
            title: '金额',
            key: 'payAmount',
            render(row){
              if(row.payAmount != undefined){
                return row.payAmount
              }else {
                return row.withdrawAmount
              }
            }
          },
          {
            title: '积分',
            key: 'action',
            render(row){
              if(row.payPoints != undefined){
                return row.payPoints
              }else {
                return row.withdrawPoints
              }
            }
          },{
            title: '时间',
            key: 'payDate',
            render(row){
              if(row.payDate){
                return row.payDate
              }else{
                return row.successDate
              }
            }
          },
          {
            title: '状态',
            key: 'payStatus',
            render(row){
              if(row.payStatus){
                  return row.payStatus==1?'成功':'失败'
              }else{
                  return row.withdrawStatus==1?'成功':'失败'
              }
            }
          },
          {
            title: '结余',
            key: 'balance'
          }
      ],
      balanceData:[],
      pager:{
        current:1,
        total:1,
        size:12
      }

    }
  },
  methods: {
    getBalanceRecord(pageno){
      if(pageno){
        this.pager.current=pageno
      }else {
        this.pager.current=1
      }
      var param={
        startDate:this.util.getDate(this.queryinfo.date[0]),
        endDate:this.util.getDate(this.queryinfo.date[1]),
        nameOrPhone:this.queryinfo.nameOrPhone
      }
      var url=""
      if(this.queryinfo.queryType==1){
        //支出-提现
        param.withdrawStatus=this.queryinfo.queryStatus
        url="/withdraw/page/"
      }else{
        param.payStatus=this.queryinfo.queryStatus
        url="/pay/page/"
      }
      this.http.get(this.$store.state.prefix+url+this.pager.current+'?a=1'+this.util.parseParam(param)).then(res=>{
        if(res.error==false){
          res.result.records.forEach((item)=>{
            if(item.payDate){
              item.payDate=this.util.getFormatDate(item.payDate)
            }else{
              item.successDate=this.util.getFormatDate(item.successDate)
            }
          })
          this.balanceData=res.result.records
          this.pager.current=res.result.current
          this.pager.size=res.result.size
          this.pager.count=res.result.count
        }else{
          this.$Message.error(res.msg)
        }
      })
    }
  },
  watch:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus' rel="stylesheet/stylus">
.recordquery
  margin-top:10px
.recordcontent
  margin-top:10px
</style>
