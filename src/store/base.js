// the base store about menu permission and so on
import cloneDeep from 'lodash/cloneDeep';
import cookie from 'js-cookie';
import { getUserOrganizations } from '@/api/user';
import { getComplexGroupsByOrganization } from '@/api/user/organization';
import { getCountries } from '@/api/complex/base_data';
// import { AAMORGUUID } from '@/utils/constant';
import stateSetIn from '@/utils/setin';
import i18n from '@/locale';

const baseState = {
  snackbars: [],
  menu: [],
  countries: [],
  organizations: [],
  groupsByOrganization: [],
  language: cookie.get('locale') || 'en',
};
const getters = {
  menu: s => s.menu,
  countries: s => s.countries,
  organizations: s => s.organizations,
  groupsByOrganization: s => s.groupsByOrganization,
  snackbars: s => s.snackbars,
  language: s => s.language,
};
const actions = {
  updateState({ commit }, payload) {
    commit('updateState', { field: ['base'], values: payload }, { root: true });
  },
  resetSnackbar({ commit }) {
    commit('RESET_SNACKBAR');
  },
  errorSnackbar({ commit }, snackbar) {
    commit('SET_SNACKBAR', {
      text: snackbar.text,
      type: 'error',
      enter: true,
      ...snackbar,
    });
  },
  successSnackbar({ commit }, snackbar) {
    commit('SET_SNACKBAR', {
      text: 'Action success!',
      type: 'success',
      enter: true,
      ...snackbar,
    });
  },
  setSnackbar({ commit }, snackbar) {
    snackbar.type = snackbar.type || 'success';
    snackbar.enter = true;
    commit('SET_SNACKBAR', snackbar);
  },
  baseSnackbar({ commit }, payload) {
    const values = {
      visible: true,
      ...payload,
    };
    commit('updateState', { field: ['base', 'snackbar'], values }, { root: true });
  },
  getMenus({ commit }) {
    // const { organization_uuid } = rootGetters['auth/authSource'].account;
    const values = [
      {
        name: 'Task',
        path: '/task',
        id: 'task',
        icon: 'adi-bell-time',
      },
      {
        name: 'Monitoring',
        path: '/monitoring',
        id: 'monitoring',
        icon: 'adi-blocks',
        children: [
          {
            name: 'Screen',
            path: '/monitoring/screen',
            id: 'monitoring_screen',
          },
          {
            name: 'Power',
            path: '/monitoring/power',
            id: 'monitoring_power',
          },
          {
            name: 'Device',
            path: '/monitoring/device',
            id: 'monitoring_device',
          },
        ],
      },
      {
        name: 'Schedule',
        path: '/schedule',
        id: 'schedule',
        icon: 'adi-calendar-heart',
        children: [
          {
            name: 'Schedule',
            path: '/schedule/index',
            id: 'schedule',
          },
          {
            name: 'Show',
            path: '/schedule/show',
            id: 'show',
          },
        ],
      },
      {
        name: 'Content',
        path: '/content',
        id: 'content',
        icon: 'adi-bookmark-add',
        children: [
          {
            path: '/content/index',
            name: 'Content',
            id: 'content',
          },
          {
            path: '/content/keys',
            name: 'Keys',
            id: 'keys',
          },
          {
            path: '/content/transfer',
            name: 'Transfer',
            id: 'transfer',
          },
        ],
      },
      {
        name: 'Playlist',
        path: '/playlist',
        id: 'playlist',
        icon: 'adi-page-check',
        children: [
          {
            path: '/playlist/segments',
            name: 'Segments',
            id: 'segments',
          },
          {
            path: '/playlist/macro',
            name: 'Macro',
            id: 'macro',
          },
        ],
      },
      {
        name: 'Log',
        path: '/log',
        id: 'log',
        icon: 'adi-clipboard-content',
        children: [
          {
            path: '/logs/playback',
            name: 'Playback',
            id: 'playback',
          },
          {
            path: '/logs/empty_show',
            name: 'Empty show',
            id: 'empty_show',
          },
          {
            path: '/logs/power_management',
            name: 'Power management',
            id: 'power_management',
          },
        ],
      },
      {
        name: 'Site',
        path: '/site',
        id: 'site',
        icon: 'adi-city',
        children: [
          {
            path: '/site/index',
            name: 'Site',
            id: 'site',
          },
          {
            path: '/site/screen',
            name: 'Screen',
            id: 'site_screen',
          },
        ],
      },
      {
        name: 'Configuration',
        path: '/config',
        id: 'config',
        icon: 'adi-settings1',
        children: [
          {
            path: '/config/transfer_settings',
            name: 'Transfer settings',
            id: 'transfer_settings',
          },
          {
            path: '/config/power_config',
            name: '电箱配置',
            id: 'power_config',
          },
          {
            path: '/config/pos_setting',
            name: 'POS setting',
            id: 'pos_setting',
          },
          {
            path: '/config/book_schedule',
            name: 'Book schedule',
            id: 'book_schedule',
          },
          {
            path: '/config/ignore_device',
            name: '忽略的驱动器',
            id: 'ignore_device',
          },
          {
            path: '/config/log_setting',
            name: 'Log setting',
            id: 'log_setting',
          },
          {
            path: '/config/auto_clear',
            name: 'Auto clear',
            id: 'auto_clear',
          },
          {
            path: '/config/dev_tool',
            name: 'Dev tool',
            id: 'dev_tool',
          },
        ],
      },
    ];
    commit('updateState', { field: ['base', 'menu'], values }, { root: true });
  },
  async getOrganizations({ commit }) {
    try {
      const { data = [] } = await getUserOrganizations();
      commit('updateState', { field: ['base', 'organizations'], values: data }, { root: true });
    } catch (error) {
      console.log(error);
    }
  },
  async getCountries({ commit }) {
    try {
      const { data = [] } = await getCountries();
      commit('updateState', { field: ['base', 'countries'], values: data }, { root: true });
    } catch (error) {
      console.log(error);
    }
  },
  async getGroupsByOrganization({ commit }, payload) {
    try {
      const { data = [] } = await getComplexGroupsByOrganization(payload);
      commit(
        'updateState',
        { field: ['base', 'groupsByOrganization'], values: data },
        { root: true }
      );
    } catch (error) {
      console.log(error);
    }
  },
};
const mutations = {
  SET_SNACKBAR(state, snackbar) {
    state.snackbars = state.snackbars.concat(snackbar);
  },
  RESET_SNACKBAR(state) {
    state.snackbars = [];
  },
  UPDATE_STATE(state, payload) {
    state = stateSetIn(state, [], payload, true);
  },
};

export default {
  namespaced: true,
  state: cloneDeep(baseState),
  getters,
  actions,
  mutations,
};
