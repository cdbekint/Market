// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import util from '../static/js/utils.js'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.prototype.http = axios
Vue.prototype.router = router
Vue.prototype.util = util
Vue.prototype.murl = 'https://m.market.cdbeki.com/'
Vue.prototype.apiurl = 'http://market.cdbeki.com/'
/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    yxtoken: util.getCookie('yxtoken') || '',
    companyId: util.getCookie('companyId') || '',
    companyName:util.getCookie('companyName') || '',
    qiniutoken: util.getCookie('qiniutoken') || '',
    authentic:util.getCookie('authentic')||'',
    companyFlag:util.getCookie('companyFlag')||'',
    rate:1,//提现手续费用
    prefix: '/api',
    // prefix: '//market.cdbeki.com'
  },
  mutations: {
    updateToken (state) {
      state.yxtoken ++
    },
    upDataAuthentic (state,data) {
      state.authentic = data
    }
  }
})
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(function (config) {
  if (config.data) {
    config.data.access_token = store.state.yxtoken
  } else {
    if (config.url.indexOf('login') > -1 || config.url.indexOf('register') > -1) {
      config.url += ''
    } else {
      if (config.url.indexOf('?') > 0) {
        config.url += '&access_token=' + store.state.yxtoken
      } else {
        config.url += '?access_token=' + store.state.yxtoken
      }
    }
  }
  if (config.method !== 'get') {
    config.data = qs.stringify(config.data)
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(
  response => {
    let res = {}
    let data = response.data
    if (data.success === 1) {
      res.error = false
      res.result = data.result
      res.msg = data.errorMessage
    } else {
      res.error = true
      res.result = data.result
      res.msg = data.errorMessage
      if (data.errorCode === 401) {
        // 登录过期
        store.state.yxtoken = ''
        util.delCookie('yxtoken')
        //将顶部的高度重新设置
         this.topheight=(window.screen.width*780/1920)
        document.getElementById("mainheader").style.height = this.topheight+"px"
      }
    }
    return res
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          this.$Message.error('请求未找到，请重试')
          break
        case 500:
          this.$Message.error('服务器繁忙，请稍后重试')
          break
        default :
          this.$Message.error('操作异常')
          break
      }
    }
    return Promise.reject(error)   // 返回接口返回的错误信息
  }
)

new Vue({
  el: '#app',
  router,
  store,
  axios,
  template: '<App/>',
  components: { App },
  data:{
      state:0
  },
  mounted(){
    if(!this.$store.state.yxtoken){
        this.topheight=(window.screen.width*780/1920)
        document.getElementById("mainheader").style.height = this.topheight+"px"
    }else{
        document.getElementById("mainheader").style.height = "70px"
    }
  }
})

router.beforeEach((to, from, next) => {
  // if (from.meta.requireAuth === true && to.fullPath.indexOf(from.fullPath) > -1) {
  //   to.meta.requireAuth = true
  // }
  if (to.meta.requireAuth === true) {
    if (store.state.yxtoken) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
