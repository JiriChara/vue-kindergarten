/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import { createPerimeter } from 'vue-kindergarten';
/* eslint-enable */

export default createPerimeter({
  purpose: 'base',

  can: {
    view: () => true,

    update(article) {
      return this.child.isAdmin ||
        (this.child.isModerator && article.userId === this.child.id);
    },

    destroy(article) {
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
