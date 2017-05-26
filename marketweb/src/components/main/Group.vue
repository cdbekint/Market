<template>
  <div class="groupUsers">
    <mainHead :val="value"></mainHead>
    <div class="group-title">
      <div class="group-title-left">
        团员姓名
      </div>
      <div class="group-title-right">
        参团时间
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="groupList">
      <ul>
        <div v-for="index in 8">
          <li>
            <div class="groupAvater">
              <img src="https://m.ems.cdbeki.com/13008187875/20170214173732C3AA0E.jpg_appCphoto" alt="">
            </div>
            <div class="groupName flex1">
              某某某的名字
            </div>
            <div class="attendDate flex1">
              2017-04-26 14:23:24
            </div>
          </li>
          <hr style="border:1px dashed #eee;">
        </div>
      </ul>
      <img src="/static/images/down.png" class="foot">
    </div>
  </div>
</template>

<script>
import mainHead from '../Utils/mainHead.vue'
export default {
  name: 'Group',
  props: ['activity'],
  components: {mainHead},
  data () {
    return {
      value: {
        head: '已入团伙伴',
        name: this.activity.companyName,
        no: 5
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/144px)rem
  }
  .groupUsers
    background:#fff
    .group-title
      width:96%
      margin auto
      background:#eee
      height:rrem(100px)
      .group-title-left,
      .group-title-right
        font-size:rrem(60px)
        font-weight bold
        width:50%
        float:left
        padding:0px 10px
        color:red
        line-height:30px
      .group-title-right
        text-align:right
    .groupList
      border 1px solid #eee
      border-bottom 0px
      padding-bottom -5px
      width:96%
      margin auto
      .foot
        width 100%
        margin-top rrem(-300px)
        margin-left rrem(-30px)
      ul
        div
          &:first-child
            .groupName
              &:before
                content: '[团长]'
                color:red
          li
            width:100%
            height:rrem(200px)
            line-height:rrem(200px)
            display:flex
            .groupAvater
              width:rrem(200px)
              padding rrem(30px) rrem(44px)
              img
                width:rrem(150px)
                height:rrem(150px)
                border-radius:50%
            .groupName,
            .attendDate
              font-size:rrem(46px)
              padding:0px rrem(30px)
            .attendDate
              text-align:right

</style>
