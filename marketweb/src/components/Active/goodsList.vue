<template>
  <div :class="[changeSkin.activeClass]">
    <div class="list_parent">
      <div class="list_item" v-for="x in goodsList">
        <img :src="murl + x.img" @click="showGoodsDirect(x.id)">
        <div class="item_txt">
          <div class="txt_name">
            <span class="name_title">{{x.name}}</span>
            <span class="name_old">原价：{{x.price}}</span>
            <span class="name_new">{{x.newPrice}}</span>
          </div>
          <div class="txt_btn" :style="{background:stateColor[x.state]}" @click="showGoodsDetail(x.id)">{{x.btnTxt}}</div>
        </div>
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
  props: ['activity','skinState'],
  methods: {
    showGoodsDetail(id) {
      if (this.payTime === 1) {
        this.$emit("goodsClick", id);
      } else if (this.payTime === 0) {
        this.$Message.info("支付时间未到");
      } else {
        this.$Message.info("支付时间已结束");
      }

    },
    showGoodsDirect(id) {
      this.$emit("goodImgClick", id);
    }
  },
  watch: {
    activity: {
      handler(val) {
        var showDiscount = val.discount;
        var discount = val.discount;
        discount = discount == 0 ? 1 : discount / 10;
        showDiscount = showDiscount == 0 ? 10 : showDiscount;
        this.http.get(this.$store.state.prefix + '/goods/getGoodsByIds?goodsIds=' + val.goodsIds).then(res => {
          this.goodsList = [];
          if (res.error == false) {
            this.payInfo.payStartDate = this.util.getFormatDate(val.payStartDate, 1)
            this.payInfo.payEndDate = this.util.getFormatDate(val.payEndDate, 1)
            res.result.forEach(item => {
              var obj = {
                name: item.goodsName,
                img: item.goodsImg,
                price: 0,
                newPrice: 0,
                state: 0,
                btnTxt: '',
                id: item.id
              };
              if (item.goodsType == 1) {
                obj.price = item.goodsPrice + "元"
                obj.newPrice = (item.goodsPrice * discount) + "元"
              }
              else if (item.goodsType == 2) {
                obj.price = item.maxPoints + "积分"
                obj.newPrice = (item.maxPoints * discount) + "分"
              }
              else if (item.goodsType == 3) {
                obj.price = item.goodsPrice + "元 + " + item.maxPoints + "积分"
                obj.newPrice = (item.goodsPrice * discount) + "元 + " + (item.maxPoints * discount) + "积分"
              }


              var date = Date.now();
              if (date >= val.startDate && date <= val.endDate) {

                obj.state = 1;
                if (date >= val.payStartDate && date <= val.payEndDate) {
                  this.payTime = 1;
                  obj.btnTxt = (showDiscount + "折购买")
                } else if (date < val.payStartDate) {
                  this.payTime = 0;
                  obj.btnTxt = ("等待开始支付")
                } else {
                  this.payTime = 2;
                  obj.btnTxt = ("已截止支付")
                }
              } else if (date <= val.startDate) {

                obj.state = 0;
                obj.btnTxt = "活动即将开始"
              } else if (date >= val.endDate) {
                obj.state = 2;
                this.payTime = 2;
                obj.btnTxt = "活动已结束"
              }
              this.goodsList.push(obj)
            })
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      deep: true
    }
  },
  data() {
    return {
      goodsList: [],
      stateColor: [
        "#1fe3a5",
        "#ff017e",
        "#aeaeae",
      ],
      payTime: 0, //0即将开始，1可以支付，2支付时间结束
      payInfo: {
        payStartDate: this.util.getFormatDate(Date.now()),
        payEndDate: this.util.getFormatDate(Date.now())
      },
      skin: 4,
      changeSkin: {
        activeClass: '',
      },
      changeStyle: {
        Money: 'goodsList2',
        Moneycolor: 'goodsList2 goodsListcolor',
      },
    }
  },
  created() {
    this.skin = this.skinState
    if (this.skin == 2 || this.skin == 3 || this.skin == 5) {
      this.changeSkin.activeClass = this.changeStyle.Moneycolor
    } else {
      this.changeSkin.activeClass = this.changeStyle.Money
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 rrem(val){
    return (val/108px)rem
  }
  .goodsList2
    height rrem(555px)
    background #434343
    width 100%
    padding-top rrem(40px)
    position relative
    overflow scroll
    .payTimeText
      position absolute
      width 100%
      text-align center
      top rrem(520px)
      left:0px
    .list_parent
      position absolute
      overflow-x auto
      height rrem(440px)
      display flex
      padding-left rrem(40px)
      .list_item
        margin-right rrem(40px)
        position relative
        height 100%
        width rrem(720px)
        img
          height rrem(326px)
          width 100%
        .item_txt
          height rrem(114px)
          background #fff
          display flex
          width 100%
          .txt_name
            height rrem(50px)
            line-height rrem(50px)
            width rrem(438px)
            font-size rrem(30px)
            padding-left rrem(20px)
            .name_title
              margin-top rrem(10px)
              display block
              color #434343
            .name_old
              display inline-block
              color #aeaeae
              margin-right rrem(15px)
              text-decoration line-through
            .name_new
              display inline-block
              color #ff007e
          .txt_btn
            background #ff007e
            text-align center
            height rrem(114px)
            line-height rrem(114px)
            color #fff
            font-weight bold
            font-size rrem(34px)
            width rrem(282px)
  .goodsListcolor
    height rrem(555px)
    background #fff
    width 100%
    padding-top rrem(40px)
    position relative
    overflow scroll
</style>
