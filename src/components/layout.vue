<template>
  <v-app class="mainContainer">
    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="$vuetify.breakpoint.mdAndUp"
      width="289"
      mobile-breakpoint="960"
      floating
    >
      <MyMenu />
      <template slot="append">
        <p class="font-weight-black text-center">© Arts Alliance Media</p>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      app
      height="72"
      color="primary"
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      elevation="1"
      class="appBar"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-md-none">
        <v-icon color="white" class="ml-2">adi-menu</v-icon>
      </v-app-bar-nav-icon>
      <v-divider class="mx-2 d-md-none" inset vertical dark />
      <v-toolbar-title v-if="$vuetify.breakpoint.mdAndDown">
        <v-img
          :src="$logo"
          width="64"
          max-width="48"
          height="48"
          max-height="48"
          class="ml-2 white-icon"
        />
      </v-toolbar-title>

      <div class="d-md-flex align-center title hidden-sm-and-down pl-2">
        <v-img :src="$logo" width="64" max-width="64" height="64" max-height="64" class="ml-2" />
        <strong class="ml-4 text-uppercase text-h5 font-weight-bold">
          Screenwriter
        </strong>
      </div>
      <v-spacer />
      <v-sheet class="d-flex flex-nowrap align-center" color="transparent">
        <v-autocomplete
          dense
          v-model="currentOrg"
          color="#fff"
          prepend-inner-icon="adi-earth"
          append-icon=""
          :items="organizations.results"
          hide-details
          item-text="name"
          item-value="uuid"
          dark
          solo
          background-color="transparent"
          flat
          item-color="gradient-primary"
          class="font-weight-bold white--text"
          :class="{ myOrg: $vuetify.breakpoint.smAndDown }"
          @change="organizationChange"
          :style="{ width }"
          :error-messages="organizations.message"
          :loading="organizations.loading"
        />

        <v-menu offset-y left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" color="white">
              <v-icon>adi-layout-grid</v-icon>
            </v-btn>
          </template>
          <v-card elevation="0">
            <v-row class="px-4">
              <v-col v-for="item in platforms" :key="item.label">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    class="d-flex align-center justify-center flex-column pa-3"
                    width="100"
                    link
                    flat
                    :elevation="hover ? 1 : 0"
                    :class="{ 'on-hover pointer': hover, [item.hover]: hover }"
                    :href="item.url"
                    target="_blank"
                  >
                    <v-img
                      :src="item.logo"
                      max-width="48"
                      max-height="48"
                      :class="{ 'white-icon': hover }"
                    />
                    <span
                      class="text-uppercase font-weight-bold fontsize-16"
                      :class="{ 'white--text': hover }"
                      >{{ item.label }}</span
                    >
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-card>
        </v-menu>
        <!--        <Notification />-->
        <v-menu offset-y right content-class="profileAction" min-width="128" v-model="menu">
          <template v-slot:activator="{ on, attrs }">
            <div
              class="pa-4"
              v-on="on"
              v-bind="attrs"
              :class="{ 'white-bg': attrs['aria-expanded'] === 'true' }"
            >
              <v-avatar color="grey" size="40" class="pointer">
                <strong class="white--text">{{ $formatUserName(account.username) }}</strong>
              </v-avatar>
            </div>
          </template>
          <v-list>
            <v-list-item @click="() => userAction('profile')">
              <v-list-item-title class="text-capitalize">{{
                $t('word.profile')
              }}</v-list-item-title>
            </v-list-item>
            <v-menu offset-x left open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item v-on="on" v-bind="attrs">{{ languages[language] }}</v-list-item>
              </template>
              <v-list>
                <v-list-item
                  color="primary"
                  v-for="(value, name) in languages"
                  :key="name"
                  @click="() => changeLocale(name)"
                  :class="{ 'v-item--active v-list-item--active': language === name }"
                  >{{ value }}</v-list-item
                >
              </v-list>
            </v-menu>
            <v-list-item @click="() => userAction('logout')">
              <v-list-item-title class="text-capitalize">{{ $t('word.logout') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-sheet>
    </v-app-bar>
    <v-main>
      <router-view class="px-md-3" />
    </v-main>
    <SnackbarAlert v-if="snackbars.length > 0" />
  </v-app>
</template>
<script>
import { Vue, Component, Watch } from 'vue-property-decorator';
import io from 'socket.io-client';
import cookie from 'js-cookie';
import moment from 'moment';
import { updateCookie } from '@/api/base';
import Configuration from '@/Configuration';
import SnackbarAlert from '@/components/snackbarAlert';
import { LANGUAGES, LANGUAGES_FOR_VUETIFY } from '@/utils/constant';
// import Notification from '@/components/notification';
import MyMenu from './menus';

@Component({
  components: {
    MyMenu,
    SnackbarAlert,
    // Notification,
  },
})
export default class Layout extends Vue {
  // logo = require('@artsalliancemedia/iconfont/svg/admin.svg');

  // logoProducer = require('@artsalliancemedia/iconfont/svg/producer.svg');

  drawer = null;

  menu = false;

  languages = LANGUAGES;

  platforms = [
    {
      label: 'HUB',
      logo: this.$logoAdmin,
      url: Configuration('hubUrl'),
      hover: 'gradient',
    },
    {
      label: 'Producer',
      logo: this.$logoProducer,
      url: Configuration('producerUrl'),
      hover: 'gradient-producer',
    },
  ];

  io = io({
    path: '/ws',
    cookie: false,
    transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling'],
  });

  language = cookie.get('locale');

  get authSource() {
    return this.$store.getters['auth/authSource'];
  }

  get account() {
    return this.authSource.account;
  }

  get organizations() {
    return this.authSource.organizations;
  }

  get orgResults() {
    return this.organizations.results;
  }

  get currentOrg() {
    return this.orgResults.filter(item => item.uuid === this.account.organization_uuid)[0] || {};
  }

  set currentOrg(val) {
    return val;
  }

  get snackbars() {
    return this.$store.getters['base/snackbars'];
  }

  get width() {
    if (this.$vuetify.breakpoint.smAndDown) {
      return '48px';
    }
    if (this.currentOrg.name) {
      return `${(this.currentOrg.name.length + 1) * 7.7 + 64}px`;
    }
    return 'auto';
  }

  @Watch('account.organization_uuid')
  orgChange(val, old) {
    if (val !== old) {
      this.io.emit('change organization', {
        from: 'hub',
        data: { uuid: val, env: Configuration('env') },
      });
    }
  }

  mounted() {
    this.$store.dispatch('auth/getOrganizations');
    const vm = this;
    this.io.emit('landing', { from: 'Hub', data: { env: Configuration('env') } });
    this.io.on('change organization', row => {
      if (vm.currentOrg.uuid !== row.data.uuid) {
        vm.$store.dispatch('auth/changeOrganization', { organization_uuid: row.data.uuid });
      }
      vm.$store.dispatch('resetState', null, { root: true });
    });
  }

  userAction(mark) {
    switch (mark) {
      case 'profile':
        this.$router.push('/profile');
        break;
      case 'logout':
        this.$store.dispatch('auth/logout');
        break;
      default:
        break;
    }
  }

  getOrganizations() {
    this.$store.dispatch('auth/getOrganizations');
  }

  organizationChange(uuid) {
    if (uuid !== this.account.organization_uuid) {
      this.$store.dispatch('auth/changeOrganization', { organization_uuid: uuid });
    }
  }

  changeLocale(val) {
    this.menu = false;
    this.$vuetify.lang.current = LANGUAGES_FOR_VUETIFY[val];
    this.language = val;
    this.$i18n.locale = val;
    updateCookie({ key: 'locale', value: val });
    moment.locale(val);
    this.$store.dispatch('base/getMenus');
  }
}
</script>
<style scoped lang="scss">
.title {
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 289px;
  .text {
    font-size: 24px;
    font-weight: bold;
  }
}
.appBar {
  ::v-deep .adi,
  [class^='adi-'],
  [class*='adi-'] {
    font-weight: normal;
  }
  ::v-deep .v-toolbar__content {
    padding: 0 0 0 16px;
  }
}
.profileAction {
  right: 0;
  left: auto !important;
}
.myOrg {
  ::v-deep .v-select__slot {
    opacity: 0;
  }
}
</style>
