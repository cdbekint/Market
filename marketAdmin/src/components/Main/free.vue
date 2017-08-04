<template>
  <div class="companyAbout">
    <div class="inner">
      <div class="about">
      <img src="/static/images/about.png">
    </div>
    <div class="qrc">
      <div class="pic">
         <img src="http://qr.topscan.com/api.php?text=https://market.cdbeki.com?state=9,0"> 
      </div>
      <div class="text">微信扫描二维码体验裂变营销系统</div>
    </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .companyAbout
    background url('../../../static/images/bg.png') no-repeat top
    width 100%
    background-size 100% 100%
    margin-top 262px
    margin-bottom:200px
    .inner
      width 1240px
      margin 0 auto
      height 575px
      position relative
      .about
        width 1200px
        height 440px
        position absolute
        left 19px
        top -152px
      .qrc
        width 220px
        height 220px
        position absolute
        left 509px
        bottom -110px
        background #fff
        .pic  
          width 200px
          height 200px
          margin 10px auto
          img 
            width 100%
        .text
          width 240px 
          position absolute
          left -10px
          bottom -30px
          font-size 16px
          color #adadad    

</style>
