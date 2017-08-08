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
rrem(val){
  return (val/108px)rem
}
.new_content
    width rrem(1240px)
    margin 0 auto
    font-family "微软雅黑"
    margin-bottom rrem(110px)
    ul
      li:nth-of-type(2n+1):after
        content ''
        position absolute
        right rrem(-50px)
        top 0
        border-left 1px solid #ededed
        height rrem(227px)
      li
        float left
        width rrem(520px)
        height rrem(220px)
        margin rrem(50px)
        position relative
        .new_index
          color #1dc6ff
          font-size rrem(70px)
          float left
          font-weight bold
          position absolute
          left 0
          top rrem(-20px)
        .new_main
          float left
          width rrem(420px)
          margin-left rrem(104px)
          .new_title
            font-size rrem(24px)
            color #434343
            font-weight 800 
            text-align left
          .new_text
            font-size rrem(18px)
            line-height rrem(38px)
            color #838383  
            text-align left
            margin-top rrem(10px)   
      .clear
        clear both    
</style>
