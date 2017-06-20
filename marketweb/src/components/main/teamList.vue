<template>
  <div class="teamList">
    <div class="groupList">
      <ul>
        <div v-for="index in 1">
          <img src="/static/images/up.png" class = "upImg">
          <li>
            <div class="head">
              <img src="https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto" alt="">
              <span>杨浩</span>
            </div>
            <div class = "content">
              <p>杨浩正在邀请你参加本次活动，</p>
              <p>现在已经有344人参加。</p>
            </div>
            <div class = "btn">
              <img src="/static/images/min.png">
              <span>加入TA的团</span>
            </div>
          </li>
          <img src="/static/images/down.png" class="foot">
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teamList',
  props: ['activity'],
  watch: {
    activity: function (val, oldVal) {
      this.params = {
        bussinessId: val.id,
        payType: val.activityType,
        payPoints: 0
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/144px)rem
  }
  .teamList
    background:#fff
    margin-top rrem(40px)
    padding-bottom rrem(120px)
    .groupList
      width:96%
      margin auto
      .foot
        width 100%
        margin-top rrem(-337px)
        margin-left rrem(-30px)
        z-index -1
      ul
        div
          margin-bottom rrem(20px)
          position relative
          .upImg
            position absolute
            top rrem(-75px)
            left rrem(20px)
            width 100%
          li
            width:100%
            height:rrem(255px)
            position relative
            .head
              width:rrem(200px)
              padding-left rrem(30px)
              span
                display inline-block
                font-size rrem(50px)
                width rrem(160px)
                height rrem(100px)
                line-height rrem(100px)
                text-align center
              img
                width:rrem(150px)
                height:rrem(150px)
                border-radius:50%
                display block
                margin auto
            .content
              position absolute
              top rrem(20px)
              left rrem(310px)
              width rrem(800px)
              height rrem(130px)
              font-size rrem(50px)
              text-align center
              line-height rrem(75px)
            .btn
              position absolute
              left rrem(874px)
              top rrem(165px)
              width rrem(500px)
              height rrem(100px)
              img
                width rrem(500px)
                height rrem(100px)
              span
                color #fff
                position absolute
                top rrem(6px)
                left rrem(70px)
                font-size rrem(50px)
                display inline-block
                width rrem(350px)
                height rrem(100px)
                line-height rrem(100px)
                text-align center
                position absolute


</style>
