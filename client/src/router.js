import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import AllQuestions from './views/AllQuestions.vue'
import MyQuestions from './views/MyQuestions.vue'
import Detail from './views/Detail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'all',
          name: 'allQuestions',
          component: AllQuestions
        },
        {
          path: 'mine',
          name: 'MyQuestions',
          component: MyQuestions
        },
        {
          path: ':id',
          name: 'detail',
          component: Detail
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
