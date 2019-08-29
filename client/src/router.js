import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: () => import( /* webpackChunkName: "questionslist" */ '@/views/QuestionsList.vue'),
          children: [
            {
              path: '',
              name: 'home',
              component: () => import( /* webpackChunkName: "allquestions" */ '@/views/AllQuestions.vue'),
            },
            {
              path: '/watch-list',
              name: 'watchlist',
              component: () => import( /* webpackChunkName: "allquestions" */ '@/views/WatchedQuestions.vue'),
            }
          ]
        },
        {
          path: 'question/:questionId',
          name: 'question',
          component: () => import(/* webpackChunkName: "question" */ '@/views/Detail.vue')
        }
      ]
    },
  ]
})
