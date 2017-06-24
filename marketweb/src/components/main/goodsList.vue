<template>
  <div class = "goodsListOne">
    <div class="list_parent">
      <div class="list_item" v-for="x in goodsList">
        <img :src="murl + x.img" class="item_img">
        <div class="item_text">
          <p style="font-weight: bold;color:#434343;">{{x.name}}</p>
          <p style="color:#aeaeae;" class="text_line">{{x.price}}</p>
          <p style="color:#ff017e;">{{x.newPrice}}</p>
        </div>
        <div class="item_btn" :style="{background:stateColor[x.state]}" @click="showGoodsDetail(x.id)">{{x.btnTxt}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsList',
  props: ['activity'],
  methods:{
    showGoodsDetail(id){
      this.$emit("goodsClick",id);
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
                obj.newPrice = (item.maxPoints * discount) + "元"
              }
              else if(item.goodsType == 3){
                obj.price = item.goodsPrice + "元 + "+item.maxPoints+"积分"
                obj.newPrice = (item.goodsPrice *discount)+ "元 + " + (item.maxPoints * discount)+ "积分"
              }


              var date = Date.now();
              if(date >= val.startDate && date <= val.endDate) {

                obj.state = 1;
                obj.btnTxt = (showDiscount+"折购买")
              }else if(date <= val.startDate) {

                obj.state = 0;
                obj.btnTxt = "活动即将开始"
              }else if(date >= val.endDate) {

                obj.state = 2;
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
      ]
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
    height rrem(534px)
    position relative
    overflow scroll
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
