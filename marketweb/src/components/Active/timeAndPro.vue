<template>
  <div :class="[changeSkin.activeClass]">
    <div class="main_title">
      <img :src="changeSkin.realBgUrl">
      <span>团满{{Group.mans}}人，可享受{{Group.discount}}折优惠</span>
    </div>
    <div class="main_progress">
      <progressMe :value="progress"></progressMe>
      <span>最低价格参团进度</span>
    </div>
    <div class="main_discount">
      <div class="discount_txt">
        <p>当前折扣
          <span>{{discount}}</span> 折</p>
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
      this.progress = val.progress.toFixed(2) * 100
      this.discount = val.discount == '0' ? 10 : val.discount;
      var group = JSON.parse(val.discountLevel)
      this.Group = group[group.length - 1];
      this.endDate = val.endDate;
    }
  },
  data() {
    return {
      progress: 0,
      discount: 0,
      endDate: 0,
      Group: [{
        mans: 1,
        discount: 10
      }],
      imgUrl: {
        url: require('../../../static/images/active/title.png'),
        urlColor: require('../../../static/images/active/title2.png'),
        urlBlue: require('../../../static/images/active/title3.png'),
        urlGolden: require('../../../static/images/active/title4.png'),
        urlPink: require('../../../static/images/active/title5.png')
      },
      changeStyle: {
        groupUsers: 'timePro',
        groupUserscolor: 'timeProcolor',
        groupUserspink: 'timePropink',
        groupUsersgolden: 'timeProgolden',
        groupUsersblue: 'timeProblue'
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
    this.skin = localStorage.getItem('skin')
    if (this.skin == 1) {
      this.changeSkin.activeClass = this.changeStyle.groupUsers
      this.changeSkin.realBgUrl = this.imgUrl.url
    } else if (this.skin == 2) {
      this.changeSkin.activeClass = this.changeStyle.groupUserscolor
      this.changeSkin.realBgUrl = this.imgUrl.urlColor
    } else if (this.skin == 3) {
      this.changeSkin.activeClass = this.changeStyle.groupUserspink
      this.changeSkin.realBgUrl = this.imgUrl.urlPink
    } else if (this.skin == 4) {
      this.changeSkin.activeClass = this.changeStyle.groupUsersgolden
      this.changeSkin.realBgUrl = this.imgUrl.urlGolden
    } else if (this.skin == 5) {
      this.changeSkin.activeClass = this.changeStyle.groupUsersblue
      this.changeSkin.realBgUrl = this.imgUrl.urlBlue
      // this.$refs.timePro.style.backgroundColor = '#fff'
    } else {
      this.changeSkin.activeClass = this.changeStyle.groupUsers
      this.changeSkin.realBgUrl = this.imgUrl.url
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
  .timeProblue
    border-top 1px solid #ccc
    background #fff
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
      background #434343
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
      background #434343
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
        background #0089da
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
  .timeProcolor
    border-top 1px solid #ccc
    background #fff
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
      background #434343
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
      background #434343
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
        background #980de4
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
  .timeProgolden
    border-top 1px solid #ccc
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
      background #b5a478
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
        background linear-gradient(to right,#f2e0b2 40%, #d3bc89);
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
  .timePropink
    border-top 1px solid #ccc
    background #fff
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
      background #483b35
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
      background #483b35
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
            color #fff
      .discount_txt
        border-right 0px
        height 100%
        width rrem(350px)
        background #ff017e
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
