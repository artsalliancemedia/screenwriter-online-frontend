import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import assign from 'lodash/assign';
import stateSetIn from '@/utils/setin';

const N = ['undefined', undefined, 'null', null];

const globalStore = {
  mutations: {
    async updateState(state, payload) {
      const { field, values = null } = payload;
      state = stateSetIn(state, field, values);
    },
    // resetState(state) {
    //   console.log('reset all', state);
    //   state = Object.assign(state, { ...defaultState, auth: { authSource: { account: {} } } });
    // },
  },
  actions: {
    clearState({ commit }) {
      commit('auth/clearState');
      commit('users/clearState');
      commit('screenconnect/clearState');
      commit('sites/clearState');
      commit('profile/clearState');
      commit('organizations/clearState');
    },
    resetState({ commit }) {
      commit('users/clearState');
      commit('screenconnect/clearState');
      commit('sites/clearState');
      commit('profile/clearState');
      commit('organizations/clearState');
    },
    async updateField({ commit }, payload) {
      await commit('updateState', payload);
    },
    // update search can support just change the url value or the object
    // demo
    // dispatch('updateSearch',{demo: 1},{root:true})
    // dispatch('updateSearch',{field: ['demo', 'text'], values: 1},{root:true})
    async updateSearch({ getters }, payload) {
      const { field = [], values } = payload;
      let query = {};
      if (field.length > 0) {
        query = assign({}, getters.routeQuery);
        query = stateSetIn(query, field, values);
      } else {
        query = assign({}, getters.routeQuery, payload);
      }
      await Object.keys(query).map(key => {
        // clear the undefined null
        if (N.includes(query[key])) {
          delete query[key];
        }
        // format the object
        if (isObject(query[key]) || isArray(query[key])) {
          // query[key] = encodeURIComponent(JSON.stringify(query[key]));
          query[key] = JSON.stringify(query[key]);
        }
        return true;
      });
      await this._vm.$pushRoute({ query });
    },
  },
  getters: {
    routeQuery: rootState => rootState.route.query,
    routeParams: rootState => rootState.route.params,
  },
};

export default globalStore;
