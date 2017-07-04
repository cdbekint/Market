import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import Login from '@/Login.vue'
import Home from '@/components/Main/Home'
import companyAdd from '@/components/Main/companyAdd'
import companyEdit from '@/components/Main/companyEdit'

import WithDrawList from '@/components/WithDraw/WithDrawList'
import customerList from '@/components/customer/customerList'

Vue.use(Router)
Vue.use(iView)

export default new Router({
  routes: [
    {
      path: '/customerList',
      name: 'customerList',
      component:customerList
    },
    {
      path: '/companyEdit',
      name: 'companyEdit',
      component: companyEdit
    },
    {
      path: '/companyAdd',
      name: 'companyAdd',
      component: companyAdd
    },
    {
      path: '/companyList',
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

