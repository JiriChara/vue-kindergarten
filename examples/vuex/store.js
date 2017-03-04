/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import Vuex from 'vuex';
import BavariaIpsum from 'bavaria-ipsum';
/* eslint-enable */

const ipsum = new BavariaIpsum({
  minParagraphSentences: 10
});

Vue.use(Vuex);

const state = {
  user: {
    isAdmin: false,
    isModerator: true,
    id: 1
  },

  articles: [
    {
      id: 1,
      title: ipsum.generateSentence(),
      content: ipsum.generateParagraph(),
      userId: 1
    },
    {
      id: 2,
      title: ipsum.generateSentence(),
      content: ipsum.generateParagraph(),
      userId: 2
    },
    {
      id: 3,
      title: ipsum.generateSentence(),
      content: ipsum.generateParagraph(),
      userId: 1
    }
  ]
};

const actions = {};

const mutations = {};

const getters = {};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});
