import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// import ActivityInfo from '@/components/main/ActivityInfo'
import Activity from '@/components/Active/ActivityInfo'
import Login from '@/components/Login'

import homePage from '@/components/home/homePage'
import Person from '@/components/Person/person'
import companyPage from '@/components/company/companyPage'

Vue.use(Router)
Vue.use(iView)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'ActivityInfo',
    //   component: ActivityInfo
    // },
    {
      path: '/',
      name: 'Activity',
      component: Activity
    },
    {
      path: '/home',
      name: 'home',
      requireAuth:true,
      component: Person
    },
    {
      path: '/company',
      name: 'company',
      requireAuth:true,
      component: companyPage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/person',
    //   name: 'person',
    //   component: Person
    // }
  ]
})
