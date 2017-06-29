<template>
  <div class = "joinPeople">
    <mainHead :val="value"></mainHead>
    <div class='attend-users'>
      <img src="/static/images/up.png" class = "upImg">
      <Row class="attend-wrapper">
        <Col v-for = "index in peoples" :key="index.id" span='4' class='attend-users-list'>
          <div class='attend-avater'>
            <img :src='index.headImg'>
          </div>
          <div class='attend-name'>
            {{index.realName||index.nickName}}
          </div>
        </Col>

        <Col span='4' class='attend-users-list' v-if="isExceed">
          <div class='attend-avater'>
            <img src='/static/images/expless.png'>
          </div>
        </Col>
        <Col span='24' v-if='peoples.length == 0' style="text-align:center;padding:10px"> 暂无人参加</Col>
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
  watch: {
    activity: function (val) {
      this.value.name = val.companyName
      if (val.joinActivityInfo === null) return
      this.peoples=[]
      this.isExceed=false
      if (val.joinActivityInfo.length >= 17) {
        this.peoples = val.joinActivityInfo.slice(0, 17);
        this.isExceed = true
      } else {
        this.peoples = val.joinActivityInfo
      }
    }
  },
  data () {
    return {
      value: {
        head: '正在参加的伙伴',
        name: null,
        no: 3
      },
      peoples: [],
      isExceed: false
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
      .attend-wrapper
        min-height:150px
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
