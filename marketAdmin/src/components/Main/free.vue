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
rrem(val){
  return (val/108px)rem
}
  .companyAbout
    background url('/static/images/bg.png') no-repeat top
    width 100%
    background-size 100% 100%
    margin-top rrem(262px)
    margin-bottom:rrem(200px)
    .inner
      width rrem(1240px)
      margin 0 auto
      height rrem(575px)
      position relative
      .about
        width rrem(1200px)
        height rrem(440px)
        position absolute
        left rrem(19px)
        top rrem(-152px)
        img
          width 100%
      .qrc
        width rrem(220px)
        height rrem(220px)
        position absolute
        left rrem(509px)
        bottom rrem(-110px)
        background #fff
        .pic  
          width rrem(200px)
          height rrem(200px)
          margin rrem(10px) auto
          img 
            width 100%
        .text
          width rrem(240px) 
          position absolute
          left rrem(-10px)
          bottom rrem(-30px)
          font-size rrem(16px)
          color #adadad    

</style>
