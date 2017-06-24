<template>
  <div class = "goodsListOne">
    <div class="list_parent">
      <div class="list_item" v-for="x in 6">
        <img src="/static/images/b1.png" class="item_img">
        <div class="item_text">
          <p style="font-weight: bold;color:#434343;">in潍坊新婚纱照</p>
          <p style="color:#aeaeae;" class="text_line">原价12355元</p>
          <p style="color:#ff017e;">折后8355元</p>
        </div>
        <div class="item_btn">5折购买</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsList',
  props: ['activity'],
  watch: {
    activity:{
      handler(val){
        this.http.get(this.$store.state.prefix + '/pubInfo/user').then(res => {
          if(res.error == false){

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
      goodsList:[]
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
            font-size rrem(22px)
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
