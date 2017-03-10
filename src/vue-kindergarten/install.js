import decorateComponents from './decorateComponents';

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
    ],
    exposePurpose = true
  } = {}
) => {
  decorateComponents(Vue, { child, useSandboxMethods, exposePurpose });
};
