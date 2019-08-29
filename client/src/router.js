import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Question from './views/Question.vue'
import QuestionContent from './views/QuestionContent';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/questions/:id',
      name: 'questions content',
      component: QuestionContent,
    },
    {
      path: '/questions',
      name: 'questions',
      component: Question,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
  ],
});
