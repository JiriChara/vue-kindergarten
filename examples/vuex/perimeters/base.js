/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import { createPerimeter } from 'vue-kindergarten';
/* eslint-enable */

export default createPerimeter({
  purpose: 'base',

  govern: {
    'can view': () => true,
    'can update': function (article) {
      return this.child.isAdmin ||
        (this.child.isModerator && article.userId === this.child.id);
    },
    'can destroy': function (article) {
      return this.isAllowed('update', article);
    }
  },

  isAdmin() {
    return this.child.isAdmin;
  },

  isModerator() {
    return this.child.isModerator;
  }
});
