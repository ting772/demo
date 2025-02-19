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

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) ?? 'my demos'
  next()
})
export default router
