<template>
  <div class = "main_head">
     <img :src="'/static/images/a'+ val.no +'.png'" class="head_img"> 
    <div class = "head_content">
      <img src="/static/images/max.png" class="content_img">
      <span>{{val.head}}</span>
    </div>
    <div class = "head_title">
      <span class = "text">{{val.name}}</span>
      <img src="/static/images/line.png" alt="">
      <span class = "english">TAKING PART IN</span>
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
    return (val/144px)rem
  }
  .main_head
    position relative
    top 0px
    width 100%
    height rrem(212px)
    .head_img
      width rrem(288px)
      height 100%
    .head_content
      position absolute
      top rrem(40px)
      left rrem(300px)
      width rrem(600px)
      height rrem(110px)
      .content_img
        width rrem(600px)
        height rrem(110px)
      span
        position absolute
        top rrem(57px)
        color #fff
        display inline-block
        width 100%
        height 100%
        text-align center
        font-size rrem(55px)


    .head_title
      position absolute
      left rrem(930px)
      top rrem(40px)
      width rrem(460px)
      height rrem(110px)
      span
        position absolute
        display inline-block
        width rrem(460px)
        height rrem(110px)
        text-align center
      .text
        color #000
        font-size rrem(30px)
        top rrem(40px)
      .english
        color #e75e54
        font-size rrem(23px)
        top rrem(90px)
      img
        width 100%
        position absolute
        top rrem(66px)

</style>
