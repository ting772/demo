import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import demoRoutes from './demoRoutes'
import IndexView from '@/views/index.vue';

//github pages不支持history模式路由，gitpages部署通过npx cross-env VITE_USE_HASH=1注入变量
let useHash = import.meta.env.VITE_USE_HASH == 1
const router = createRouter({
  history: (useHash ? createWebHashHistory : createWebHistory)(import.meta.env.BASE_URL),
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
