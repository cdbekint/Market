<template>
  <div class = "gift2">
    <mainHead :val="value"></mainHead>
    <img src="/static/images/active/bg.png" class="main_bg">
    <div class="people_main">
      <span class="main_title">
        累积分享{{activity.shareTimes}}天到朋友圈，即可到店领取如下礼品之一
      </span>
      <div class="main_parent" v-for="x in giftlist">
        <img :src='murl + x.giftImg' v-if="x.giftImg">
        <div class="parent_desc" v-text="x.giftDesc">
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mainHead from './mainHead.vue'
  export default {
    name: 'joinPeople',
    props: ['activity'],
    components: {mainHead},
    watch: {
      activity: function (val) {
        this.http.get(this.$store.state.prefix + '/gift/getByIds/' + val.giftIds).then(res => {
          if(res.error === false){
              this.giftlist = res.result
          }
        })
      }
    },
    data () {
      return {
        value: {
          head: '赠送礼品',
          name: "PRESENT",
          no: '02'
        },
        giftlist:[]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .gift2
    width:100%
    height auto
    position relative
    background #d8006b
    overflow hidden
    .main_bg
      position absolute
      width 100%
      z-index 1
      top 0px
    .people_main
      z-index 100
      position relative
      margin auto
      width rrem(1000px)
      .main_title
        display inline-block
        height rrem(76px)
        line-height rrem(76px)
        text-align center
        width 100%
        color #fff
        font-size rrem(30px)
        font-weight bold
        background #434343
      .main_parent
        width 100%
        .parent_desc
          text-align center
          padding-top rrem(10px)
          width 100%
          background #fff
          height rrem(100px)
          line-height rrem(40px)
        img
          width 100%
</style>
