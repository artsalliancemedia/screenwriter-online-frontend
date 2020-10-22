import Vue from 'vue';
import cookie from 'js-cookie';
import VueI18n from 'vue-i18n';
import zhHans from 'vuetify/es5/locale/zh-Hans';
import en from 'vuetify/es5/locale/en';
import enLocale from '@/locale/lang/en-US';
import zhLocale from '@/locale/lang/zh-CN';

Vue.use(VueI18n);

const locale = {
  'en-US': {
    ...en,
    ...enLocale,
  },
  'zh-CN': {
    ...zhHans,
    ...zhLocale,
  },
};

const i18n = new VueI18n({
  locale: cookie.get('locale') || 'en-US',
  messages: locale,
});

export default i18n;
