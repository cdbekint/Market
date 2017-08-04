<template>
  <div :class="[changeSkin.activeClass]">
    <mainHead :val="changeSkin.realValue"></mainHead>
    <img :src="changeSkin.realBgUrl" class="main_bg">
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
  components: { mainHead },
  watch: {
    activity: function (val) {
      this.http.get(this.$store.state.prefix + '/gift/getByIds/' + val.giftIds).then(res => {
        if (res.error === false) {
          this.giftlist = res.result
        }
      })
    }
  },
  data() {
    return {
      value: {
        head: '赠送礼品',
        name: "PRESENT",
        no: '02'
      },
      valueColor: {
        head: '赠送礼品',
        name: "PRESENT",
        no: 'b02'
      },
      valueBlue: {
        head: '赠送礼品',
        name: "PRESENT",
        no: 'c02'
      },
      valueGolden: {
        head: '赠送礼品',
        name: "PRESENT",
        no: 'd02'
      },
      valuePink: {
        head: '赠送礼品',
        name: "PRESENT",
        no: 'e02'
      },
      bgUrl: {
        bg: require('../../../static/images/active/bg.png'),
        bgColor: require('../../../static/images/active/bg1.png'),
        bgBlue: require('../../../static/images/active/bg2.png'),
        bgGolden: require('../../../static/images/active/bg3.png'),
        bgPink: require('../../../static/images/active/bg4.png')
      },
      giftlist: [],
      changeStyle: {
        gift2: 'gift2',
        giftcolor: 'giftcolor',
        giftpink: 'giftpink',
        giftgolden: 'giftgolden',
        giftblue: 'giftblue'
      },
      changeSkin: {
        activeClass: '',
        realValue: {},
        realBgUrl:{}
      },
      skin: 4
    }
  },
  created() {
    this.skin = localStorage.getItem('skin')
    if (this.skin == 1) {
      this.changeSkin.activeClass = this.changeStyle.gift2
      this.changeSkin.realValue = this.value
      this.changeSkin.realBgUrl = this.bgUrl.bg
    } else if (this.skin == 2) {
      this.changeSkin.activeClass = this.changeStyle.giftcolor
      this.changeSkin.realValue = this.valueColor
      this.changeSkin.realBgUrl = this.bgUrl.bgColor
    } else if (this.skin == 3) {
      this.changeSkin.activeClass = this.changeStyle.giftpink
      this.changeSkin.realValue = this.valuePink
      this.changeSkin.realBgUrl = this.bgUrl.bgPink
    } else if (this.skin == 4) {
      this.changeSkin.activeClass = this.changeStyle.giftgolden
      this.changeSkin.realValue = this.valueGolden
      this.changeSkin.realBgUrl = this.bgUrl.bgGolden
    } else if (this.skin == 5) {
      this.changeSkin.activeClass = this.changeStyle.giftblue
      this.changeSkin.realValue = this.valueBlue
      this.changeSkin.realBgUrl = this.bgUrl.bgBlue
    } else {
      this.changeSkin.activeClass = this.changeStyle.gift2
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
  .giftblue
    width:100%
    height auto
    position relative
    background #fff
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
        background #0089da
      .main_parent
        width 100%
        border 1px solid #ccc
        .parent_desc
          text-align center
          padding-top rrem(10px)
          width 100%
          background #fff
          height rrem(100px)
          line-height rrem(40px)
        img
          width 100%     
  .giftcolor
    width:100%
    height auto
    position relative
    background #fff
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
        border 1px solid #ccc
        .parent_desc
          text-align center
          padding-top rrem(10px)
          width 100%
          background #fff
          height rrem(100px)
          line-height rrem(40px)
        img
          width 100%    
  .giftgolden
    width:100%
    height auto
    position relative
    background #fff
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
        color #434343
        font-size rrem(30px)
        font-weight bold
        background linear-gradient(to right,#f2e0b2 50%, #d3bc89);
      .main_parent
        width 100%
        border 1px solid #ccc
        .parent_desc
          text-align center
          padding-top rrem(10px)
          width 100%
          background #fff
          height rrem(100px)
          line-height rrem(40px)
        img
          width 100%           
  .giftpink
    width:100%
    height auto
    position relative
    background #fff
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
        background #ff017e
      .main_parent
        width 100%
        border 1px solid #ccc
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
