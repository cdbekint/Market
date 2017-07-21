<template>
<div class="withdrawlist">
	<div class="content-title">
      <div class="titlename">
      	<span>用户提现</span>
      </div>
      <div class="titellink">
         <Input v-model="querytext" placeholder="请输入关键字"  style="width:35%"></Input>
        <Button type="primary" icon="ios-search" @click = "getwithdrawList(1)" >查询</Button>
      </div>
 	</div>
 	<div class="content">
    <Table border :columns="listColumns" :data="listData" class="giftlistable"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pager.total" :page-size="pager.size" :current="pager.current" @on-change="changePage"></Page>
      </div>
    </div>
 	</div>
  <Modal 
      v-model="inputcaptcha"
      ok-text="false"
      cancelText="false"
      title="验证放款" >
      正在确认{{currentWithdraw.realName}}发起的{{currentWithdraw.withdrawAmount}}提现划款。
      <Input placeholder="请输入验证码" v-model="smscountdown.captcha">
        <Button slot="append" type="primary" icon="paper-airplane" v-if="smscountdown.enable" @click="getCaptcha(currentWithdraw)">发送</Button>
        <Button slot="append" icon="ios-clock-outline" v-else>{{smscountdown.timer}}秒后发送</Button>
    </Input>
    <div slot="footer">
            <Button type="error" size="large" @click="doLoan">确认放款</Button>
        </div>

    </Modal>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Withdraw',
  data () {
    return {
      listColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'realName',
          render(row){
            if(row.realName == '')
              return "<span>{{row.nickName}}</span>"
            else
              return "<span>{{row.realName}}</span>"
          }
        },
        {
          title: '头像',
          key: 'headImg',
          render (row) {
            return '<img class="goodslistavater" :src="row.headImg" style="width:40px;height:40px;"/>'
          }
        },
        {
          title: '提现内容',
          key: 'remarks'
        },
        {
          title: '提现比率(%)',
          key: 'toCashRate'
        },
        {
          title: '提现金额',
          key: 'withdrawAmount'
        },
        {
          title: '提现手续费',
          key: 'withdrawFactorage'
        },
        {
          title: '提现积分',
          key: 'withdrawPoints'
        },
        {
          title: '申请时间',
          key: 'applyDate'
        },
        {
          title: '操作',
          key: 'withdrawStatus',
          render (row){
            return '<i-button type="text" size="small" @click="getCaptcha(row)">确定放款</i-button>'
          }
        }
      ],
      listData: [],
      pager: {
        total: 1,
        pages: 1,
        current:1,
        size:12
      },
      querytext:'',
      inputcaptcha:false,
      smscountdown:{
        timer:localStorage.getItem('timer')||0,
        enable:localStorage.getItem('enable')||true,
        captcha:''
      },
      currentWithdraw:{}//当前提现信息
    }
  },
  created () {
    this.getwithdrawList(1)
    if((Date.now()-localStorage.getItem("now"))/1000>localStorage.getItem("timer")){
      this.smscountdown.enable=true
      this.smscountdown.timer=0
      localStorage.setItem('timer',0)
      localStorage.setItem('enable',true)
    }else{
      var _this=this
      this.smscountdown.enable=false
      this.smscountdown.timer=~~localStorage.getItem("timer")
      this.smscountdown.interval=setInterval(function(){
          if(_this.smscountdown.timer>0){
            _this.smscountdown.timer--
            localStorage.setItem('timer',_this.smscountdown.timer)
            localStorage.setItem('now',Date.now())
          }else{
            clearInterval(_this.smscountdown.interval)
            _this.smscountdown.enable=true
            _this.smscountdown.timer=0

            localStorage.setItem('timer',0)
            localStorage.setItem('enable',true)
          }
      },1000)
    }
  },
  methods: {
    getwithdrawList (pageNo) {
      this.http.get(this.$store.state.prefix + '/withdraw/page/' + (pageNo || 1)+"?withdrawStatus=2&withdrawType=1&nameOrPhone="+this.querytext).then(res => {
        if (res.error === false) {
          this.pager = res.result
          this.listData = res.result.records
          this.listData.forEach(item=>{
            item.applyDate = this.util.getFormatDate(item.applyDate);
          })
        }
      })
    },
    changePage (e) {
      this.getwithdrawList(e)
    },
    getCaptcha(row){
      this.currentWithdraw=row
      this.inputcaptcha=true
      if(this.smscountdown.enable==true){
      //判断上一次的倒计时是否完毕。
        this.http.post(this.$store.state.prefix+'/withdraw/sendAuthCode',{withdrawId:row.id,companyId:this.util.getCookie("companyId")}).then(res=>{
          if(res.error==false){
            this.$Message.success("验证码发送成功")
            this.smscountdown.enable=false
            this.smscountdown.timer=60
            localStorage.setItem('timer',60)
            localStorage.setItem('enable',false)
            var _this=this
            this.smscountdown.interval=setInterval(function(){
                if(_this.smscountdown.timer>0){
                  _this.smscountdown.timer--
                  localStorage.setItem('timer',_this.smscountdown.timer)
                  localStorage.setItem('now',Date.now())
                }else{
                  clearInterval(_this.smscountdown.interval)
                  _this.smscountdown.enable=true
                  _this.smscountdown.timer=0

                  localStorage.setItem('timer',0)
                  localStorage.setItem('enable',true)
                }
            },1000)
          }else{
            this.$Message.error(res.msg)
          }
        })
      }else{
        this.$Message.info("请查看手机输入验证码")
      }
      
    },
    doLoan(){
      var param={
        randomStr:this.smscountdown.captcha,
        companyId:this.util.getCookie("companyId"),
        withdrawId:this.currentWithdraw.id
      }
      if(this.smscountdown.captcha.length==0){
        this.$Message.error("请输入验证码")
        return
      }
      if(this.smscountdown.captcha.length!=6){
        this.$Message.error("验证码为6位数字")
        return
      }
      this.http.post(this.$store.state.prefix+'/withdraw/applyUserWithdraw',param).then(res=>{
        if(res.error==false){
          this.$Message.success("提现划款成功")
          this.inputcaptcha=false
          clearInterval(_this.smscountdown.interval)
          this.smscountdown.enable=true
          this.smscountdown.timer=0

          localStorage.setItem('timer',0)
          localStorage.setItem('enable',true)
          this.smscountdown.captcha=''
          this.getwithdrawList(1)
        }else{
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
</style>
