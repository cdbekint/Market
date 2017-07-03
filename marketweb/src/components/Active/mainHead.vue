<template>
  <div class = "main_head">
    <img :src="'/static/images/active/'+ val.no +'.png'" class="head_img">
    <div class="head_text">
      <span class="text_en">{{val.name}}</span>
      <span class="text_ch">{{val.head}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['val'],
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .main_head
    height rrem(217px)
    width 100%
    text-align center
    position relative
    .head_img
      width rrem(530px)
    .head_text
      position absolute
      top 0px
      left rrem(465px)
      height 100%
      width rrem(600px)
      text-align left
      span
        display block
        line-height rrem(45px)
        height rrem(45px)
        color #fff
        margin-left rrem(12px)
        font-style italic
        font-weight bold
      .text_en
        letter-spacing rrem(15px)
        margin-left rrem(26px)
        margin-top rrem(65px)
        font-size rrem(30px)
      .text_ch
        font-size rrem(50px)
</style>
