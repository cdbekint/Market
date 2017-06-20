<template>
  <div class = "time">
    <div class = "main_head">
      <img src="/static/images/a2.png" alt="">
    </div>
    <div class = "main_pro">
      <div class = "pro_line">
        <div class = "main_time">
          <div class = "time_count">
            <countdown :endDate="activity.endDate"></countdown>
          </div>
        </div>
        <div class = "main_title">
          <span class = "text">倒计时</span>
          <img src="/static/images/line.png" alt="">
          <span class = "english">THE COUNTDOWN</span>
        </div>
      </div>
      <div class = "pro_line line2">
        <div class = "main_time">
          <div class = "time_count">
            <progressMe :value="progress"></progressMe>
          </div>
        </div>
        <div class = "main_title">
          <span class = "text">当前进度</span>
          <img src="/static/images/line.png" alt="">
          <span class = "english">THE CURRENT PROGRESS</span>
        </div>
      </div>
      <div class = "pro_line line3">
        <div class = "main_time">
          <div class = "time_count">
            <p>当前折扣&nbsp&nbsp&nbsp&nbsp<span>{{activity.discount}}</span> &nbsp&nbsp&nbsp 折 </p>
          </div>
        </div>
        <div class = "main_title">
          <span class = "text">已参与{{activity.joinNum}}人</span>
          <img src="/static/images/line.png" alt="">
          <span class = "english">THE PARTICIPANTS NUMBER</span>
        </div>
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
        this.progress = val.progress.toFixed(2);
    }
  },
  data () {
    return {
      progress: 0
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/144px)rem
  }
  .time
    width 100%
    height rrem(684px)
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
      height rrem(674px)
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
      .line2
        top rrem(270px)
        .main_time
          .time_count
            width 95%
      .line3
        top rrem(270px + 190px)
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
