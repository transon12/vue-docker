import Vue from 'vue';
import VueRouter from 'vue-router';
import menuList from './views/menu/index.vue';
import study from '@/views/study';

Vue.use(VueRouter);
window._ = require('lodash');

const routes = [
  {
    path: '*',
    name: 'menu',
    component: menuList,
  },
  {
    path: '/',
    name: 'menu',
    component: menuList,
  },
  {
    path: '/study-profile',
    name: 'study-profile',
    component: () => study,
  },
];

const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  routes,
});

export default router;
