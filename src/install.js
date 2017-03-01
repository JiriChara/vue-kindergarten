import {
  HeadGoverness,
  createSandbox,
  isGoverness
} from 'kindergarten';

const getChild = (child) => {
  if (!child) {
    return null;
  }

  return (typeof child === 'function') ? child() : child;
};

const getPerimeters = perimeters => perimeters || [];

const getGoverness = governess => ((isGoverness(governess)) ?
  governess :
  new HeadGoverness()
);

export default (Vue,
  {
    child = null,
    useSandboxMethods = [
      'loadPerimeter',
      'loadModule',
      'guard',
      'isAllowed',
      'isNotAllowed',
      'hasPerimeter',
      'getPerimeter',
      'getPerimeters',
      'governess'
    ]
  } = {}
) => {
  Vue.mixin({
    beforeCreate() {
      const options = (this || {}).$options;

      if (!options) {
        return;
      }

      const perimeters = getPerimeters(options.perimeters);
      const governess = getGoverness(options.governess);

      this.$sandbox = createSandbox(getChild(child), {
        governess,
        perimeters
      });

      (useSandboxMethods || []).forEach((methodName) => {
        const $methodName = `$${methodName}`;
        if (!this[$methodName]) {
          const sandboxMethod = this.$sandbox[methodName];
          this[$methodName] = typeof sandboxMethod === 'function' ?
            sandboxMethod.bind(this.$sandbox) : sandboxMethod;
        }
      });
    }
  });
};
