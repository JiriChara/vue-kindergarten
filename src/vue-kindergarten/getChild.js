export default (child = null, { store } = {}) => (
  typeof child === 'function' ? child(store) : child
);
