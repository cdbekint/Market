<template>
  <div class="person_infos">
    <div class="main_companyInfo">
      <div class="company_info" v-for="x,index in menuList" :class="x.active" @click="changeCompany(index)">
        <img :src="'/static/images/person/'+x.img" >
        <span>{{x.name}}</span>
      </div>
    </div>

    <!--参加的活动-->
    <div class="info_active" v-if="index==0">
      <div class="active_item" v-for="x in activityInfo.info" @click="goToActive(x.id)">
        <div class="item_img">
          <img :src="murl+x.img" v-if="x.img">
          <div class="img_down">
            <countdown :endDate="x.date" ></countdown>
          </div>
        </div>
        <span class="item_name" v-text="x.name"></span>
        <div class="item_math">
          <div class="math_jifen">
            <img src="/static/images/person/ji.png">
            <span v-text="x.jifen"></span>
          </div>
          <div class="math_jifen">
            <img src="/static/images/person/pe.png" class="math_people">
            <span v-text="x.peopleNum"></span>
          </div>
          <div class="math_jifen">
            <img src="/static/images/person/view.png" class="math_view">
            <span v-text="x.totalPeople"></span>
          </div>
        </div>
      </div>
    </div>

    <!--我的邀请-->
    <div class="info_active info_inviter" v-if="index==1">
      <div class="active_item" v-for="x,index in memberInfo.info">
        <div class="inviter_no">{{index}}</div>
        <img :src="x.img" class="inviter_head" v-if="x.img">
        <span class="item_name inviter_name" v-text="x.name"></span>
        <div class="item_math">
          <div class="math_jifen">
            <img src="/static/images/person/ji.png">
            <p v-text="x.jifen"></p>
          </div>
          <div class="math_jifen">
            <img src="/static/images/person/pe.png" class="math_people">
            <p v-text="x.peopleNum"></p>
          </div>
        </div>
      </div>
    </div>

    <!--消费记录-->
    <div class="info_active info_consume" v-if="index==2">
      <div class="active_item consume_item" v-for="x in consumeInfo.info">
        <img src="/static/images/person/success.png" class="item_state" v-if="x.payStatus==1">
        <img src="/static/images/person/err.png" class="item_state" v-else>
        <span class="item_name consume_name" v-text="x.content"></span>
        <div class="item_math">
          <div class="math_jifen">
            <p v-text="x.time"></p>
          </div>
          <div class="math_jifen math_money">
            <p v-text="x.money+'元'"></p>
          </div>
          <div class="math_jifen math_ji">
            <p v-text="x.jifen+'分'"></p>
          </div>
        </div>
      </div>
    </div>

    <!--积分记录-->
    <div class="info_active info_point" v-if="index==3">
      <div class="active_item" v-for="x in jifenInfo.info">
        <p class="item_state" v-text="x.jifen"></p>
        <span class="item_nameInfo" v-text="x.content"></span>
        <span class="item_date" v-text="x.time"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import countdown from '../Utils/activeCount.vue'
  export default {
    name: 'infos',
    props: ['datas'],
    components: { countdown },
    methods:{
      goToActive(id){
        var oldUrl = location.href;
        var index = oldUrl.indexOf("?");
        var state = this.util.getURLParam('state').split(",")

        var preUrl = oldUrl.slice(0,index+1);
        var state = "state=" + id + "," + window.localStorage["ownId"];

        var url = preUrl + state;
        location.href = url;
      },
      changeCompany (val) {
        this.index = val
//        var currentPage = this.infoArr[val];
//        if(this[currentPage].info.length >= 12 && (this[currentPage].total > this[currentPage].page)){
//          this.currentPageLimit = false;
//        }
//        else{
//          this.currentPageLimit = true;
//        }
        this.menuList.forEach((item,index)=>{
          if(index == val){
            item.img = this.on;
            item.active = this.active;
          }
          else{
            item.img = this.off;
            item.active = this.noactive;
          }
        })
      },
      requestInfoByScroll(){
        if( !this.currentPageLimit){
          var currentTitle = this.infoArr[this.index];
          var page = this[currentTitle].page+1;
          this.$emit("getMoreInfoByScroll",this.index,page);
        }
      }
    },
    created(){
      this.menu.forEach((item,index)=>{
        var obj;
        if(index == 0){
          obj = {
            name:item,
            img:this.on,
            active:this.active
          }
        }
        else{
          obj = {
            name:item,
            img:this.off,
            active:this.noactive
          }
        }
        this.menuList.push(obj)
      });
    },
    watch: {
      datas:{
        handler(val){
          this.activityInfo = val.activityInfo;
          this.memberInfo = val.memberInfo;
          this.jifenInfo = val.jifenInfo;
          this.consumeInfo = val.consumeInfo;

          if(this.activityInfo.info.length >= 12 && (this.activityInfo.total > this.activityInfo.page)){
            this.currentPageLimit = false;
          }
          else{
            this.currentPageLimit = true;
          }
        },
        deep:true
      }
    },
    data () {
      return {
        currentPageLimit:true,
        index:0,
        on:"red.png",
        off:"black.png",
        active:"active",
        noactive:"",
        menuList:[],
        menu:['参加活动','我的邀请','消费记录','积分记录'],
        infoArr:["activityInfo","memberInfo","consumeInfo","jifenInfo"],
        activityInfo:[],
        memberInfo:[],
        jifenInfo:[],
        consumeInfo:[]
      }
    }
  }
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .person_infos
    width 100%
    position relative
    background #d8006b
    padding-bottom rrem(50px)
    .main_companyInfo
      height rrem(70px)
      width 96%
      display flex
      margin auto
      .company_info
        position relative
        height 100%
        margin-right rrem(8px)
        span
          display block
          position absolute
          width 100%
          height rrem(70px)
          top rrem(35px)
          font-weight bold
          color #fff
          font-size rrem(34px)
          text-align center
        img
          width 100%
          height 100%
    .info_active
      width 96%
      background #fff
      margin auto
      margin-top rrem(14px)
      .active_item
        &:nth-child(odd)
          background #f5f5f5
        &:nth-child(even)
          background #FAFAFA
        height rrem(200px)
        display flex
        width 100%
        .item_img
          width rrem(264px)
          height rrem(134px)
          margin-left rrem(60px)
          margin-top rrem(33px)
          position relative
          img
            position absolute
            top 0px
            border-radius rrem(20px)
            height 100%
            width 100%
          .img_down
            position absolute
            bottom 0px
            text-align center
            font-size rrem(26px)
            font-weight bold
            border-bottom-left-radius rrem(20px)
            border-bottom-right-radius rrem(20px)
            line-height rrem(42px)
            height rrem(42px)
            background red
            width 100%


        .item_name
          display inline-block
          padding-top rrem(65px)
          font-size rrem(30px)
          font-weight bold
          margin-left rrem(25px)
          width rrem(220px)
          line-height 150%
          height 100%
        .item_math
          display flex
          width rrem(460px)
          .math_jifen
            flex 1
            text-align center
            img
              margin-top rrem(56px)
              height rrem(48px)
              width rrem(42px)
            span
              margin-top rrem(35px)
              display block
            p
              margin-top rrem(35px)
            .math_people
              width rrem(55px)
            .math_view
              height rrem(44px)
              width rrem(55px)


    .info_inviter
      .inviter_no
        width rrem(220px)
        text-align center
        padding-top rrem(80px)
        font-size rrem(40px)
        color #ff007e
        height 100%
        line-height 100%
      .inviter_head
        border-radius 100%
        margin-top rrem(50px)
        height rrem(95px)
        width rrem(95px)
      .inviter_name
        padding-left rrem(20px)
        margin-top rrem(15px)
    .info_consume
      .consume_item
        height rrem(100px)
        .item_state
          margin-left rrem(44px)
          margin-top rrem(30px)
          height rrem(45px)
          width rrem(95px)
        .consume_name
          width rrem(325px)
          padding 0px
          margin-left rrem(30px)
          margin-top rrem(35px)
        .item_math
          width rrem(540px)
          margin-top rrem(15px)
          .math_jifen
            flex 2
          .math_money
            flex 1
          .math_ji
            flex 2
    .info_point
      .active_item
        height rrem(100px)
        display flex
      .item_state
        flex 1
        font-size rrem(32px)
        color red
        margin-left rrem(58px)
        font-weight bold
        height 100%
        line-height 100%
        padding-top rrem(40px)
      .item_nameInfo
        font-size rrem(32px)
        font-weight bold
        margin-top rrem(55px)
        display inline-block
        flex 5
      .item_date
        text-align center
        font-size rrem(32px)
        font-weight bold
        margin-top rrem(55px)
        display inline-block
        flex 2


</style>
