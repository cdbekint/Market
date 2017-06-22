<template>

<div class="footer-wrapper">
      <!-- 脚部信息 -->
      <ul>
        <li>
          <a href="https://jd.cdbeki.com">接单宝</a></li>
        <li><a href="http://ems.cdbeki.com">联盟-生态管理系统</a></li>
        <li>成都白起网络 版权所有</li>
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
  height:40px
  line-height:40px
  padding:0px 20%
  text-align:center
  margin-top:60px
  background:#B8B9B9
  ul
    padding:0px
    li
      display:inline-block
      padding:0px 10px
      font-size:12px

</style>
