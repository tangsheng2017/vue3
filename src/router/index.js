import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
