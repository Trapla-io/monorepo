import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAppStore } from 'src/stores/app.store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const router = createRouter({
  scrollBehavior: params => ((params.meta.keepScroll) ? {} : { top: 0, left: 0 }),
  routes,

  history: createWebHistory(),
  base: process.env.VUE_ROUTER_BASE,
});

router.beforeEach((to, from, next) => {
  const appStore = useAppStore();

  if (!to.meta.isPublic && !appStore.isLoggedIn) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
