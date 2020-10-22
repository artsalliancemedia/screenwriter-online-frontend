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
        icon: 'adi-user-circle',
      },
      {
        name: 'Monitoring',
        path: '/monitoring',
        id: 'monitoring',
        icon: 'adi-user-circle',
      },
      {
        name: 'Schedule',
        path: '/schedule',
        id: 'schedule',
        icon: 'adi-user-circle',
      },
      {
        name: 'Content',
        path: '/content',
        id: 'content',
        icon: 'adi-user-circle',
      },
      {
        name: 'Playlist',
        path: '/playlist',
        id: 'playlist',
        icon: 'adi-user-circle',
      },
      {
        name: 'Log',
        path: '/log',
        id: 'log',
        icon: 'adi-user-circle',
      },
      {
        name: 'Site',
        path: '/site',
        id: 'site',
        icon: 'adi-user-circle',
      },
      {
        name: 'Configuration',
        path: '/configuration',
        id: 'configuration',
        icon: 'adi-user-circle',
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
      commit('updateState', { field: ['base', 'groupsByOrganization'], values: data }, { root: true });
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
