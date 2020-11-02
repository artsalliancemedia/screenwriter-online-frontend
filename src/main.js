import Vue from 'vue';
import App from '@/App';
import { sync } from 'vuex-router-sync';
import Vuelidate from 'vuelidate';
import VueAxios from 'vue-axios';
import axios from 'axios';

import Service from '@/utils/request';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import i18n from '@/locale';

import formatUserName from '@/utils/formatUserName';

import '@/styles/vuetify.scss';

Vue.use(Vuelidate);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

Vue.prototype.$logo = require('@artsalliancemedia/iconfont/svg/screenwriter.svg');
Vue.prototype.$logoWhite = require('@artsalliancemedia/iconfont/svg/screenwriter-white.svg');
Vue.prototype.$logoProducer = require('@artsalliancemedia/iconfont/svg/producer.svg');
Vue.prototype.$logoAdmin = require('@artsalliancemedia/iconfont/svg/admin.svg');

Vue.prototype.$formatUserName = formatUserName;

sync(store, router);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  created() {
    Service();
  },
  render: h => h(App),
}).$mount('#app');
