import cloneDeep from 'lodash/cloneDeep';
// import router from '@/router';
// import commonMutations from '@/store/common';
import stateSetIn from '@/utils/setin';
import { login, refresh, logout, recoverPassword } from '@/api/user/auth';
import { getUserOrganizations, changeOrganization } from '@/api/user';
import { AAMORGUUID } from '@/utils/constant';

const defaultState = {
  authSource: {
    loading: false,
    message: '',
    authed: false,
    account: {},
    refreshed: false,

    organizations: {
      loading: false,
      message: '',
      results: [],
    },
  },
};
const getters = {
  authSource: state => state.authSource,
};
const actions = {
  updateAuthSource({ commit }, payload) {
    commit('UPDATE_AUTH_SOURCE', payload);
  },
  async login({ commit, rootGetters }, payload) {
    commit('UPDATE_AUTH_SOURCE', {
      // loading: true,
      message: '',
      authed: false,
    });
    await login(payload)
      .then(response => {
        commit('UPDATE_AUTH_SOURCE', {
          // loading: false,
          account: response.data,
          authed: true,
        });
        sessionStorage.setItem('organizationUuid', response.data.organization_uuid);
        sessionStorage.setItem('userUuid', response.data.uuid);
        sessionStorage.setItem('isAamUser', response.data.is_aam_user ? 'no' : 'yes');
        sessionStorage.setItem('userName', response.data.username);
        const { redirect = '/organizations' } = rootGetters.routeQuery;
        // router.push(redirect);
        this._vm.$pushRoute(redirect);
      })
      .catch(error => {
        commit('UPDATE_AUTH_SOURCE', { message: error.message, loading: false });
      });
  },
  async refresh({ commit }) {
    commit('UPDATE_AUTH_SOURCE', { refreshed: true, loading: true, message: '', authed: false });
    let auth = false;
    await refresh()
      .then(response => {
        commit('UPDATE_AUTH_SOURCE', { loading: false });
        if (response.code === 200) {
          commit('UPDATE_AUTH_SOURCE', { authed: true, account: response.data });
          sessionStorage.setItem('organizationUuid', response.data.organization_uuid);
          sessionStorage.setItem('userUuid', response.data.uuid);
          sessionStorage.setItem('isAamUser', response.data.is_aam_user ? 'no' : 'yes');
          sessionStorage.setItem('userName', response.data.username);
          auth = true;
        }
      })
      .catch(error => {
        commit('UPDATE_AUTH_SOURCE', { loading: false, message: error.message });
      });
    return auth;
  },
  logout({ commit, dispatch }) {
    logout()
      .then(() => {
        sessionStorage.clear();
        commit('UPDATE_AUTH_SOURCE', { authed: false });
        dispatch('clearState', null, { root: true });
        this._vm.$pushRoute({ path: '/login' });
      })
      .catch(() => {});
  },
  async sendReset({ dispatch }, payload) {
    dispatch('updateField', { field: ['auth', 'sent'], values: false }, { root: true });
    dispatch('updateField', { field: ['auth', 'sentMessage'], values: null }, { root: true });
    await recoverPassword(payload)
      .then(response => {
        if (response.code !== 204) {
          dispatch(
            'updateField',
            { field: ['auth', 'sentMessage'], values: response.message },
            { root: true }
          );
        }
        dispatch('updateField', { field: ['auth', 'sent'], values: true }, { root: true });
      })
      .catch(error => {
        dispatch(
          'updateField',
          {
            field: ['auth', 'sentMessage'],
            values: error.message,
          },
          { root: true }
        );
      });
  },
  async getOrganizations({ commit }) {
    commit('UPDATE_AUTH_ORG', { loading: false, message: '', results: [] });
    try {
      const { data = [] } = await getUserOrganizations();
      commit('UPDATE_AUTH_ORG', { loading: false, results: data });
    } catch (error) {
      commit('UPDATE_AUTH_ORG', { loading: false, message: error.message });
    }
  },
  changeOrganization({ commit, dispatch }, payload) {
    changeOrganization(payload)
      .then(response => {
        const { data } = response;
        commit('UPDATE_AUTH_SOURCE', {
          loading: false,
          account: data,
          authed: true,
        });
        sessionStorage.setItem('organizationUuid', response.data.organization_uuid);
        sessionStorage.setItem('userUuid', response.data.uuid);
        sessionStorage.setItem('isAamUser', response.data.is_aam_user ? 'no' : 'yes');
        sessionStorage.setItem('userName', response.data.uuid);
        if (data.organization_uuid !== AAMORGUUID) {
          // router.replace(`/organizations/${data.organization_uuid}`);
          this._vm.$pushRoute(`/organizations/${data.organization_uuid}`);
        } else {
          // router.replace('/organizations');
          this._vm.$pushRoute('/organizations');
        }
        // dispatch('resetState', null, { root: true });
        dispatch('base/getMenus', null, { root: true });
      })
      .catch(error => {
        dispatch('base/errorSnackbar', { text: error.message }, { root: true });
      });
  },
  redirect({ commit }) {
    commit('UPDATE_AUTH_SOURCE', { authed: false });
    const { origin, href } = window.location;
    const redirect = href.split(origin)[1];
    // router.replace({ path: '/login', query: { redirect } });
    this._vm.$pushRoute({ path: '/login', query: { redirect } });
  },
};
const mutations = {
  clearState(state) {
    Object.assign(state, defaultState);
  },
  UPDATE_AUTH_SOURCE(state, payload) {
    state = stateSetIn(state, ['authSource'], payload, true);
  },
  UPDATE_AUTH_ORG(state, payload) {
    state = stateSetIn(state, ['authSource', 'organizations'], payload, true);
  },
  // ...commonMutations,
};
export default {
  namespaced: true,
  state: cloneDeep(defaultState),
  getters,
  actions,
  mutations,
};
