<template>
  <div class="personPage">
    <headTitle @headCompany="getCompanyId" :companyId="currentCompanyId" :companyInfo="personInfo.company"></headTitle>
    <headMoney :Person="personInfo" @freshHead="getCompanyId"></headMoney>
    <infos :currentCompanysId='currentCompanyId'></infos>
    <div class="homeCompany_body" style="z-index:2000">
      <div class="body_company" style="border:0px"></div>
      <div class="body_company" @click="goCompany">
        <img :src="'/static/images/active/com.png'">
      </div>
    </div>
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
      this.setPointByCurrentCompany(id);
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
        if(item.id === companyId){
          this.personInfo.totalPoint=item.totalPoint
          this.personInfo.points=item.points
          this.personInfo.usedCash=item.usedCash
          this.personInfo.cashs=(item.points*item.toCashRate/100)
          this.personInfo.toCashRate=item.toCashRate
          this.personInfo.companyId=item.id
          var psesoninfo=JSON.parse(JSON.stringify(this.personInfo))
          this.personInfo=psesoninfo
        }
      })
    },
    goCompany(){
      this.$router.push({path:"/company",query:{companyId:this.currentCompanyId}});
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
            this.personInfo.cashs=(item.points*item.toCashRate/100);
            this.personInfo.toCashRate=item.toCashRate

            var person=JSON.parse(JSON.stringify(this.personInfo));
            this.personInfo=person
          }
        });
        this.personInfo.company = pointArr;
      }
    }).then(()=>{
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
    .homeCompany_body
      position fixed
      bottom rrem(50px)
      right rrem(40px)
      width rrem(330px)
      height rrem(150px)
      display flex
      justify-content space-between
      div
        width rrem(150px)
        height rrem(150px)
        border-radius 100%
        border 1px solid #ff017e
        img
          width 100%
          height 100%
</style>
