<template>
  <div class="homePage">
    <headImg :data="personInfo" @head_company="getCompanyId"></headImg>
    <peopleMoney :data="pointAndMoney" @changePointById="changePoint"></peopleMoney>
    <infos :datas="datas"></infos>
<!--    <div class="homeCompany_body">
      <div class="body_company" @click="goCompany">
        <img src="/static/images/active/com.png">
      </div>
      <div class="body_company" @click="goHome">
        <img src="/static/images/active/home.png" alt="">
      </div>
    </div>-->
  </div>
</template>

<script type="text/ecmascript-6">
import headImg from './headImg.vue'
import peopleMoney from './peopleMoney.vue'
import infos from './infos.vue'
export default {
  name: 'homepage',
  components:{headImg,peopleMoney,infos},
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
      this.getInfosByCompanyId(id);
      this.setPointByCurrentCompany(id);
    },
    getInfosByCompanyId(companyId){

      //获取活动列表
      this.http.get(this.$store.state.prefix + "/home/getActivityInfo/" + companyId).then(res=> {
        if(res.error == false){
          var arr = [];
          res.result.forEach(item=>{
            arr.push({
              id:item.id,
              img:item.activityImg,
              name:this.util.sliceStr(item.activityName,7),
              date:item.endDate,
              jifen:item.gainPoints,
              peopleNum:item.joinNum,
              totalPeople:item.viewNum
            })
          });
          this.datas.activityInfo = arr;
        }
      })

      //获取已邀请的人
      this.http.get(this.$store.state.prefix + "/home/getInvitedMems/" + companyId).then(res=> {
        if(res.error == false){
          var arr = [];
          res.result.forEach(item=>{
            arr.push({
              img:item.headImg,
              name:this.util.sliceStr(item.nickName,7),
              jifen:item.allPoints,
              peopleNum:item.invitedMems,
              consume:item.selfExpense
            })
          });
          this.datas.memberInfo = arr;
        }
      });

      //获取交易记录
      this.http.get(this.$store.state.prefix + "/home/getUserExpense/" + companyId).then(res=> {
        if(res.error == false){
          var arr = [];
          res.result.forEach(item=>{
            var time = new Date(item.payDate);
            time = time.toLocaleString().split(",")[0];
            arr.push({
              time:time,
              content:item.remarks,
              jifen:item.payPoints,
              money:item.payAmount,
            })
          });
          this.datas.consumeInfo = arr;
        }
      });

      //获取积分记录
      this.http.get(this.$store.state.prefix + "/home/getUserPointDetails/" + companyId).then(res=> {
        if(res.error == false){
          var arr = [];
          res.result.forEach(item=>{
            var time = new Date(item.createDate);
            time = time.toLocaleString().split(" ")[0];
            arr.push({
              time:time,
              content:item.remarks,
              jifen:item.points,
              pointType:item.pointType
            })
          });
          this.datas.jifenInfo = arr;
        }
      });

    },
    setPointByCurrentCompany(companyId){
      this.pointAndMoneyArr.forEach(item=>{
        if(item.id == companyId){
          this.pointAndMoney = item;
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
        this.personInfo = {
          nickName:row.nickName,
          headImg:row.headImg,
          phone:row.phone
        };

        var companyArr = [];
        var pointArr = [];
        companys.forEach((item)=>{
          var obj = {
            name:item.companyName,
            id:item.companyId
          };

          companyArr.push(obj)

          var pointObj = {
            id:item.companyId,
            totalPoint:item.allPoints,
            points:item.points,
            usedCash:item.withDrawAmount,
            cashs:(item.points * item.toCashRate/100),
            toCashRate: item.toCashRat,
          };
          pointArr.push(pointObj)

        });
        this.personInfo.company = companyArr;
        this.pointAndMoneyArr = pointArr;

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
        company:[]
      },
      pointAndMoneyArr:[],
      pointAndMoney:{},
      datas:{
        activityInfo:[],
        memberInfo:[],
        jifenInfo:[],
        consumeInfo:[]
      }
    }
  }
}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
  rrem(val){
    return (val/45px)rem
  }
  .homePage
    width 100%
    margin-bottom 20px
</style>
