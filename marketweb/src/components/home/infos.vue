<template>
  <div class='infos' id="infos">
    <div class="main_companyInfo">
      <div class="main_company">
        <div class="company_info" v-for="x,index in menuList" :class="x.active" @click="changeCompany(index)">
          <img :src="'/static/images/'+x.img" >
          <span>{{x.name}}</span>
        </div>
      </div>
    </div>
    <div class="main_info">
      <div class="info_jifen info_active" v-for="x in activityInfo.info" v-if="index==0" @click="goToActive(x.id)">
        <img :src="murl + x.img" class="jifen_img  active_img">
        <div class="jifen_name active_name">
          <span class="name_head active_head">{{x.name}}</span>
          <div class="active_info">
            <countdown :endDate="x.date"></countdown>
          </div>
        </div>
        <div class="jifen_operator active_operator">
          <div class="oper_one">
            <img src="/static/images/black/ji.png">
            <span>{{x.jifen}}</span>
          </div>
          <div class="oper_one">
            <img src="/static/images/black/pe.png">
            <span>{{x.peopleNum}}</span>
          </div>
          <div class="oper_one">
            <img src="/static/images/black/jiao.png">
            <span>{{x.totalPeople}}</span>
          </div>
        </div>
      </div>

      <div class="info_jifen info_people" v-for="x in memberInfo.info" v-if="index==1">
        <img :src="x.img" class="jifen_img  people_img">
        <div class="jifen_name people_name">
          <span class="name_head people_head">{{x.name}}</span>
        </div>
        <div class="jifen_operator people_operator">
          <div class="oper_one">
            <img src="/static/images/blue/ji.png">
            <span>{{x.jifen}}</span>
          </div>
          <div class="oper_one">
            <img src="/static/images/blue/pe.png">
            <span>{{x.peopleNum}}</span>
          </div>
          <div class="oper_one">
            <img src="/static/images/blue/mo.png">
            <span>{{x.consume}}</span>
          </div>
        </div>
      </div>

      <div class="info_jifen info_count" v-if="index==2">
        <div class="count_main">
          <div class="div_text main_time">时间</div>
          <div class="main_content div_text">内容</div>
          <div class="main_jifen div_text">
            <img src="/static/images/blue/ji.png">
            <div>&nbsp&nbsp+ &nbsp&nbsp</div>
            <img src="/static/images/red/mo.png">
          </div>
        </div>
        <div class="count_main count_list" v-for="x in consumeInfo.info">
          <div class="div_text main_time">{{x.time}}</div>
          <div class="main_content div_text">{{x.content}}</div>
          <div class="main_jifen div_text">
            <span>{{x.jifen}}</span>
            <span class="jifen_money">{{x.money}}</span>
          </div>
        </div>
      </div>

      <div class="info_jifen" v-if="index==3">
        <ul class="pointrecords">
          <li v-for="x in jifenInfo.info">
            <div class="r_points" v-text="x.jifen"></div>
            <div class="r_remarks" v-text="x.content"></div>
            <div class="r_date" v-text="x.time"></div>
          </li>
        </ul>
      </div>
    </div>

    <div class="discount_pull" v-if="!currentPageLimit">
      <img src="/static/images/company/pull.png"  @click="requestInfoByScroll">
    </div>
  </div>
</template>

