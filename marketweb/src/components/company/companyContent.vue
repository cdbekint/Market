<template>
  <div class="companyContent">

    <div class="main_title">
      <div v-for="x,index in titleImgs" @click="changeTitle(index)">
        <img :src="x.static==1?x.on:x.off">
      </div>
    </div>

    <div class="main_class" v-if="currentPage==0 && notDetail">
      <div class="class_txt">
        <span v-for="x,index in category" :style="x.state==1?{color:x.on}:{color:x.off}" @click="changeTxt(index+1)">{{x.txt}}</span>
      </div>
      <div class="class_goods">
        <div class="goods_info" v-for="x in goods" @click="showDetail(x.id,2)">
          <img :src="murl + x.img" class="info_img" @click="showDetail(x.id,2)">
          <div class="info_text">
            <span class="text_title">{{x.title}}</span>
            <span class="text_price">{{x.price}}</span>
          </div>
        </div>
      </div>
      <!--<div class="class_pull">-->
        <!--<img src="/static/images/company/pull.png" alt="">-->
      <!--</div>-->
    </div>

    <div class="main_detail" v-if="currentPage==0 && !notDetail">
      <img src="/static/images/company/fanhui.png" @click="returnGoodsList" class="detail_return">
      <div class="detail_bg" >
        <swiper v-ref:swiper
          direction="horizontal"
          :mousewheel-control="true"
          :performance-mode="false"
          :pagination-visible="true"
          :pagination-clickable="true"
          :loop="true"
          :autoplay="true">
          <div class="swiperItem" v-for="slide,index in currentGoods.images" :key="index">
            <img :src="murl+slide" alt="">
          </div>
        </swiper>
      </div>

      <div class="detail_text">
        <div class="text_main">
          <span class="main_title">{{currentGoods.name}}</span>
          <div class="main_coll">
            <span>已售{{currentGoods.saleNum}}件</span>
            <span>库存{{currentGoods.storageNum}}件</span>
          </div>
        </div>
        <div class="text_jifen">
          <img src="/static/images/jifen2.png">
          <span>{{currentGoods.price}}</span>
        </div>
      </div>
      <div class="detail_btn" @click="payGoods">立即购买</div>
      <div class="detail_html">
        <div class="bg"></div>
        <div class="txt good_details" v-html="currentGoods.desc"></div>
      </div>
    </div>

    <!-- 优惠活动 -->
    <div class="main_discount" v-if="currentPage==1" >
      <div class="discount_goods">
        <div class="goods_info" v-for="x in active" @click="goToActive(x.id)">
          <img :src="stateImgArr[x.state]" class="info_state">
          <img :src="murl + x.img" class="info_bg" @click="goToActive(x.id)">
          <div class="info_view">
            <div class="view_share">
              <img src="/static/images/company/return.png">
              <span>{{x.share}}</span>
            </div>
            <div class="view_num">
              <img src="/static/images/company/view.png">
              <span>{{x.view}}</span>
            </div>
          </div>
          <div class="info_txt">
            <div class="txt_title">
              <p>{{x.title}}</p>
            </div>
            <div class="txt_people">
              <img src="/static/images/company/pe.png">
              <span>{{x.people}}人</span>
            </div>
            <div class="txt_team">
              <img src="/static/images/company/team.png">
              <span>{{x.team}}团</span>
            </div>
          </div>
        </div>
        <!--<div class="discount_pull">-->
          <!--<img src="/static/images/company/pull.png" alt="">-->
        <!--</div>-->
      </div>
    </div>

    <!-- 会员排行 -->
    <div class="main_member" v-if="currentPage==2">
      <div class="member_hr">
        <div class="hr_1"></div>

        <div v-for="x,index in jifenCategory" :class="'hr_'+x.num"
             @click="changeJifen(index)" :style="x.state==1?{color:x.on}:{color:x.off}">{{x.txt}}</div>
      </div>
      <div class="member_list">
        <div class="member_content" v-for="x,index in member">
          <div class="list_sort" style="color:#ff017e;font-weight:bold;">{{index+1}}</div>
          <div class="list_img">
            <img :src="x.img" alt="">
          </div>
          <div class="list_jifen">
            <img src="/static/images/company/jifen.png">
            <p>余{{x.surplus}}分</p>
          </div>
          <div class="list_total">
            <img src="/static/images/company/total.png">
            <p>共{{x.total}}分</p>
          </div>
          <div class="list_people">
            <img src="/static/images/company/people.png">
            <p>邀{{x.people}}人</p>
          </div>
        </div>
      </div>
    </div>

    <div class="main_company" v-if="currentPage==3" v-html="showInfo">

    </div>


  </div>
</template>

