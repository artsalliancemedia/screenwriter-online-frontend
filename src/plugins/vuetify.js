import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import locale from '@/locale';
import cookie from 'js-cookie';
// import 'vuetify/dist/vuetify.min.css';
import { LANGUAGES_FOR_VUETIFY } from '@/utils/constant';
// import 'roboto-fontface/css/roboto/roboto-fontface.css';

Vue.use(Vuetify);

const logo = require('@artsalliancemedia/iconfont/svg/screenwriter.svg');

export default new Vuetify({
  // options: {
  //   customProperties: true,
  // },
  lang: {
    locales: locale,
    current: LANGUAGES_FOR_VUETIFY[cookie.get('locale') || 'en'],
  },
  breakpoint: {
    thresholds: {
      xs: 320,
      sm: 768,
      md: 1200,
      lg: 1500,
    },
  },
  icons: {
    iconfont: 'adi',
    values: {
      logo,
      complete: 'adi-check',
      cancel: 'adi-cancel-s',
      close: 'adi-cancel-s',
      delete: 'adi-cancel-s', // delete (e.g. v-chip close)
      clear: 'adi-cancel-s',
      success: 'adi-check-circle-solid',
      info: 'adi-info',
      warning: 'adi-warning',
      error: 'adi-alert',
      prev: 'adi-caret-left-s',
      next: 'adi-caret-right-s',
      checkboxOn: 'adi-check-square-solid',
      checkboxOff: 'adi-checkbox',
      checkboxIndeterminate: 'adi-minus-square-solid',
      // delimiter: 'mdi-circle', // for carousel
      sort: 'adi-unsorted-s',
      expand: 'adi-caret-down-s',
      menu: 'adi-menu',
      subgroup: 'adi-caret-down-s',
      dropdown: 'adi-caret-down-s',
      radioOn: 'adi-radio-button-active-solid',
      radioOff: 'adi-radio-button',
      edit: 'adi-edit',
      ratingEmpty: 'adi-star',
      ratingFull: 'adi-star-active',
      ratingHalf: 'adi-star-half',
      loading: 'adi-rotate',
      first: 'adi-page-first-s',
      last: 'adi-page-last-s',
      unfold: 'adi-unsorted-s',
      file: 'adi-paperclip',
      plus: 'adi-plus-s',
      minus: 'adi-minus-s',
    },
  },
  theme: {
    themes: {
      light: {
        primary: '#2A6765',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
});
