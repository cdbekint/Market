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
                <Radio label="支出" value="1"></Radio>
                <Radio label="收入" value="2"></Radio>
            </Radio-group>
          </Col>
          <Col span="4">
             <Radio-group  v-model="queryinfo.queryStatus" type="button">
                <Radio label="成功" value="1"></Radio>
                <Radio label="失败" value="2"></Radio>
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
          <Table border :columns="balanceColumn" :data="balanceData" class="goodslistable"></Table>
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
            title: '商品名称',
            key: 'goodsName'
          },
          {
            title: '商品图片',
            key: 'goodsImg',
            render (row) {
              return '<img class="goodslistavater" :src="murl + row.goodsImg" v-if="row.goodsImg"/>'
            }
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
      if(this.queryinfo.queryType==1){
        //支出-提现
        param.withdrawStatus=this.queryinfo.queryStatus
      }else{
        param.payStatus=this.queryinfo.queryStatus
      }
      console.log(param)
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
