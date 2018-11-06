import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login1/index'
import AdminPage from '@/views/layout/index'
import UserManage from '@/views/content/managerUser'
import AdminManange from '@/views/content/managerAdmin'
import FilmManage from '@/views/content/managerFilm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin/page/manage',
      name: 'AdminPage',
      component: AdminPage,
      children: [{
        path: 'user',
        component: UserManage
      }, {
        path: 'admin',
        component: AdminManange
      }, {
        path: 'film',
        component: FilmManage
      }]
    }
  ]
})
