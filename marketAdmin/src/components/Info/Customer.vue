<template>
<div class="customerlist">
	<div class="content-title">
      <div class="titlename">
      	<span>客户列表</span>
      </div>
      <div class="titellink">
      
      </div>
 	</div>
  <div class="content">
    <table class="table table-bordered table-hover customerlisttable">
      <thead>
        <tr>
          <th>序号</th>
          <th>头像</th>
          <th>昵称</th>
          <th>真实姓名</th>
          <th>电话号码</th>
          <th>积分</th>
          <th>余额</th>
          <th>专属客服</th>
          <th>加入时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><img class="customeravater" src="http://wx.qlogo.cn/mmopen/qGusKyb0IEeL0LcuiaCuISav37vicPlXiaibQqM4jwvnt6FLxSiaPN9WUlevzuMW2abajiaH8rlEndlATibuwCQnR0EgJBS9bgXdr0I/0" alt=""></td>
          <td>塞上牛羊</td>
          <td>迁哥</td>
          <td>18380428326</td>
          <td>3400</td>
          <td>178.5</td>
          <td>雪雪</td>
          <td>2017-03-13</td>
          <td>
            <a href="javascript:;" class="operabtns">禁用</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Customer',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
.customerlisttable
  .customeravater
    width:40px
    height:auto
    max-height:40px
</style>
