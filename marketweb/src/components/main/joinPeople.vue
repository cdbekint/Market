<template>
  <div class = "joinPeople">
    <mainHead :val="value"></mainHead>
    <div class='attend-users'>
      <img src="/static/images/up.png" class = "upImg">
      <Row>
        <Col v-for = "index in 17" span='4' class='attend-users-list'>
        <div class='attend-avater'>
          <img src='https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto'>
        </div>
        <div class='attend-name'>
          杨浩
        </div>
        </Col>
        <Col span='4' class='attend-users-list'>
        <div class='attend-avater'>
          <img src='https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto'>
        </div>
        </Col>
      </Row>
      <div class="foot">
        <img src="/static/images/down.png">
      </div>
    </div>
  </div>
</template>

<script>
import mainHead from '../Utils/mainHead.vue'
export default {
  name: 'joinPeople',
  props: ['activity'],
  components: {mainHead},
  data () {
    return {
      value: {
        head: '正在参加的伙伴',
        name: this.activity.companyName,
        no: 3
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/144px)rem
  }
  .joinPeople
    width:100%
    background #fff
    .attend-users
      width:94%
      margin auto
      position relative
      .upImg
        position absolute
        top rrem(-75px)
        left rrem(20px)
        width 100%
      .attend-users-list
        padding:3px
        text-align:center
        .attend-avater
          width:rrem(150px)
          height:rrem(150px)
          margin:0 auto
          max-height:@width
          overflow-y:hidden
          display:block
          border-radius:50%
          img
            width:100%
        .attend-name
          width:100%
          overflow-x:hidden
          height:20px
          line-height:20px
          font-size:0.9em
      .foot
        img
          width 100%
          margin-top rrem(-320px)
          margin-left rrem(-30px)

</style>