<script>
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
        var currentPage = this.infoArr[val];
        if(this[currentPage].info.length >= 12 && (this[currentPage].total > this[currentPage].page)){
          this.currentPageLimit = false;
        }
        else{
          this.currentPageLimit = true;
        }
        this.menuList.forEach((item,index)=>{
          if(index == val){
            item.img = this.on;
            item.active = this.active;
          }else{
            item.img = this.off;
            item.active = this.noactive;
          }
        })
        this.$emit("head_company",val);
      },
      requestInfoByScroll(){
        if( !this.currentPageLimit){
          var currentTitle = this.infoArr[this.index];
          console.log(currentTitle)
          var page = this[currentTitle].page+1;
          console.log(page)
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
        on:"boff.png",
        off:"bon.png",
        active:"active",
        noactive:"",
        menuList:[],
        menu:['参加活动','我的邀请','消费记录','积分记录'],
        infoArr:["activityInfo","memberInfo","consumeInfo","jifenInfo"],
        activityInfo:{},
        memberInfo:{},
        jifenInfo:{},
        consumeInfo:{}
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/45px)rem
  }
  .infos
    width 100%
    margin-top rrem(2px)
    position relative
    .main_companyInfo
      overflow hidden
      .main_company
        position absolute
        top 0px
        height rrem(30px)
        width 100%
        overflow-x auto
        overflow-y hidden
        display flex
        border-bottom 1px solid #ededed
        .company_info
          position relative
          width rrem(106px)
          height 100%
          span
            display block
            position absolute
            width rrem(90px)
            height rrem(35px)
            top rrem(16px)
            left rrem(20px)
            color #fff
            font-size rrem(16px)
            text-align center
          img
            width rrem(130px)
            height 100%
    .main_info
      width 96%
      margin rrem(0px) auto
      .info_jifen
        width 100%
        background #ebebeb
        border-radius 10px
        position relative
        top rrem(35px)
        margin-bottom rrem(6px)
        .pointrecords
          li
            height rrem(30px)
            line-height rrem(30px)
            display:flex
            border-bottom:dashed 1px #fff
            .r_points
              flex:1
              text-align:center
              font-weight:bolder
              color:red
            .r_remarks
              flex:3
              overflow:hidden
            .r_date
              flex:1
              text-align:center
        .jifen_img
          width rrem(60px)
          height rrem(60px)
          margin-top rrem(4px)
          margin-left rrem(10px)
          border-radius 100%
        .jifen_name
          width rrem(150px)
          height 100%
          position absolute
          top 0px
          left rrem(60px)
          span
            width 100%
            height 50%
            text-align center
            position absolute
            display block
          .name_head
            font-size rrem(15px)
            font-weight bold
            top rrem(20px)
          .jifen_head
            top rrem(35px)
            font-size rrem(18px)
          .name_info
            color rgba(0, 0, 0, 0.5)
            text-overflow ellipsis
            white-space: nowrap;
            overflow hidden
            top rrem(35px)
            padding-top rrem(10px)

        .jifen_operator
          position absolute
          top 0px
          left rrem(180px)
          width rrem(250px)
          height 100%
          display flex
          .oper_one
            flex 1
            height 100%
            img
              display block
              margin auto
              margin-top rrem(7px)
              height rrem(23px)
              width rrem(23px)
            span
              display block
              text-align center
              margin-top rrem(18px)
      .info_active
        background #f2f0f1
        .active_img
          border-radius rrem(5px)
          width rrem(85px)
          height rrem(60px)
          margin-left rrem(344px)
        .active_name
          width rrem(155px)
          left rrem(10px)
          .active_head
            top rrem(25px)
            font-size rrem(18px)
          .active_info
            position absolute
            width 90%
            left 5%
            height rrem(22px)
            line-height rrem(22px)
            text-align center
            border-radius 20px
            top rrem(40px)
            color red
            border 1px solid #787677
            border-bottom 0px
            border-right 0px
        .active_operator
          width rrem(180px)
          left rrem(160px)
      .info_people
        background #ebebeb
        .people_img
          margin-left rrem(365px)
        .people_name
          left rrem(220px)
          .people_head
            top rrem(35px)
            font-size rrem(20px)

        .people_operator
          left rrem(10px)
          width rrem(240px)

      .info_count
        .count_main
          background #e1e1e1
          height rrem(35px)
          width 100%
          display flex
          .div_text
            height rrem(35px)
            line-height rrem(35px)
            text-align center
            font-size rrem(16px)
            font-weight bold
          .main_time
            flex 2
          .main_content
            flex 4
          .main_jifen
            flex 3
            display flex
            align-items: center;
            justify-content: center;
            img
              height rrem(25px)
              width rrem(25px)
        .count_list
          margin-top rrem(8px)
          margin-bottom rrem(7px)
          .div_text
            overflow hidden
            text-overflow ellipsis
            white-space: nowrap;
            font-size rrem(12px)
            font-weight 100
            color #000
          .main_jifen
            position relative
            span
              display block
              width rrem(40px)
              font-size rrem(13px)
              position absolute
              left rrem(25px)
            .jifen_money
              position absolute
              left rrem(77px)


    .discount_pull
      text-align center
      width 100%
      height rrem(30px)
      margin-top rrem(30px)
      img
        margin rrem(20px) 0px
        width rrem(105px)
        height rrem(31px)
</style>
