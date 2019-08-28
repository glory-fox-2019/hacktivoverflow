import Vue from 'vue'
import Router from 'vue-router'
import Landingpage from './views/Landingpage.vue'
import Dashboard from './views/Dashboard.vue'
import Detail from './views/Detail.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landingpage',
      component: Landingpage
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
        path: '/dashboard/:id',
        name: 'details',
        component: Detail
    }
  ]
})
