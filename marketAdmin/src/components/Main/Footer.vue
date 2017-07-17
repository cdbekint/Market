<template>

<div class="footer-wrapper">
      <!-- 脚部信息 -->
      <ul>
        <li>裂变式营销系统</li>
        <li>联盟生态管理系统</li>
        <li>接单宝</li>
      </ul>
      <br>
      <ul>
        <li>蜀IPC备14004122</li>
        <li>Copuright<span></span>©<span></span>2016-2017<span></span>BEIKEI<span></span>白起网络</li>

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
.footer-wrapper
  width:100%
  height:134px
  line-height:40px
  padding:0px 20%
  background:#434343
  padding-top:30px
  ul
    padding:0px
    font-font-family :"微软雅黑"
    li
      float:left
      font-size:16px
      margin-right :40px
      color:#aeaeae
      text-align :left
      position :relative
      span
        width:8px
        display:inline-block
    li::after
      content:''
      position :absolute
      right:-21px
      top:12px  
      height:16px
      width :1px
      background-color :#aeaeae
    li:last-of-type::after
      background-color :#434343 
</style>
