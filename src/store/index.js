import Vue from 'vue';
import Vuex from 'vuex';
import globalStore from './global';
import base from './base';

const files = require.context('../views/', true, /^\.\/(\w*\/)+store\.js$/);
const modules = {};
files.keys().forEach(file => {
  const moduleName = file.replace(/(^\.\/)|(\/store\.js$)/g, '');
  modules[moduleName] = files(file).default || files(file);
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    base,
    ...modules,
  },
  ...globalStore,
});
