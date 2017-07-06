/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import { createPerimeter } from 'vue-kindergarten';
/* eslint-enable */

export default createPerimeter({
  purpose: 'comments',

  can: {
    view: () => true,
    update: () => true
  }
});
