import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import Login from '@/Login.vue'
import Home from '@/components/Main/Home'

import WithDrawList from '@/components/Withdraw/WithDrawList'

Vue.use(Router)
Vue.use(iView)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/withdrawlist',
      name: 'WithDrawList',
      component: WithDrawList
    }
  ]
})

