<template>
  <div class="groupUsers">
    <mainHead :val="value"></mainHead>
    <img src="/static/images/active/bg.png" class="main_bg">
    <div class="people_main">
      <span class="main_title">已入团{{activity.joinNum}}人</span>
      <div class="main_parent">
        <div class="parent_item" v-for="x in datas">
          <img :src="x.headImg" :class="x.status">
          <span class="groupName">{{x.realName || x.nickName}}</span>
          <div class="item_date">{{x.joinDate}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainHead from './mainHead.vue'
export default {
  name: 'Group',
  props: ['activity'],
  components: {mainHead},
  watch: {
    activity: function (val) {
      if (val.groupInfo === null) return
      val.groupInfo.forEach(item=>{
        item.joinDate = this.changeDateToTime(item.joinDate);
        item.payStatus == 0 ? item.status = "gray":item.status = '';
      });
      this.datas=[]
      if (val.groupInfo.length >= 10) {
        this.datas = val.groupInfo.slice(0, 10)
      }
      else {
        this.datas = val.groupInfo
      }
    }
  },
  data () {
    return {
      value: {
        head: '已入团伙伴',
        name: "MEMBER",
        no:"03"
      },
      datas: []
    }
  },
  methods: {
    changeDateToTime(date){
      var newDate = new Date(date).toJSON();
      var index = newDate.indexOf("T");
      return newDate.slice(0,index)
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .gray {
    filter: grayscale(80%);
    filter: gray;
  }
  .groupUsers
    width 100%
    background #d8006b
    overflow hidden
    position relative
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
        min-height rrem(150px)
        width 100%
        background #fff
        .parent_item
          display flex
          height rrem(150px)
          position relative
          font-size rrem(36px)
          border-bottom rrem(3px) solid #aeaeae
          &:first-child
            .groupName
              &:before
                content: '[团长] '
                color:red
          img
            margin-top rrem(15px)
            margin-left rrem(30px)
            border-radius 100%
            width rrem(120px)
            height rrem(120px)
          span
            display block
            margin-left rrem(30px)
            height rrem(150px)
            line-height rrem(150px)
          .item_date
            position absolute
            right rrem(30px)
            height rrem(150px)
            line-height rrem(150px)

</style>
