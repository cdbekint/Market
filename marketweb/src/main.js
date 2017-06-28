import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import util from '../static/js/utils.js'
import axios from 'axios'
import wx from 'weixin-js-sdk'
import qs from 'qs'

Vue.config.productionTip = false
Vue.use(Vuex)

Vue.prototype.http = axios;
Vue.prototype.util = util;
Vue.prototype.wx = wx;
Vue.prototype.murl = 'https://m.market.cdbeki.com/';

const store = new Vuex.Store({
  state: {
    token: util.getCookie('token') || '',
    companyId: util.getCookie('companyId') || '',
    openid: util.getCookie('openid') || '',
    currentActive:'',
    // prefix:'/api',
    prefix: '',
    isMember:0,
  },
  mutations: {
    updateToken (state) {
      state.token ++
    }
  }
});

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(function (config) {
  if (config.data) {
    config.data.access_token = store.state.token
  } else {
    if (config.url.indexOf('login') > -1 || config.url.indexOf('register') > -1) {
      config.url += ''
    } else {
      if (config.url.indexOf('?') > 0) {
        // 判断是否已经有‘?’存在,如果有就直接添加query字段
        config.url += '&access_token=' + store.state.token
      } else {
        config.url += '?access_token=' + store.state.token
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
      // this.$Message.error(res.msg)
      if (data.errorCode === 401) {
        // 登录过期
        store.state.token = ''
        util.delCookie('token')
        window.localStorage.removeItem("token")
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
