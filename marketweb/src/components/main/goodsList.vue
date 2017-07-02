<template>
  <div class = "goodsListOne">
    <div class="list_parent">
      <div class="list_item" v-for="x in goodsList">
        <img :src="murl + x.img" class="item_img" @click="showGoodsDirect(x.id)">
        <div class="item_text">
          <p style="font-weight: bold;color:#434343;">{{x.name}}</p>
          <p style="color:#aeaeae;" class="text_line">{{x.price}}</p>
          <p style="color:#ff017e;">{{x.newPrice}}</p>
        </div>
        <div class="item_btn" :style="{background:stateColor[x.state]}" @click="showGoodsDetail(x.id)">{{x.btnTxt}}</div>
      </div>
    </div>
    <div class="payTimeText">
      支付时间:{{payInfo.payStartDate}}&nbsp;—&nbsp;{{payInfo.payEndDate}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsList',
  props: ['activity'],
  methods:{
    showGoodsDetail(id){
      if(this.payTime === 1) {
        this.$emit("goodsClick",id);
      }else if(this.payTime === 0){
        this.$Message.info("支付时间未到");
      } else{
        this.$Message.info("支付时间已结束");
      }
      
    },
    showGoodsDirect(id) {
       this.$emit("goodImgClick",id);
    }
  },
  watch: {
    activity:{
      handler(val){
        var showDiscount = val.discount;
        var discount = val.discount;
        discount = discount == 0?1:discount/10;
        showDiscount = showDiscount == 0?10:showDiscount;
        this.http.get(this.$store.state.prefix + '/goods/getGoodsByIds?goodsIds='+val.goodsIds).then(res => {
          this.goodsList = [];
          if(res.error == false){
            this.payInfo.payStartDate = this.util.getFormatDate (val.payStartDate,1)
            this.payInfo.payEndDate = this.util.getFormatDate(val.payEndDate,1)
            res.result.forEach(item=>{
              var obj = {
                name:item.goodsName,
                img:item.goodsImg,
                price:0,
                newPrice:0,
                state:0,
                btnTxt:'',
                id:item.id
              };
              if(item.goodsType == 1){
                obj.price = item.goodsPrice + "元"
                obj.newPrice = (item.goodsPrice * discount) + "元"
              }
              else if(item.goodsType == 2){
                obj.price = item.maxPoints + "积分"
                obj.newPrice = (item.maxPoints * discount) + "分"
              }
              else if(item.goodsType == 3){
                obj.price = item.goodsPrice + "元 + "+item.maxPoints+"积分"
                obj.newPrice = (item.goodsPrice *discount)+ "元 + " + (item.maxPoints * discount)+ "积分"
              }


              var date = Date.now();
              if(date >= val.startDate && date <= val.endDate) {

                obj.state = 1;
                if(date >= val.payStartDate && date <= val.payEndDate){
                  this.payTime = 1;
                  obj.btnTxt = (showDiscount+"折购买")
                } else if(date < val.payStartDate){
                  this.payTime = 0;
                  obj.btnTxt = ("等待开始支付")
                }else {
                  this.payTime = 2;
                  obj.btnTxt = ("已截止支付")
                }
              }else if(date <= val.startDate) {

                obj.state = 0;
                obj.btnTxt = "活动即将开始"
              }else if(date >= val.endDate) {
                obj.state = 2;
                this.payTime = 2;
                obj.btnTxt = "活动已结束"
              }
              this.goodsList.push(obj)
            })
          }else{
            this.$Message.error(res.msg);
          }
        });
      },
      deep:true
    }
  },
  data () {
    return {
      goodsList:[],
      stateColor:[
        "#1fe3a5",
        "#ff017e",
        "#aeaeae",
      ],
      payTime:0, //0即将开始，1可以支付，2支付时间结束
      payInfo:{
        payStartDate:this.util.getFormatDate(Date.now()),
        payEndDate:this.util.getFormatDate(Date.now())
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .goodsListOne
    background #FCDDE0
    width 100%
    height rrem(574px)
    position relative
    overflow scroll
    .payTimeText
      padding-top rrem(10px)
      text-align:center
      width:100%
      position absolute
      top rrem(530px)
    .list_parent
      position absolute
      overflow-x auto
      padding-right rrem(54px)
      display flex
      .list_item
        position relative
        margin-top rrem(20px)
        margin-left rrem(30px)
        background #fff
        width rrem(320px)
        height rrem(490px)
        .item_img
          height rrem(329px)
          width rrem(320px)
        .item_text
          margin-top rrem(10px)
          margin-left rrem(15px)
          width rrem(288px)
          height rrem(81px)
          p
            font-size rrem(20px)
            margin-bottom rrem(2px)
            line-height rrem(35px)
            height rrem(22px)
          .text_line
            text-decoration line-through
        .item_btn
          text-align center
          line-height rrem(58px)
          margin-left rrem(15px)
          color #fff
          font-weight bold
          font-size rrem(27px)
          background #ff017e
          height rrem(58px)
          width rrem(288px)
</style>
