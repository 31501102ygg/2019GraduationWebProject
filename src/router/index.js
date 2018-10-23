import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login1/index'
import AdminPage from '@/views/layout/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin/page',
      name: 'AdminPage',
      component: AdminPage
    }
  ]
})
