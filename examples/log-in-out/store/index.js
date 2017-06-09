/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import Vuex from 'vuex';
/* eslint-enable */

Vue.use(Vuex);

const state = {
  user: null
};

const actions = {
  login({ commit }) {
    commit('setUser');
  },

  logout({ commit }) {
    commit('unsetUser');
  }
};

const mutations = {
  setUser(s) {
    Vue.set(s, 'user', { name: 'John' });
  },

  unsetUser(s) {
    Vue.set(s, 'user', null);
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
