import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

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
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ './components/taskList.vue'),
        },
        {
          path: '/detail/:id',
          component: () => import(/* webpackChunkName: "detail" */ './components/DetailTask.vue'),
          children: [
            {
              path: '',
              name: 'answer',
              component: () => import(/* webpackChunkName: "answer" */ './components/taskAnswer.vue'),
            },
          ],
        },
        {
          path: '/myquestion',
          name: 'myquestion',
          component: () => import(/* webpackChunkName: "myquestion" */ './components/MyQuestion.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './components/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './components/Register.vue'),
    },
  ],
});
