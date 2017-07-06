/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import 'babel-polyfill';
import Vue from 'vue';
import VueKindergarten from 'vue-kindergarten';
/* eslint-enable */
import store from './store';
import App from './App.vue';
import basePerimeter from './perimeters/base';
import commentsPerimeter from './perimeters/comments';

Vue.use(VueKindergarten, {
  child: s => s.state.user
});

export default new Vue({
  el: '#app',
  perimeters: [
    basePerimeter,
    commentsPerimeter
  ],
  store,
  render: h => h(App)
});
