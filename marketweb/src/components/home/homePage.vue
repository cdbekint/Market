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
      console.log(this.currentCompanyId);

      var oldUrl = location.href;
      var index = oldUrl.indexOf("?");
      var state = this.util.getURLParam('state').split(",")

      var preUrl = oldUrl.slice(0,index+1);
      var state = "state=" + this.currentCompanyId + "," + window.localStorage["ownId"];

      var url = preUrl + state;
      console.log(url)
      location.href = url;
    },
    getCompanyId (id) {
      this.currentCompanyId = id;
      this.getInfosByCompanyId(id);
      this.setPointByCurrentCompany(id);
    },
    getInfosByCompanyId(companyId){

      this.http.get(this.$store.state.prefix + "/home/getActivityInfo/" + companyId).then(res=> {
        if(res.error == false){
          var arr = [];
          res.result.forEach(item=>{
            arr.push({
              id:item.id,
              img:item.activityImg,
              name:item.activityName,
              date:item.endDate,
              jifen:item.gainPoints,
              peopleNum:item.joinNum,
              totalPeople:item.viewNum
            })
          });
          this.datas.activityInfo = arr;
        }
      })

      this.http.get(this.$store.state.prefix + "/home/getInvitedMems/" + companyId).then(res=> {
        if(res.error == false){
          var arr = [];
          res.result.forEach(item=>{
            arr.push({
              img:item.headImg,
              name:item.nickName,
              jifen:item.allPoints,
              peopleNum:item.invitedMems,
              consume:item.selfExpense
            })
          });
          this.datas.memberInfo = arr;
        }
      });


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

//      this.http.get(this.$store.state.prefix + "/home/getUserPointDetails/" + companyId).then(res=> {
//        if(res.error == false){
//          console.log(res)
//          var arr = [];
//          res.result.forEach(item=>{
//            arr.push({
//              img:item.headImg,
//              name:item.nickName,
//              jifen:item.points,
//              peopleNum:item.invitedMems,
//              consume:item.selfExpense
//            })
//          });
//          this.datas.jifenInfo = arr;
//        }
//      });

      console.log(this.datas)
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

        this.currentCompanyId = companys[0].id;
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
            id:item.id
          };

          companyArr.push(obj)

          var pointObj = {
            id:item.id,
            totalPoint:item.allPoints,
            points:item.points,
            usedCash:item.withDrawAmount,
            cashs:(item.points * item.toCashRate/100)
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
