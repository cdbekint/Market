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

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    token: util.getCookie('token') || '',
    companyId: util.getCookie('companyId') || '',
    qiniutoken: util.getCookie('qiniutoken') || '',
    prefix: '/api'
  },
  mutations: {
    updateToken (state) {
      state.token ++
    }
  }
})

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
      if (data.errorCode === 401) {
        // 登录过期
        store.state.token = ''
        util.delCookie('token')
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
  created () {
    if (!store.state.token) {
      alert(this.util.isWeiXin())
      if (this.util.isWeiXin()) {
        location.replace('/login.html')
      } else {
        console.warn('会话过期')
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  // if (from.meta.requireAuth === true && to.fullPath.indexOf(from.fullPath) > -1) {
  //   to.meta.requireAuth = true
  // }
  if (to.meta.requireAuth === true) {
    console.log(Boolean(store.state.token))
    if (store.state.token) {
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
