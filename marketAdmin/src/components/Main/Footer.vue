<template>

<div class="footer-wrapper">
      <!-- 脚部信息 -->
      <ul>
        <li>裂变式营销系统</li>
        <li><a href="http://ems.cdbeki.com" target="_blank">联盟生态管理系统</a></li>
        <li><a href="https://jd.cdbeki.com" target="_blank">接单宝</a></li>
      </ul>
      <br>
      <ul>
        <li>蜀ICP备15007695号-2</li>
        <li style="margin-right:0">Copyright<span></span>©<span></span>2015-{{util.getDate(Date.now(),1)}}<span></span>CdBeki<span></span>成都白起网络科技有限公司</li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
rrem(val){
  return (val/108px)rem
}
.footer-wrapper
  width:100%
  height:rrem(134px)
  line-height:rrem(40px)
  padding:0px 20%
  background:#434343
  padding-top:rrem(30px)
  ul
    padding:0px
    font-font-family :"微软雅黑"
    li
      float:left
      font-size:rrem(16px)
      margin-right :rrem(40px)
      color:#aeaeae
      text-align :left
      position :relative
      span
        width:rrem(8px)
        display:inline-block
    li::after
      content:''
      position :absolute
      right:rrem(-21px)
      top:rrem(12px)  
      height:rrem(16px)
      width :rrem(1px)
      background-color :#aeaeae
    li:last-of-type::after
      background-color :#434343 
</style>
