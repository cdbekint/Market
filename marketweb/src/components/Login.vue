<template>
<div class='login'>
<Row>
   <Col class="demo-spin-col" span="24">
            <Spin fix>
                <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
                    </svg>
                </div>
            </Spin>
        </Col>
</Row>
</div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'Login',
  data () {
    return {
      code: ''
    }
  },
  created () {
    document.title = '正在登录'
  },
  mounted () {
    var code = this.util.getURLParam('code')
    var state = this.util.getURLParam('state')
    console.log(state)
    var activityId = this.util.getURLParam('activityId') || '1'
    var inviterId = this.util.getURLParam('inviterId') || ''
    console.log(code)
    if (this.$store.state.token !== '') {
      // 判断是否已登录--已登录:进入主页
    } else {
      // 判断是否已登录--未登录：进而判断是否有code
      if (code) {
        var param = {
          type: 1,
          code: code,
          activityId: activityId,
          inviterId: inviterId
        }
        if (param.inviterId === '') {
          delete param.inviterId
        }
        this.http.get('/api/account/login' + this.util.parseParam(param).replace('&', '?')).then(res => {
          if (res.error === false) {
            this.$store.state.token = res.access_token
          }
        })
      } else {
        // wxb11aa422d36a4cf9
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb11aa422d36a4cf9&redirect_uri=http%3A%2F%2Fmarket.cdbeki.com&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
        console.log(url)
        alert(url)
        location.replace(url)
        // 判断是否有code  --无code：清空cookie，跳转到登录
      }
    }
  }
}
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
.demo-spin-icon-load
  animation: ani-demo-spin 1s liner infinite
.demo-spin-col
  height:100px
  position:relative
  border:1px solid #eee
@keyframes ani-demo-spin
  from
    transform: rotate(0deg)
  50%
    transform: rotate(180deg)
  to
    transform: rotate(360deg)
</style>
