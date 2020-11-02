import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
// import { AAMORGUUID } from '@/utils/constant';
import { initToken } from '@/api/base';
import i18n from '@/locale';

const Layout = () => import('@/components/layout');
const Login = () => import('@/views/auth/login');
// const ResetAction = () => import('@/views/auth/resetAction');
// const Invite = () => import('@/views/auth/invite');
// const Validate = () => import('@/views/auth/validate');
// const Accept = () => import('@/views/auth/accept');
// const ERROR = () => import('@/components/error');

Vue.use(VueRouter);

const files = require.context('./modules', false, /\.js$/);
const children = [];
files.keys().forEach(file => {
  if (Array.isArray(files(file).default)) {
    children.push(...files(file).default);
  } else {
    children.push(files(file).default);
  }
});

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Layout,
    redirect: '/login',
    props: true,
    children,
    meta: { noAuth: true, title: 'login' },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { noAuth: true, title: 'login' },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(
  (() => {
    const routerStart = new Promise(resolve => {
      router.start = resolve;
    });
    return async (to, from, next) => {
      await routerStart;
      next();
    };
  })()
);

router.beforeEach(async (to, from, next) => {
  // document.title = to.meta.title;
  document.title = `ScreenWriter - ${i18n.tc(`title.${to.meta.title}`)}`;
  if (to.matched.some(record => record.meta.init)) {
    initToken();
    sessionStorage.clear();
    // next();
  } else {
    const authSource = store.getters['auth/authSource'];
    const { authed, refreshed } = authSource;
    let isAuth = authed;
    if (!isAuth && !refreshed) {
      try {
        isAuth = await store.dispatch('auth/refresh');
      } catch (error) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      }
    }
    // const { account } = store.getters['auth/authSource'];
    // need auth
    if (isAuth) {
      if (to.name === 'login') {
        next(to.query.redirect || '/task');
      }
    } else if (to.meta.auth) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
    next();
  }
  next();
});

Vue.mixin({
  methods: {
    $pushRoute(payload) {
      return router.push(payload).catch(() => {});
    },
    // update router query
    $updateRQ(query) {
      return router.push({ query: { ...this.$route.query, ...query } }).catch(() => {});
    },
    $replaceRQ(query) {
      return router.push({ query }).catch(() => {});
    },
  },
});

export default router;
