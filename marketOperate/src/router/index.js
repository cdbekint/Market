import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import Login from '@/Login.vue'
import Home from '@/components/Main/Home'
import companyAdd from '@/components/Main/companyAdd'
import companyEdit from '@/components/Main/companyEdit'

import WithDrawList from '@/components/Withdraw/WithDrawList'
import WaitAudit from '@/components/Withdraw/WaitAudit'
import customerList from '@/components/customer/customerList'
import EnterPriseAuthentic from '@/components/Main/EnterPriseAuthentic'

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
    },
    {
      path: '/waitaudit',
      name: 'WaitAudit',
      component: WaitAudit
    },
    {
      path: '/EnterPriseAuthentic',
      name: 'EnterPriseAuthentic',
      component: EnterPriseAuthentic
    }
  ]
})

