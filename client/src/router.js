import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FormQuestion from'./views/FormQuestion.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/formquestion',
      name: 'formquestion',
      component: FormQuestion
    },
    {
      path: '/edit/:id',
      name: 'edit-question',
      component: () => import(/* webpackChunkName: "about" */ './views/EditQuestion.vue')
    },
    {
      path: '/question/:id',
      name: 'detail-question',
      component: () => import(/* webpackChunkName: "about" */ './views/QuestionDetail.vue')
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'registerForm',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
    },
    {
      path: '/my-question',
      name: 'myquestion',
      component: () => import(/* webpackChunkName: "about" */ './views/MyQuestion.vue')
    },
    {
      path: '/filtertag/:name',
      name: 'filtering-tag',
      component: () => import(/* webpackChunkName: "about" */ './views/FilteringTag.vue')
    }
  ]
})
