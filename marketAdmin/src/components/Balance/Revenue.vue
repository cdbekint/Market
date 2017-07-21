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
            <Date-picker v-model="queryinfo.date" type="daterange" format="yyyy-MM-dd" placeholder="选择查询周期(小于一个月)" style="width: 100%"></Date-picker>
          </Col>
       <!--    <Col span="4">
             <Radio-group v-model="queryinfo.queryType" type="button">
                <Radio label="1"><span>支出</span></Radio>
                <Radio label="2"><span>收入</span></Radio>
            </Radio-group>
          </Col> -->
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
          <Col span="4">
            <div class="summarywrapper">
              <div class="upcontent">
                <div class="allamount" v-text="~~payData.goods.allAmount+'元'"></div>
                <div class="times" v-text="payData.goods.list.length+'笔'"></div>
                <div class="downcontent">
                  商品交易
                </div>
              </div>
            </div>
          </Col>

           <Col span="4">
            <div class="summarywrapper">
              <div class="upcontent">
                <div class="allamount" v-text="~~payData.customer.allAmount+'元'"></div>
                <div class="times" v-text="payData.customer.list.length+'笔'"></div>
                <div class="downcontent">
                  自助购买
                </div>
              </div>
            </div>
          </Col>

           <Col span="4">
            <div class="summarywrapper">
              <div class="upcontent">
                <div class="allamount" v-text="~~payData.member.allAmount+'元'"></div>
                <div class="times" v-text="payData.member.list.length+'笔'"></div>
                <div class="downcontent">
                  会员注册
                </div>
              </div>
            </div>
          </Col>

          <Col span="4">
            <div class="summarywrapper">
              <div class="upcontent">
                <div class="allamount" v-text="~~payData.activity.allAmount+'元'"></div>
                <div class="times" v-text="payData.activity.list.length+'笔'"></div>
                <div class="downcontent">
                  活动交易
                </div>
              </div>
            </div>
          </Col>

          <Col span="4">
            <div class="summarywrapper">
              <div class="upcontent">
                <div class="allamount" v-text="~~payData.charge.allAmount+'元'"></div>
                <div class="times" v-text="payData.charge.list.length+'笔'"></div>
                <div class="downcontent">
                  账户充值
                </div>
              </div>
            </div>
          </Col>


          <Col span="4">
            <div class="summarywrapper">
              <div class="upcontent">
                <div class="allamount" v-text="~~payData.account.allAmount+'元'"></div>
                <div class="times" v-text="payData.account.list.length+'笔'"></div>
                <div class="downcontent">
                  账户续费
                </div>
              </div>
            </div>
          </Col>

        </Row>

        <div id="echartzone" style="margin-top:20px;height:400px;width:100%">
          
        </div>
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
      },
      payData:{
        activity:{nums:0,list:[],allAmount:0,yData:[]},
        goods:{nums:0,list:[],allAmount:0,yData:[]},
        account:{nums:0,list:[],allAmount:0,yData:[]},
        charge:{nums:0,list:[],allAmount:0,yData:[]},
        member:{nums:0,list:[],allAmount:0,yData:[]},
        customer:{nums:0,list:[],allAmount:0,yData:[]},
        chartXdata:[]
      }
    }
  },
  mounted(){
    this.echarts = require('echarts');
    this.myChart = this.echarts.init(document.getElementById('echartzone'));
  },
  methods: {
    getBalanceRecord(){
      var param={
        startDate:this.util.getDate(this.queryinfo.date[0]),
        endDate:this.util.getDate(this.queryinfo.date[1]),
        nameOrPhone:this.queryinfo.nameOrPhone,
        payStatus:this.queryinfo.queryStatus,
        pageSize:10000
      }
      if((new Date(param.endDate).getTime()-new Date(param.startDate).getTime())>31000*3600*24){
        this.$Message.info("查询日期跨度不能超过1个月")
        return
      }

      //计算查询的日期跨度周期天数
      var days=Math.ceil((new Date(param.endDate).getTime()-new Date(param.startDate).getTime())/1000/3600/24)
      this.payData.chartXdata=new Array(days)
      //生成对应天数的数组，每一个item的值为日期
      var startDate=new Date(param.startDate).getTime()
      for(var i=0;i<=days;i++){
        this.payData.chartXdata[i]=this.util.getDate(startDate)
        startDate+=1000*3600*24
      }


      this.http.get(this.$store.state.prefix+'/pay/page/1?a=1'+this.util.parseParam(param)).then(res=>{

        if(res.error==false){
            this.payData.activity.allAmount=0
            this.payData.goods.allAmount=0
            this.payData.account.allAmount=0
            this.payData.charge.allAmount=0
            this.payData.member.allAmount=0
            this.payData.customer.allAmount=0

          res.result.records.forEach((item)=>{
            switch(item.payType){
              case 1:
                this.payData.activity.list.push(item)
                this.payData.activity.allAmount+=item.payAmount
                break;
              case 2:
                this.payData.goods.list.push(item)
                this.payData.goods.allAmount+=item.payAmount
                break;
              case 3:
                this.payData.account.list.push(item)
                this.payData.account.allAmount+=item.payAmount

                break;
              case 4:
                this.payData.charge.list.push(item)
                this.payData.charge.allAmount+=item.payAmount

                break;
              case 5:
                this.payData.member.list.push(item)
                this.payData.member.allAmount+=item.payAmount

                break;
              case 6:
                this.payData.customer.list.push(item)
                this.payData.customer.allAmount+=item.payAmount
                break;
              default:
                break;
            }
          })
          var paydata=JSON.parse(JSON.stringify(this.payData))
          //活动资金
          paydata.activity.yData=Array.from({length: days}, _ => 0)
          paydata.activity.list.forEach((item)=>{
            var thisDate=this.util.getDate(item.payDate)
            for(var j in this.payData.chartXdata)
            {
              if(this.payData.chartXdata[j]==thisDate){
                paydata.activity.yData[j]+=item.payAmount
                break
              }
            }
          })

          //商品交易
          paydata.goods.yData=Array.from({length: days}, _ => 0)
          paydata.goods.list.forEach((item)=>{
            var thisDate=this.util.getDate(item.payDate)
            for(var j in this.payData.chartXdata)
            {
              if(this.payData.chartXdata[j]==thisDate){
                paydata.goods.yData[j]+=item.payAmount
                break
              }
            }
          })

          //账户续期
          paydata.account.yData=Array.from({length: days}, _ => 0)
          paydata.account.list.forEach((item)=>{
            var thisDate=this.util.getDate(item.payDate)
            for(var j in this.payData.chartXdata)
            {
              if(this.payData.chartXdata[j]==thisDate){
                paydata.account.yData[j]+=item.payAmount
                break
              }
            }
          })

          //账户充值
          paydata.charge.yData=Array.from({length: days}, _ => 0)
          paydata.charge.list.forEach((item)=>{
            var thisDate=this.util.getDate(item.payDate)
            for(var j in this.payData.chartXdata)
            {
              if(this.payData.chartXdata[j]==thisDate){
                paydata.charge.yData[j]+=item.payAmount
                break
              }
            }
          })


          //会员注册
          paydata.member.yData=Array.from({length: days}, _ => 0)
          paydata.member.list.forEach((item)=>{
            var thisDate=this.util.getDate(item.payDate)
            for(var j in this.payData.chartXdata)
            {
              if(this.payData.chartXdata[j]==thisDate){
                paydata.member.yData[j]+=item.payAmount
                break
              }
            }
          })

          //自助购买
          paydata.customer.yData=Array.from({length: days}, _ => 0)
          paydata.customer.list.forEach((item)=>{
            var thisDate=this.util.getDate(item.payDate)
            for(var j in this.payData.chartXdata)
            {
              if(this.payData.chartXdata==thisDate){
                paydata.customer.yData[j]+=item.payAmount
                break
              }
            }
          })

          this.payData=paydata
          this.payData.goods.yData=this.payData.goods.yData.map((item)=>{return parseInt(item)})
          this.payData.customer.yData=this.payData.customer.yData.map((item)=>{return parseInt(item)})
          this.payData.member.yData=this.payData.member.yData.map((item)=>{return parseInt(item)})
          this.payData.activity.yData=this.payData.activity.yData.map((item)=>{return parseInt(item)})
          this.payData.charge.yData=this.payData.charge.yData.map((item)=>{return parseInt(item)})
          this.payData.account.yData=this.payData.account.yData.map((item)=>{return parseInt(item)})

          //需要判断数据条数大于0才进行图标渲染
          var option = {
              title: {
                  text: '收益趋势',
                  subtext: param.startDate+'至'+param.endDate
              },
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  data:['商品交易','自助购买','会员注册','活动交易','账户充值','账户续费']
              },
              toolbox: {
                  show: true,
                  feature: {
                      dataZoom: {
                          yAxisIndex: 'none'
                      },
                      magicType: {type: ['line', 'bar']},
                      saveAsImage: {}
                  }
              },
              xAxis:  {
                  type: 'category',
                  boundaryGap: false,
                  data: this.payData.chartXdata
              },
              yAxis: {
                  type: 'value',
                  axisLabel: {
                      formatter: '{value}元'
                  }
              },
              series: [
                  {
                      name:'商品交易',
                      type:'line',
                      data:this.payData.goods.yData
                  },
                  {
                      name:'自助购买',
                      type:'line',
                      data:this.payData.customer.yData
                  },
                  {
                      name:'会员注册',
                      type:'line',
                      data:this.payData.member.yData
                  },
                  {
                      name:'活动交易',
                      type:'line',
                      data:this.payData.activity.yData
                  },
                  {
                      name:'账户充值',
                      type:'line',
                      data:this.payData.charge.yData
                  },
                  {
                      name:'账户续费',
                      type:'line',
                      data:this.payData.account.yData
                  }
              ]
            }
          this.myChart.setOption(option)

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
.summarywrapper
  border:1px solid #ccc
  text-align:center
  border-radius:5px
  box-shadow:2px 2px 2px #ccc
  margin:0px 5px
  height:65px
  .upcontent
    width:100%
    height:40px
    line-height:40px
    .allamount
      width:60%
      float:left
      font-size:1.2em
      font-weight:bolder
      color:red
    .times
      width:38%
      float:left
  .downcontent
    height:25px
    line-height:25px
    text-align:center
</style>
