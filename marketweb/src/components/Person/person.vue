<template>
  <div class="personPage">
    <headTitle @headCompany="getCompanyId" :companyId="currentCompanyId" :companyInfo="personInfo.company"></headTitle>
    <headMoney :Person="personInfo"></headMoney>
    <infos :datas="datas"></infos>
  </div>
</template>

<script type="text/ecmascript-6">
import headMoney from "./headMoney.vue"
import headTitle from "./headTitle.vue"
import infos from "./infos.vue"
export default {
  name: 'homepage',
  components:{headMoney,headTitle,infos},
  methods:{
    changePoint(){
      this.$router.push({
        path:'/company',
        query:{
          companyId:this.currentCompanyId
        }
      })
    },
    getCompanyId (id) {
      this.currentCompanyId = id;
      this.getInfosByCompanyId();
      console.log('公司id为:'+id)
      this.setPointByCurrentCompany(id);
    },
    getActiveInfo(page){
      //获取活动列表
      this.http.get(this.$store.state.prefix + "/home/getActivityInfo/" + this.currentCompanyId +"/"+page).then(res=> {
        if (res.error == false) {
          var row = res.result;
          this.datas.activityInfo.info=[]
          row.records.forEach(item=> {
            var obj = {
              id: item.id,
              img: item.activityImg,
              name: this.util.sliceStr(item.activityName, 7),
              date: item.endDate,
              jifen: item.gainPoints,
              peopleNum: item.joinNum,
              totalPeople: item.viewNum
            };
            this.datas.activityInfo.info.push(obj);
          });
          this.datas.activityInfo.page = row.current;
          this.datas.activityInfo.total = row.pages;
        }
      });
    },
    getInviterInfo(page){
      //获取已邀请的人
      this.http.get(this.$store.state.prefix + "/home/getInvitedMems/" +  this.currentCompanyId +"/"+page).then(res=> {
        if(res.error == false){
          var row = res.result;
          this.datas.memberInfo.info=[]
          row.records.forEach(item=>{
            var obj = {
              img: item.headImg,
              name: this.util.sliceStr(item.realName||item.nickName, 7),
              jifen: item.allPoints,
              peopleNum: item.invitedMems,
              consume: item.selfExpense,
            };
            this.datas.memberInfo.info.push(obj);
          });
          this.datas.memberInfo.page = row.current;
          this.datas.memberInfo.total = row.pages;
        }
      });
    },

    getConsumeInfo(page){
      //获取消费记录
      this.http.get(this.$store.state.prefix + "/home/getUserExpense/" +  this.currentCompanyId +"/"+page).then(res=> {
        if(res.error == false){
          var row = res.result;
          this.datas.consumeInfo.info=[]
          row.records.forEach(item=>{
            var time = this.util.getDate(item.payDate)
            var obj = {
              time:time,
              content:this.util.sliceStr(item.remarks,8),
              jifen:item.payPoints,
              money:item.payAmount,
              page:row.current,
              payStatus:item.payStatus,
              total:row.pages
            };
            this.datas.consumeInfo.info.push(obj);
          });
          this.datas.consumeInfo.page = row.current;
          this.datas.consumeInfo.total = row.pages;
        }
      });
    },

    getUserPointInfo(page){
      //获取积分记录
      this.http.get(this.$store.state.prefix + "/home/getUserPointDetails/" +  this.currentCompanyId+"/" + page).then(res=> {
        if(res.error == false){
          var row = res.result;
          var arr = [];
          this.datas.jifenInfo.info=[]
          row.records.forEach(item=>{
            var time = this.util.getDate(item.createDate)
            var obj = {
              time:time,
              content:this.util.sliceStr(item.remarks,18),
              jifen:item.points>0?('+'+item.points):item.points,
              pointType:item.pointType
            };
            this.datas.jifenInfo.info.push(obj)
          });
          this.datas.jifenInfo.page = row.current;
          this.datas.jifenInfo.total = row.pages;
        }
      });
    },
    getInfosByCompanyId(){
      this.getActiveInfo(1)
      this.getInviterInfo(1)
      this.getConsumeInfo(1)
      this.getUserPointInfo(1)
    },
    getMoreInfo(itemNo,page){
      switch (itemNo){
        case 0 : this.getActiveInfo(page);break;
        case 1 : this.getInviterInfo(page);break;
        case 2 : this.getConsumeInfo(page);break;
        case 3 : this.getUserPointInfo(page);break;
      }
    },
    setPointByCurrentCompany(companyId){
      this.personInfo.company.forEach((item)=>{
        console.log(item)
        if(item.id==companyId){
          this.personInfo.totalPoint=item.totalPoint
          this.personInfo.points=item.points
          this.personInfo.usedCash=item.usedCash
          this.personInfo.cashs=(item.points*item.toCashRate/100)
          this.personInfo.toCashRate=item.toCashRate
          console.log(this.personInfo)
        }
      })
    }
  },
  created(){
    this.http.get(this.$store.state.prefix + "/home").then(res=>{
      if(res.error == false){
        var row = res.result.account;
        var companys = res.result.customers;

        this.currentCompanyId = companys[0].companyId;
        //当前用户的信息
        this.personInfo = {
          nickName:row.realName?row.realName:row.nickName,
          headImg:row.headImg,
          email:row.email,
          phone:row.phone,
          realName:row.realName
        };

        var pointArr = [];
        companys.forEach((item)=>{
          var obj = {
            name:item.companyName,
            id:item.companyId,
            totalPoint:item.allPoints,
            points:item.points,
            usedCash:item.withDrawAmount,
            cashs:(item.points * item.toCashRate/100),
            toCashRate: item.toCashRate,
          };
          pointArr.push(obj)
          if(item.companyId===this.currentCompanyId){
            this.personInfo.totalPoint=item.allPoints
            this.personInfo.points=item.points
            this.personInfo.usedCash=item.withDrawAmount
            this.personInfo.cashs=(item.points*item.toCashRate/100)
            this.personInfo.toCashRate=item.toCashRate
            var person=JSON.parse(JSON.stringify(this.personInfo))
            this.personInfo=person
          }
        });
        this.personInfo.company = pointArr;
      }
    }).then(()=>{
      this.getInfosByCompanyId(this.currentCompanyId);
      this.setPointByCurrentCompany(this.currentCompanyId);
    })
  },
  data () {
    return {
      currentCompanyId:0,
      personInfo:{
        nickName: '',
        headImg:'',
        phone:'',
        company:[],
        currentCompany:{}
      },
      datas:{
        activityInfo:{
          info:[]
        },
        memberInfo:{
          info:[]
        },
        jifenInfo:{
          info:[]
        },
        consumeInfo:{
          info:[]
        }
      }
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .homePage
    width 100%
    margin-bottom rrem(20px)
</style>
