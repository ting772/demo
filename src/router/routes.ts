import { createRouter, createWebHistory } from 'vue-router'
import demoRoutes from './demoRoutes'
import IndexView from '@/views/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: IndexView
    },
    demoRoutes
  ],
})

export default router
