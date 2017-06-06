<template>
  <div class = "team">
    <div class = "main_head">
      <img src="/static/images/a8.png" alt="">
    </div>
    <div class = "main_pro">
      <div class = "pro_line line1">
        <div class = "main_time" @click="payMoney" style="z-index:2000">
          <div class = "time_count" >
            <p>支付 <span>{{activity.activityMoney}}</span> 元参加</p>
          </div>
        </div>
        <div class = "main_title">
          <span class = "text">参团赢折扣</span>
          <img src="/static/images/line.png" alt="">
          <span class = "english">THE COUNTDOWN</span>
        </div>
      </div>
      <div class = "pro_line line2">
        <div class = "main_time" style="z-index:2000" @click="newTeam">
          <div class = "time_count" >
            <p>新开团</p>
          </div>
        </div>
        <div class = "main_title">
          <span class = "text">组团赢积分</span>
          <img src="/static/images/line.png" alt="">
          <span class = "english">GROUP GET POINTS</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import progressMe from '../Utils/ProgressMe.vue'
export default {
  name: 'time_progress',
  components: { progressMe },
  props: ['activity'],
  data () {
    return {
      isPaying: false,
      params: {
        bussinessId: this.activity.id,
        payType: this.activity.activityType,
        payPoints: 0
      }
    }
  },
  watch: {
    activity: function (val, oldVal) {
      this.params = {
        bussinessId: val.id,
        payType: val.activityType,
        payPoints: 0
      }
    }
  },
  methods: {
    payMoney () {
      if (this.isPaying === true) {
        return
      }
      this.isPaying = true;
      var params = JSON.parse(JSON.stringify(this.params))
      console.log(params)
      this.http.post(this.$store.state.prefix + '/pay', params).then((res) => {
        this.isPaying = false
        console.log(res)
      })
    },
    newTeam () {
      console.log(123)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/144px)rem
  }
  .team
    width 100%
    height rrem(460px)
    position relative
    background #fff
    .main_head
      position absolute
      top 0px
      width 100%
      height rrem(212px)
      z-index 1000
      img
        width rrem(288px)
        height 100%
    .main_pro
      width 100%
      height rrem(460px)
      .pro_line
        width 100%
        height rrem(120px)
        position absolute
        top rrem(80px)
        .main_time
          position absolute
          left rrem(265px)
          border-radius 40px
          background #ff6b5d
          width rrem(666px)
          height 100%
          box-shadow -3px 8px 10px #c0c0c0
          .time_count
            width 88%
            height rrem(123px)
            margin auto
            line-height rrem(123px)
        .main_title
          position absolute
          left rrem(930px)
          width rrem(460px)
          top rrem(20px)
          height 100%
          span
            position absolute
          .text
            color #000
            font-size rrem(50px)
            left rrem(95px)
            top rrem(35px)
          .english
            color #e75e54
            font-size rrem(22px)
            left rrem(95px)
            top rrem(90px)
          img
            width 100%
            position absolute
            top rrem(66px)
      .line1
        .main_time
          background #ff6b5d
          .time_count
            width 95%
          p
            font-size rrem(60px)
            color #fff
            text-align center
            span
              font-size rrem(65px)
      .line2
        top rrem(270px)
        .main_time
          background #c0bebf
          .time_count
            width 95%
          p
            font-size rrem(60px)
            color #fff
            text-align center
            span
              font-size rrem(65px)
              color red

</style>
