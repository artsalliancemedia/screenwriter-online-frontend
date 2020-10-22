<template>
  <router-view />
</template>
<script>
import cookie from 'js-cookie';
import moment from 'moment';
import { updateCookie } from '@/api/base';

export default {
  name: 'App',
  created() {
    if (!cookie.get('locale')) {
      updateCookie({ key: 'locale', value: 'en-US' });
      moment.locale('en-US');
    }
    this.$router.start();
  },
};
</script>
