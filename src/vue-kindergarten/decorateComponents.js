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
      const sandboxChild = () => getChild(child, { store });
      const sandboxGetter = () => createSandbox(sandboxChild(), {
        governess,
        perimeters
      });

      const sandbox = sandboxGetter();

      options.computed = options.computed || {};
      options.methods = options.methods || {};

      options.computed.$sandbox = sandboxGetter;

      // Add helper methods from sandbox
      (useSandboxMethods || []).forEach((methodName) => {
        const $methodName = `$${methodName}`;
        const sandboxMethod = sandbox[methodName];
        options.computed[$methodName] = typeof sandboxMethod === 'function' ?
          () => sandboxMethod.bind(sandboxGetter()) : () => sandboxMethod;
      });

      // Add purpose
      if (exposePurpose) {
        sandbox.getPerimeters().forEach((perimeter) => {
          const purpose = perimeter.getPurpose();
          options.computed[`$${purpose}`] = () => sandboxGetter()[purpose];
        });
      }
    }
  });
};
