import Vue from 'vue';
import VueRouter from 'vue-router';
// import Layout from '@/components/layout';

Vue.use(VueRouter);

const Layout = () => import('@/components/layout');

const routes = [
  {
    path: '/',
    name: 'main',
    component: Layout,
  },
];

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
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
