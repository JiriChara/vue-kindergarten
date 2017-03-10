import {
  ArgumentError,
  createSandbox
} from 'kindergarten';

import getChild from './getChild';
import getGoverness from './getGoverness';
import getPerimeters from './getPerimeters';

export default (Vue = {}, { child, useSandboxMethods, exposePurpose } = {}) => {
  if (!Vue.mixin) {
    throw new ArgumentError(
      'Vue must be instance of Vue. Did you initialize the plugin properly?'
    );
  }

  Vue.mixin({
    beforeCreate() {
      const options = (this || {}).$options;
      const store = this.$store || null;
      const rootOptions = this.$root.$options;

      const perimeters = getPerimeters(options.perimeters || rootOptions.perimeters);
      const governess = getGoverness(options.governess || rootOptions.governess);
      const sandboxChild = getChild(child, { store });

      this.$sandbox = createSandbox(sandboxChild, {
        governess,
        perimeters
      });

      // Add helper methods from sandbox
      (useSandboxMethods || []).forEach((methodName) => {
        const $methodName = `$${methodName}`;
        const sandboxMethod = this.$sandbox[methodName];
        this[$methodName] = typeof sandboxMethod === 'function' ?
          sandboxMethod.bind(this.$sandbox) : sandboxMethod;
      });

      // Add purpose
      if (exposePurpose) {
        this.$sandbox.getPerimeters().forEach((perimeter) => {
          const purpose = perimeter.getPurpose();
          this[`$${purpose}`] = this.$sandbox[purpose];
        });
      }
    }
  });
};
