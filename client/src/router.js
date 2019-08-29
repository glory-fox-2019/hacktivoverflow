import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Detail from './views/DetailPage.vue';
import Create from './views/Create.vue';
import Collection from './views/Collection.vue';
import ParentQuestion from './views/ParentQuestion.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'parent',
      component: ParentQuestion,
      redirect: '/question',
      children: [
        {
          path: 'question',
          name: 'home',
          component: Home,
        },
        {
          path: '/question/collection',
          name: 'collection',
          component: Collection,
        },
        {
          path: '/question/:id',
          name: 'detail',
          component: Detail,
        },
      ],
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
    },
  ],
});
