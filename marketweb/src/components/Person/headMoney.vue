<template>
  <div class="headMoney">
    <div class="main_bg">
      <img src="/static/images/person/bg.png">
      <img src="/static/images/b1.png" class="info_img">
      <div class="info_head">
        <div class='head_name'>
          <img src="/static/images/person/guan.png">
          <span>小浩学长</span>
        </div>
        <p class="phone">电话：231566468513</p>
        <p class="email">邮箱：231566468513</p>
      </div>
      <div class="main_money">
        <div class="money_info">
          <div class="info_jifen">
            <span>累计积分：12356分</span>
            <span>可用积分：126分</span>
            <span>累计积分：356分</span>
            <span>累计积分：1256分</span>
          </div>
        </div>
      </div>
      <img src="/static/images/person/jifen.png" class="main_jifen">
      <img src="/static/images/person/tixian.png" class="main_jifen main_tixian">
    </div>
  </div>
</template>

<script>

</script>

<style lang="stylus" rel="stylesheet/stylus">
  rrem(val){
    return (val/108px)rem
  }
  .headMoney
    width 100%
    height rrem(645px)
    background #d8006b
    position relative
    .main_bg
      position absolute
      background #fff
      border-radius rrem(40px)
      top rrem(40px)
      left rrem(40px)
      width rrem(1000px)
      height rrem(570px)
      img
        height 100%
        width 100%
      .info_img
        position absolute
        top rrem(52px)
        left rrem(60px)
        border rrem(8px) solid #ff007e
        border-radius 100%
        height rrem(193px)
        width rrem(193px)
      .info_head
        position absolute
        left rrem(293px)
        top rrem(90px)
        .head_name
          img
            width rrem(45px)
            height rrem(38px)
          span
            font-size rrem(36px)
            font-weight bold
            color #ff007e
        p
          font-size rrem(32px)
          line-height rrem(40px)
          color #aeaeae
          height rrem(40px)
        .phone
          margin-top rrem(10px)
      .main_money
        top rrem(287px)
        width 100%
        height rrem(220px)
        position absolute
        .money_info
          background #f7f7f7
          border-top-right-radius rrem(100px)
          border-bottom-right-radius rrem(100px)
          height 100%
          width rrem(695px)
          .info_jifen
            padding-left rrem(40px)
            padding-top rrem(38px)
            span
              margin-top rrem(10px)
              font-weight bold
              color #aeaeae
              font-size rrem(32px)
              margin-right rrem(20px)
              width rrem(285px)
              height rrem(60px)
              line-height rrem(60px)
              display inline-block
      .main_jifen
        width rrem(235px)
        height rrem(90px)
        top rrem(290px)
        right rrem(38px)
        position absolute
      .main_tixian
        top rrem(415px)
</style>
