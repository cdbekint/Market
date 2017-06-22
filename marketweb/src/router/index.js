import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import ActivityInfo from '@/components/main/ActivityInfo'
import UserInfo from '@/components/UserInfo'
import Shop from '@/components/Shop'
import Login from '@/components/Login'

import homePage from '@/components/home/homePage'
import companyPage from '@/components/company/companyPage'

Vue.use(Router)
Vue.use(iView)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ActivityInfo',
      component: ActivityInfo
    },
    {
      path: '/home',
      name: 'home',
      component: homePage
    },
    {
      path: '/company',
      name: 'company',
      component: companyPage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/userinfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    }
  ]
})
