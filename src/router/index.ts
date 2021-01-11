import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const files = require.context('@/pages', true, /\.vue$/u),
  routes = [];

files.keys().forEach(key => {
  const path = `/${key.replace(/(\.\/|\.vue)/gu, '')}`,
    component = files(key).default,
    title = component.title || '';

  routes.push({
    path,
    component,
    meta: { title }
  });
});

routes.push({
  path: '/',
  redirect: '/index'
});
routes.push({
  path: '/login',
  name: 'Login',
  component: () => import('@/pages/account/login.vue'),
  meta: { title: '登录' }
});

// eslint-disable-next-line one-var
const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const { token } = store.state;

  if (to.name !== 'Login' && !token) {
    return next('/login');
  }
  return next();
});
export default router;
