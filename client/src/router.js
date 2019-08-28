import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/question/:id',
      name: 'question',
      component: () => import(/* webpackChunkName: "question" */ './views/Question.vue')
    },
    {
      path: '/createQuestion',
      name: 'CreateQuestion',
      component: () => import(/* webpackChunkName: "CreateQuestion" */ './views/CreateQuestion.vue')
    },
    {
      path: '/editQuestion',
      name: 'EditQuestion',
      component: () => import(/* webpackChunkName: "EditQuestion" */ './views/EditQuestion.vue')
    },
    {
      path: '/user/myquestion',
      name: 'MyQuestion',
      component: () => import(/* webpackChunkName: "MyQuestion" */ './views/MyQuestion.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    }
  ]
})
