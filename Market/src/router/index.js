import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import Login from '@/Login.vue'
import Header from '@/components/Header'
import Home from '@/components/Home'
import Company from '@/components/Company'
import Employee from '@/components/Employee'
import EmployeeAdd from '@/components/EmployeeAdd'

import Goods from '@/components/Goods'
import GoodsAdd from '@/components/GoodsAdd'

import Orders from '@/components/Orders'
import Gift from '@/components/Gift'
import GiftAdd from '@/components/GiftAdd'
import Music from '@/components/Music'
import MusicAdd from '@/components/MusicAdd'

import Activity from '@/components/Activity'
import ActivityAdd from '@/components/ActivityAdd'

import Trading from '@/components/Trading'
import Withdraw from '@/components/Withdraw'
import Customer from '@/components/Customer'
import Point from '@/components/Point'

Vue.use(Router)
Vue.use(iView)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/company',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/company/edit',
      name: 'Company',
      component: Company,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    },
    {
      path: '/employee',
      name: 'Employee',
      component: Employee,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/employee/add',
      name: 'EmployeeAdd',
      component: EmployeeAdd,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/goods/add',
      name: 'GoodsAdd',
      component: GoodsAdd,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/gift',
      name: 'Gift',
      component: Gift,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/gift/add',
      name: 'GiftAdd',
      component: GiftAdd,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/music',
      name: 'Music',
      component: Music,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/music/add',
      name: 'MusicAdd',
      component: MusicAdd,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/activity/add',
      name: 'ActivityAdd',
      component: ActivityAdd,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/trading',
      name: 'Trading',
      component: Trading,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/withdraw',
      name: 'Withdraw',
      component: Withdraw,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/point',
      name: 'Point',
      component: Point,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      }
    }
  ]
})

