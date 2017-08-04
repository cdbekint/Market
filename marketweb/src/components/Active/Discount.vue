<template>
  <div :class="[changeSkin.activeClass]">
    <mainHead :val="changeSkin.realValue"></mainHead>
    <img :src="changeSkin.realBgUrl" class="main_bg">
    <div class="people_main">
      <div class="main_parent">
        <div v-html="this.util.escapeToHtml(activity.content)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainHead from './mainHead.vue'
export default {
  name: "discount",
  props: ['activity'],
  components: { mainHead },
  watch: {
    activity: function (val, oldVal) {
      if (val.activityType != 2)
        this.value.no = "03";
    }
  },
  data() {
    return {
      value: {
        head: '优惠方案',
        name: "DISCOUNT",
        no: "04"
      },
      valueColor: {
        head: '优惠方案',
        name: "DISCOUNT",
        no: "b04"
      },
      valueBlue: {
        head: '优惠方案',
        name: "DISCOUNT",
        no: "c04"
      },
      valueGolden: {
        head: '优惠方案',
        name: "DISCOUNT",
        no: "d04"
      },
      valuePink: {
        head: '优惠方案',
        name: "DISCOUNT",
        no: "e04"
      },
      bgUrl: {
        bg: require('../../../static/images/active/bg.png'),
        bgColor: require('../../../static/images/active/bg1.png'),
        bgBlue: require('../../../static/images/active/bg2.png'),
        bgGolden: require('../../../static/images/active/bg3.png'),
        bgPink: require('../../../static/images/active/bg4.png')
      },
      changeStyle: {
        discount: 'discount',
        discountblue: 'discount discountblue'
      },
      changeSkin: {
        activeClass: '',
        realValue: {},
        realBgUrl:{}
      },
      skin: 1
    }
  },
  created() {
    this.skin = localStorage.getItem('skin')
    if (this.skin == 1) {
      this.changeSkin.activeClass = this.changeStyle.discount
      this.changeSkin.realValue = this.value
      this.changeSkin.realBgUrl = this.bgUrl.bg
    } else if (this.skin == 2) {
      this.changeSkin.activeClass = this.changeStyle.discountblue
      this.changeSkin.realValue = this.valueColor
      this.changeSkin.realBgUrl = this.bgUrl.bgColor
    } else if (this.skin == 3) {
      this.changeSkin.activeClass = this.changeStyle.discountblue
      this.changeSkin.realValue = this.valuePink
      this.changeSkin.realBgUrl = this.bgUrl.bgPink
    } else if (this.skin == 4) {
      this.changeSkin.activeClass = this.changeStyle.discountblue
      this.changeSkin.realValue = this.valueGolden
      this.changeSkin.realBgUrl = this.bgUrl.bgGolden
    } else if (this.skin == 5) {
      this.changeSkin.activeClass = this.changeStyle.discountblue
      this.changeSkin.realValue = this.valueBlue
      this.changeSkin.realBgUrl = this.bgUrl.bgBlue
    } else {
      this.changeSkin.activeClass = this.changeStyle.discount
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
  .discount
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
      .main_parent
        width 100%
        img
          width 100%
  .discountblue
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
      border-bottom 1px solid #ccc
      z-index 100
      position relative
      margin auto
      width rrem(1000px)
      .main_parent
        border 1px solid #ccc
        width 100%
        img
          width 100%                        
</style>
