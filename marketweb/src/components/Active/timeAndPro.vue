<template>
  <div class = "timePro">
    <div class="main_title">
      <img src="/static/images/active/title.png">
      <span>团满{{Group.mans}}人，可享受{{Group.discount}}折优惠</span>
    </div>
    <div class="main_progress">
      <progressMe :value="progress"></progressMe>
      <span>最低价格参团进度</span>
    </div>
    <div class="main_discount">
      <div class="discount_txt">
        <p>当前折扣 <span>{{discount}}</span> 折</p>
      </div>
      <div class="discount_count">
        <countdown :endDate="endDate" class="countdown"></countdown>
      </div>
    </div>
  </div>
</template>

<script>
import countdown from '../Utils/Countdown'
import progressMe from '../Utils/ProgressMe.vue'
export default {
  name: 'timeAndProgress',
  components: { countdown, progressMe },
  props: ['activity'],
  watch: {
    activity: function (val) {
      this.progress = val.progress.toFixed(2)*100
      this.discount = val.discount == '0'?10:val.discount;
      var group=JSON.parse(val.discountLevel)
      this.Group = group[group.length-1];
      this.endDate = val.endDate;
    }
  },
  data () {
    return {
      progress: 0,
      discount:0,
      endDate:0,
      Group:[{
        mans:1,
        discount:10
      }]
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .timePro
    background #434343
    width 100%
    height rrem(550px)
    .main_title
      height rrem(120px)
      width rrem(1000px)
      position relative
      margin auto
      top rrem(70px)
      img
        position absolute
        left 0px
        height 100%
        width 100%
      span
        width 100%
        text-align center
        position absolute
        font-size rrem(42px)
        font-weight bold
        top rrem(50px)
        color #fff
    .main_progress
      margin auto
      position relative
      background #262626
      border-radius rrem(60px)
      top rrem(128px)
      width rrem(720px)
      height rrem(88px)
      .progress
        height 100%
      span
        display inline-block
        color #a0a0a0
        text-align center
        height rrem(88px)
        font-size rrem(28px)
        font-weight bold
        line-height rrem(88px)
        width 100%

    .main_discount
      position relative
      top rrem(210px)
      margin auto
      display flex
      background #262626
      height rrem(120px)
      width rrem(1000px)
      div
        font-size rrem(36px)
        font-weight bold
        text-align center
        color #fff
        p
          line-height rrem(120px)
          width 100%
          height rrem(120px)
          span
            color #ff014f
      .discount_txt
        border-right 0px
        height 100%
        width rrem(350px)
        background #333333
      .discount_count
        height 100%
        width rrem(650px)
        display flex
        img
          margin-top rrem(35px)
          width rrem(44px)
          height rrem(44px)
        .countdown
          line-height rrem(120px)
          height rrem(120px)
          width 100%

</style>
