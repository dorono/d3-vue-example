import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Counting from '../views/Counting.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/counting',
      name: 'counting',
      component: Counting
    },
  ]
});
