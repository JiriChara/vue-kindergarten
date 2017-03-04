import {
  createSandbox
} from 'kindergarten';

import getChild from './getChild';
import getGoverness from './getGoverness';
import getPerimeters from './getPerimeters';

export default (Vue, { child, useSandboxMethods }) => {
  Vue.mixin({
    beforeCreate() {
      const options = (this || {}).$options;
      const store = this.$store || null;
      const rootOptions = this.$root.$options;

      if (!options) {
        return;
      }

      const perimeters = getPerimeters(options.perimeters || rootOptions.perimeters);
      const governess = getGoverness(options.governess || rootOptions.governess);

      this.$sandbox = createSandbox(getChild(child, { store }), {
        governess,
        perimeters
      });

      // Add helper methods from sandbox
      (useSandboxMethods || []).forEach((methodName) => {
        const $methodName = `$${methodName}`;
        if (!this[$methodName]) {
          const sandboxMethod = this.$sandbox[methodName];
          this[$methodName] = typeof sandboxMethod === 'function' ?
            sandboxMethod.bind(this.$sandbox) : sandboxMethod;
        }
      });

      // Add purpose
      this.$sandbox.getPerimeters().forEach((perimeter) => {
        const purpose = perimeter.getPurpose();
        this[`$${purpose}`] = this.$sandbox[purpose];
      });
    }
  });
};
