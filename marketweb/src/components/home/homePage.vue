<template>
  <div class="homePage">
    <headImg :data="personInfo" @head_company="getCompanyId"></headImg>
    <peopleMoney :data="pointAndMoney" @changePointById="changePoint"></peopleMoney>
    <infos :datas="datas" @getMoreInfoByScroll="getMoreInfo"></infos>
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
      this.getInfosByCompanyId();
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
              name: this.util.sliceStr(item.nickName, 7),
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
            var time = new Date(item.payDate);
            time = time.toLocaleString().split(",")[0];
            var obj = {
              time:time,
              content:item.remarks,
              jifen:item.payPoints,
              money:item.payAmount,
              page:row.current,
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
            var time = new Date(item.createDate);
            time = this.util.sliceStr(time.toLocaleString().split(",")[0],10,'');
            var obj = {
              time:time,
              content:item.remarks,
              jifen:item.points,
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
    return (val/45px)rem
  }
  .homePage
    width 100%
    margin-bottom 20px
</style>