<script type="text/ecmascript-6">
import swiper from 'vue-swiper'
export default {
  name: 'companyContent',
  props:["ids"],
  components:{swiper},
  methods:{
    returnGoodsList(){
      this.notDetail = true;
    },
    payGoods(){
      if(this.isloading)return
      this.isloading = true
      this.http.post(this.$store.state.prefix + '/pay', this.params).then((res) => {
        this.isloading = false
        if (res.error === false) {
          var row = res.result;
          var onBridgeReady = () => {
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest',{
                'appId': row.appid,
                'timeStamp': row.timeStamp,
                'nonceStr': row.nonce_str,
                'package':  row.prepay_id,
                'signType': row.sign_type,
                'paySign': row.sign
              },
              function (res) {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                  this.payState = true
                  this.$Message.success("购买成功");
                  this.$router.push('/');
                }
                else{
                  this.$Message.error("购买失败");
                }
              }
            )
          }
          if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
            }
          } else {
            onBridgeReady()
          }
        }else {
          this.$Message.error(res.msg)
        }
      })
    },
    showDetail(id,state){
      this.http.get(this.$store.state.prefix + '/goods/'+id).then((res) => {
        if(res.error == false){
          var row = res.result;
          this.currentGoods = {
            saleNum : row.saleNum,
            storageNum : row.storageNum,
            name:row.goodsName,
            price:row.goodsPrice,
            img:row.goodsImg,
            images:row.goodsImg.split(","),
            desc:this.util.escapeToHtml(row.goodsDesc),
            price:''
          }
          if(state == 1){
          //判断是否是从活动中带过来支付
            this.params = {
              businessId: this.ids.activeId,
              payType: 2,
              payAmount: 0,
              companyId: row.companyId,
              goodsId:row.id
            }
          }
          else {
            this.params = {
              businessId: 0,
              payType: 2,
              payAmount: 0,
              companyId: row.companyId,
              goodsId:row.id
            }
          }

          if(row.goodsType == 1){
            this.currentGoods.price = row.goodsPrice + "元"
          }
          else if(row.goodsType == 2){
            this.currentGoods.price = row.maxPoints + "积分"
          }
          else if(row.goodsType == 3){
            this.currentGoods.price = row.goodsPrice + "元 + "+row.maxPoints+"积分"
          }

          this.notDetail = false;
        }
      });
    },
    goToActive(id){
      var oldUrl = location.href;
      var index = oldUrl.indexOf("?");
      var state = this.util.getURLParam('state').split(",")

      var preUrl = oldUrl.slice(0,index+1);
      var state = "state=" + id + "," + window.localStorage["ownId"];

      var url = preUrl + state;
      location.href = url;
    },
    changeTitle(index){
      this.currentPage = index;
      this.titleImgs.forEach((item,i) => {
        item.static = 0;
        if(index == i){
          item.static = 1;
        }
      })
    },
    changeJifen(index){
     this.titleImgs.forEach((item,i) => {
       item.static = 0;
       if(index == i){
         item.static = 1;
       }
     })
    },
    changeTxt(index){
      debugger
      this.category.forEach((item,i) => {
        item.state = 0;
        if((index-1) == i){
          item.state = 1;
        }
      });
      this.goods = [];
      this.getGoodsByType(index);
    },
    getGoodsByType(id,url){
      if(url == void 0)
        url = '';
      this.http.get( this.$store.state.prefix + "/shop/getGoodsInfo/"+ id + url).then(res=>{
        if(res.error == false){
          res.result.forEach(item=>{
            var obj = null;
            debugger
            if(id == 1) {
              obj = {
                id:item.id,
                img: item.goodsImg.split(",")[0],
                title: item.goodsName,
                price: item.goodsPrice + "元"
              }
            }
            else if(id == 2){
              obj = {
                id:item.id,
                img: item.goodsImg.split(",")[0],
                title: item.goodsName,
                price: item.maxPoints + "积分"
              }
            }
            else if(id == 3){
              obj = {
                id:item.id,
                img: item.goodsImg.split(",")[0],
                title: item.goodsName,
                price: item.goodsPrice + "元 + "+item.maxPoints+"积分"
              }
            }

            this.goods.push(obj)
          })
        }
      })
    },
    onSlideChangeStart (currentPage) {
      console.log('onSlideChangeStart', currentPage);
    },
    onSlideChangeEnd (currentPage) {
      console.log('onSlideChangeEnd', currentPage);
    }

  },
  created(){
    var url = '';
    if(this.ids.id != void 0){
      this.showDetail(this.ids.id,1);
    };

    if(this.ids.companyId != void 0){
      url = '?companyId=' + this.ids.companyId
    }

    this.getGoodsByType(1,url);
    this.http.get( this.$store.state.prefix + "/shop/getActivities" + url).then(res=>{
      if(res.error == false){
        var row = res.result;
        row.forEach(item=>{
          var obj = {
            id:item.id,
            img:item.activityImg,
            title:item.activityName,
            view:item.viewNum,
            share:item.shareNum,
            people:item.joinNum,
            team:item.groupNum,
            state:0,
          }
          var date = Date.now();
          if(date >= item.startDate && date <= item.endDate)
            obj.state = 1;
          else if(date <= item.startDate)
            obj.state = 0;
          else if(date >= item.endDate)
            obj.state = 2;

          this.active.push(obj)
        })
      }
    })


    this.http.get( this.$store.state.prefix + "/shop/getMemsInfo" +url).then(res=>{
      if(res.error == false){
        var row = res.result;
        row.forEach(item=>{
          var obj = {
            img:item.headImg,
            surplus:item.points,
            total:item.allPoints,
            people:item.invitedMems
          }
          this.member.push(obj)
        })
      }
    })

    this.http.get( this.$store.state.prefix + "/shop/getCompanyShow" +url).then(res=>{
      if(res.error == false){
        this.showInfo = this.util.escapeToHtml(res.result.show);
      }
    })
  },
  data () {
    return {
      swiperOption:{
        autoplay: 3500,
        setWrapperSize :true,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        mousewheelControl : true,
        observeParents:true,
      },
      currentGoods:{
        saleNum:0,
        storageNum:0,
        images:[]
      },
      selectGoodsId:0,
      params: {
        businessId: 0,
        payType: 2,
        payAmount: 0,
        companyId: 0,
        goodsId:0
      },
      notDetail:true,
      currentPage:0,
      showInfo:'',
      stateImgArr:[
        "/static/images/company/start.png",
        "/static/images/company/ing.png",
        "/static/images/company/end.png"
      ],
      active:[],
      member:[],
      goods:[],
      titleImgs:[
        {
          on:"/static/images/company/titleOn/1.png",
          off:"/static/images/company/titleOff/1.png",
          static:1
        },
        {
          on:"/static/images/company/titleOn/2.png",
          off:"/static/images/company/titleOff/2.png",
          static:0
        },
        {
          on:"/static/images/company/titleOn/3.png",
          off:"/static/images/company/titleOff/3.png",
          static:0
        },
        {
          on:"/static/images/company/titleOn/4.png",
          off:"/static/images/company/titleOff/4.png",
          static:0
        }
      ],
      jifenCategory:[
        {
          txt:"剩余积分",
          state:1,
          num:2,
          on:'#ff017e',
          off:'#434343'
        },
        {
          txt:"累计积分",
          state:0,
          num:3,
          on:'#ff017e',
          off:'#434343'
        },
        {
          txt:"邀请人数",
          state:0,
          num:4,
          on:'#ff017e',
          off:'#434343'
        }
      ],
      category:[
        {
          txt:"现金商品",
          state:1,
          on:'#ff017e',
          off:'#434343'
        },
        {
          txt:"积分商品",
          state:0,
          on:'#ff017e',
          off:'#434343'
        },
        {
          txt:"现金+积分",
          state:0,
          on:'#ff017e',
          off:'#434343'
        }
      ],
      isloading:false
    }
  }
}
</script>
<style  lang='stylus' rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .companyContent
    position relative
    top rrem(50px)
    width 92.6%
    margin auto
    margin-bottom rrem(100px)
    height rrem(1640px)
    .main_title
      height rrem(80px)
      display flex
      width 100%
      div
        flex 1
        height rrem(80px)
        img
          width 100%
          height 100%
    .main_class
      width 100%
      background #fff
      margin-top rrem(8px)
      height rrem(80px)
      .class_txt
        width 56%
        margin auto
        display flex
        span
          display block
          height rrem(80px)
          text-align center
          line-height rrem(80px)
          color #000
          flex 1
      .class_goods
        width 100%
        height auto
        display flex
        flex-wrap wrap
        justify-content space-between
        .goods_info
          width rrem(490px)
          height rrem(645px)
          margin-top rrem(32px)
          img
            width 100%
            height rrem(525px)
          .info_text
            background #fff
            height rrem(128px)
            width 100%
            position relative
            span
              width 100%
              display block
              position absolute
            .text_title
              font-size rrem(35px)
              color #000
              left rrem(20px)
              top rrem(50px)
            .text_price
              left rrem(20px)
              top rrem(95px)
              color #ff017e
              font-size rrem(32px)
      .class_pull
        width 100%
        height rrem(120px)
        text-align center
        img
          margin-top rrem(30px)
          height rrem(66px)
          width rrem(222px)


    .main_discount
      width 100%
      height rrem(1500px)
      .goods_info
        width 100%
        height rrem(440px)
        margin-top rrem(30px)
        position relative
        .info_state
          position absolute
          width rrem(170px)
          height rrem(170px)
        .info_bg
          height rrem(340px)
          width 100%
        .info_txt
          width 100%
          background #fff
          height rrem(100px)
          display flex
          position relative
          img
            margin-top rrem(25px)
            margin-right rrem(15px)
            width rrem(55px)
            height rrem(50px)
          span
            position absolute
            top rrem(57px)
          .txt_title
            flex 3
            p
              margin-left rrem(30px)
              height 100%
              line-height 300%
              font-size rrem(36px)
              font-weight bold
              color #ff017e
          .txt_people
            flex 1
          .txt_team
            flex 1
        .info_view
          position absolute
          width rrem(310px)
          height rrem(55px)
          background #000
          opacity 0.35
          border-bottom-left-radius 15px
          border-top-left-radius 15px
          right 0px;
          top rrem(30px)
          display flex
          color #fff
          img
            margin-top rrem(10px)
            margin-left rrem(20px)
            width rrem(35px)
            height rrem(35px)
          span
            position absolute
            left rrem(64px)
            top rrem(30px)
          .view_share
            flex 1
            position relative
          .view_num
            flex 1
            position relative

      .discount_pull
        text-align center
        width 100%
        height rrem(120px)
        img
          margin-top rrem(30px)
          width rrem(222px)
          height rrem(66px)

    .main_member
      width 100%
      margin-bottom rrem(60px)
      .member_hr
        height rrem(100px)
        display flex
        background #fff
        div
          height rrem(100px)
          font-weight bold
          font-size rrem(26px)
          line-height rrem(100px)
          text-align center
        .hr_1
          flex 4
        .hr_2
          flex 3
        .hr_3
          flex 3
        .hr_4
          flex 3
      .member_list
        width 100%
        min-height rrem(1640px)
        background:#fff2f2
        .member_content
          display flex
          height rrem(140px)
          &:nth-child(odd)
            background #ffe9eb
          &:nth-child(even)
            background #fff2f2
          div
            text-align center
            height rrem(140px)
            line-height rrem(140px)
            img
              width rrem(50px)
              height rrem(50px)
              position absolute
              top rrem(25px)
              left rrem(90px)
            p
              height 100%
              line-height 700%
          .list_sort
            flex 2
            font-size:rrem(42px);
          .list_img
            flex 2
            position relative
            img
              position absolute
              border-radius 100%
              top rrem(24px)
              left rrem(20px)
              width rrem(95px)
              height rrem(95px)

          .list_jifen
            flex 3
            position relative
            font-size rrem(30px)
          .list_total
            flex 3
            position relative
            font-size rrem(30px)
          .list_people
            flex 3
            position relative
            font-size rrem(30px)

    .main_company
      width 100%
      margin-top rrem(40px)
      padding-top rrem(40px)
      height rrem(1600px)
      margin-bottom rrem(60px)
      background #fff
      text-align center
    .main_detail
      width 100%
      height rrem(970px)
      background #fff;
      position relative
      .detail_bg
        height rrem(600px)
        width 100%
        .swiperItem
          width:100%
          height rrem(600px)
          overflow-y:hidden
          img
            width:100%
      .detail_return
        position absolute
        top rrem(35px)
        left rrem(35px)
        width rrem(100px)
        height rrem(100px)
        z-index:2
      .detail_text
        width 93%
        height rrem(100px)
        margin rrem(40px) auto
        display flex
        .text_main
          flex 4
          span
            font-size rrem(40px)
            color #434343
            height rrem(50px)
            line-height rrem(50px)
          .main_coll
            width 100%
            height rrem(50px)
            span
              font-size rrem(30px)
              color #aeaeae
        .text_jifen
          border 2px solid #ff007e
          height rrem(80px)
          margin-top rrem(10px)
          flex 2
          border-radius 20px
          display flex
          justify-content center
          align-items center
          img
            width rrem(55px)
            height rrem(55px)
            margin-right rrem(10px)
          span
            color #ff007e
            font-weight bold
            font-size rrem(30px)
            line-height rrem(55px)
            height rrem(55px)
      .detail_btn
        width 93%
        height rrem(130px)
        line-height rrem(130px)
        text-align center
        font-weight bold
        color #fff
        margin auto
        font-size rrem(54px)
        background #ff007e
      .detail_html
        margin-top rrem(60px)
        color #fff
        width 100%
        overflow-x:hidden
        text-align center
        min-height rrem(640px)
        height:auto
        padding-top rrem(50px)
        position relative
        .bg
          z-index -1
          width 100%
          position absolute
          top 0px
          height:auto
          min-height rrem(640px)
          opacity 0.5
          background #000
        .txt
          width 100%
          padding:5px
          text-align:left
          min-height rrem(640px)
          padding-left rrem(20px)
          padding-top rrem(20px)
          background:#fff
          p
            color:#000
            line-height:1em
            img
              width:100%
              margin-top rrem(20px)
</style>
