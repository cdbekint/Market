<template>
  <div class="new_content">
    <ul>
      <li v-for="(item,index) in news">
        <div class="new_index">0{{index+1}}</div>
        <div class="new_main">
          <div class="new_title">{{item.title}}</div>
          <div class="new_text">{{item.text}}</div>
        </div>
        <div></div>
      </li>
      <div class="clear"></div>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['news'],
  data() {
    return {

    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.new_content
    width 1240px
    margin 0 auto
    font-family "微软雅黑"
    margin-bottom 110px
    ul
      li:nth-of-type(2n+1):after
        content ''
        position absolute
        right -50px
        top 0
        border-left 1px solid #ededed
        height 227px
      li
        float left
        width 520px
        height 220px
        margin 50px
        position relative
        .new_index
          color #1dc6ff
          font-size 70px
          float left
          font-weight bold
          position absolute
          left 0
          top -20px
        .new_main
          float left
          width 420px
          margin-left 104px
          .new_title
            font-size 24px
            color #434343
            font-weight 800 
            text-align left
          .new_text
            font-size 18px
            line-height 38px
            color #838383  
            text-align left
            margin-top 10px   
      .clear
        clear both    
</style>
