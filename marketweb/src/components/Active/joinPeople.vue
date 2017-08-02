<template>
  <div :class="[changeSkin.activeClass]">
    <mainHead :val="changeSkin.realValue"></mainHead>
    <img :src="changeSkin.realBgURl" class="main_bg">
    <div class="people_main">
      <span class="main_title">已参与{{activity.joinNum}}人</span>
      <div class="main_parent">
        <div class="parent_item" v-for="x in peoples">
          <img :src="x.headImg">
          <span>{{x.realName || x.nickName}}</span>
        </div>
        <div class="parent_item" v-if="isExceed">
          <img src="/static/images/sheng.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainHead from './mainHead.vue'
export default {
  name: 'joinPeople',
  props: ['activity','skinState'],
  components: { mainHead },
  watch: {
    activity: function (val) {
      if (val.joinActivityInfo === null) return
      this.peoples = []
      this.isExceed = false
      if (val.joinActivityInfo.length >= 17) {
        this.peoples = val.joinActivityInfo.slice(0, 17);
        this.isExceed = true
      } else {
        this.peoples = val.joinActivityInfo
      }
    }
  },
  data() {
    return {
      value: {
        head: '以参与伙伴',
        name: "PARTNER",
        no: '01'
      },
      valueColor: {
        head: '以参与伙伴',
        name: "PARTNER",
        no: 'b01'
      },
      valueBlue: {
        head: '以参与伙伴',
        name: "PARTNER",
        no: 'c01'
      },
      valueGolden: {
        head: '以参与伙伴',
        name: "PARTNER",
        no: 'd01'
      },
      valuePink: {
        head: '以参与伙伴',
        name: "PARTNER",
        no: 'e01'
      },
      bgUrl: {
        bg: require('../../../static/images/active/bg.png'),
        bgColor: require('../../../static/images/active/bg1.png'),
        bgBlue: require('../../../static/images/active/bg2.png'),
        bgGolden: require('../../../static/images/active/bg3.png'),
        bgPink: require('../../../static/images/active/bg4.png')
      },
      peoples: [],
      isExceed: false,
      changeStyle: {
        joinPeople2: 'joinPeople2',
        joinPeoplecolor: 'joinPeoplecolor',
        joinPeoplepink: 'joinPeoplepink',
        joinPeoplegolden: 'joinPeoplegolden',
        joinPeopleblue: 'joinPeopleblue'
      },
      changeSkin: {
        activeClass: '',
        realValue: {},
        realBgUrl: {}
      },
      skin: 4
    }
  },
  created() {
    this.skin = this.skinState
    if (this.skin == 1) {
      this.changeSkin.activeClass = this.changeStyle.joinPeople2
      this.changeSkin.realValue = this.value
      this.changeSkin.realBgUrl = this.bgUrl.bg
    } else if (this.skin == 2) {
      this.changeSkin.activeClass = this.changeStyle.joinPeoplecolor
      this.changeSkin.realValue = this.valueColor
      this.changeSkin.realBgUrl = this.bgUrl.bgColor
    } else if (this.skin == 3) {
      this.changeSkin.activeClass = this.changeStyle.joinPeoplepink
      this.changeSkin.realValue = this.valuePink
      this.changeSkin.realBgUrl = this.bgUrl.bgPink
    } else if (this.skin == 4) {
      this.changeSkin.activeClass = this.changeStyle.joinPeoplegolden
      this.changeSkin.realValue = this.valueGolden
      this.changeSkin.realBgUrl = this.bgUrl.bgGolden
    } else if (this.skin == 5) {
      this.changeSkin.activeClass = this.changeStyle.joinPeopleblue
      this.changeSkin.realValue = this.valueBlue
      this.changeSkin.realBgUrl = this.bgUrl.bgBlue
    } else {
      this.changeSkin.activeClass = this.changeStyle.joinPeople2
      this.changeSkin.realValue = this.value
      this.changeSkin.realBgUrl = this.bgUrl.bg
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
rrem(val){
    return (val/108px)rem
  }
  .joinPeople2
    width 100%
    background #d8006b
    position relative
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
        min-height rrem(256px)
        display flex
        flex-wrap wrap
        background #fff
        width 100%
        .parent_item
          height rrem(256px)
          width rrem(166px)
          text-align center
          img
            margin-top rrem(55px)
            border-radius 100%
            height rrem(120px)
            width rrem(120px)
          span
            font-size rrem(36px)
            margin-top rrem(35px)
            display block
  .joinPeopleblue
    width 100%
    background #fff
    position relative
    overflow hidden
    .main_bg
      position absolute
      width 100%
      z-index 1
      top 0px
      box-shadow 0px 0px 30px 10px rgba(0,0,0,.2)
    .people_main
      z-index 100
      position relative
      margin auto
      width rrem(1002px)
      .main_title
        display inline-block
        height rrem(76px)
        line-height rrem(76px)
        text-align center
        width 100%
        color #fff
        font-size rrem(30px)
        font-weight bold
        background #0089da
      .main_parent
        border 1px solid #ccc
        min-height rrem(256px)
        display flex
        flex-wrap wrap
        background #fff
        width 100%
        .parent_item
          height rrem(256px)
          width rrem(166px)
          text-align center
          img
            margin-top rrem(55px)
            border-radius 100%
            height rrem(120px)
            width rrem(120px)
          span
            font-size rrem(36px)
            margin-top rrem(35px)
            display block    
  .joinPeoplecolor
    width 100%
    background #fff
    position relative
    overflow hidden
    .main_bg
      position absolute
      width 100%
      z-index 1
      top 0px
      box-shadow 0px 0px 30px 10px rgba(0,0,0,.2)
    .people_main
      z-index 100
      position relative
      margin auto
      width rrem(1002px)
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
        border 1px solid #ccc
        min-height rrem(256px)
        display flex
        flex-wrap wrap
        background #fff
        width 100%
        .parent_item
          height rrem(256px)
          width rrem(166px)
          text-align center
          img
            margin-top rrem(55px)
            border-radius 100%
            height rrem(120px)
            width rrem(120px)
          span
            font-size rrem(36px)
            margin-top rrem(35px)
            display block     
  .joinPeoplegolden
    width 100%
    background #fff
    position relative
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
      width rrem(1002px)
      .main_title
        display inline-block
        height rrem(76px)
        line-height rrem(76px)
        text-align center
        width 100%
        color #434343
        font-size rrem(30px)
        font-weight bold
        background linear-gradient(to right,#f2e0b2 50%, #d3bc89)
      .main_parent
        border 1px solid #ccc
        min-height rrem(256px)
        display flex
        flex-wrap wrap
        background #fff
        width 100%
        .parent_item
          height rrem(256px)
          width rrem(166px)
          text-align center
          img
            margin-top rrem(55px)
            border-radius 100%
            height rrem(120px)
            width rrem(120px)
          span
            font-size rrem(36px)
            margin-top rrem(35px)
            display block       
  .joinPeoplepink
    width 100%
    background #fff
    position relative
    overflow hidden
    .main_bg
      position absolute
      width 100%
      z-index 1
      top 0px
      box-shadow 0px 0px 30px 10px rgba(0,0,0,.2)
    .people_main
      z-index 100
      position relative
      margin auto
      width rrem(1002px)
      .main_title
        display inline-block
        height rrem(76px)
        line-height rrem(76px)
        text-align center
        width 100%
        color #fff
        font-size rrem(30px)
        font-weight bold
        background #ff017e
      .main_parent
        border 1px solid #ccc
        min-height rrem(256px)
        display flex
        flex-wrap wrap
        background #fff
        width 100%
        .parent_item
          height rrem(256px)
          width rrem(166px)
          text-align center
          img
            margin-top rrem(55px)
            border-radius 100%
            height rrem(120px)
            width rrem(120px)
          span
            font-size rrem(36px)
            margin-top rrem(35px)
            display block                        
</style>
