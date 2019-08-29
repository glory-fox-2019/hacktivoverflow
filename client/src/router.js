import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewQuestion from './views/NewQuestion.vue'
import EditQuestion from './views/EditQuestion.vue'
import Question from './views/Question.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/new-question',
      name: 'new-question',
      component: NewQuestion
    },
    {
      path: '/edit-question',
      name: 'edit-question',
      component: EditQuestion
    },
    {
      path: '/questions/:id',
      name: 'question',
      component: Question
    }
  ]
})
