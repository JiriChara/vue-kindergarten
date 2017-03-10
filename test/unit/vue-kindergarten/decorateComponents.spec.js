import test from 'ava';
import sinon from 'sinon';
import Vue from 'vue';
import {
  createPerimeter,
  EasyGoverness,
  Purpose
} from 'kindergarten';

import decorateComponents from '../../../src/vue-kindergarten/decorateComponents';
import VueKindergarten from '../../../src';

const child = {};

const perimeters = [
  createPerimeter({
    purpose: 'foo'
  })
];
const governess = new EasyGoverness();

const useSandboxMethods = [
  'isNotAllowed',
  'guard'
];

Vue.use(VueKindergarten, {
  child() {
    return child;
  },
  useSandboxMethods
});

const myComponent = new Vue({
  render(createElement) {
    return createElement('div', 'Hello World');
  },
  perimeters,
  governess
}).$mount();

test('throws an error if Vue does not have mixin method', (t) => {
  t.throws(
    () => decorateComponents(),
    'Vue must be instance of Vue. Did you initialize the plugin properly?'
  );
});

test('mixins beforeCreate method', (t) => {
  const spy = sinon.spy(Vue, 'mixin');

  decorateComponents(Vue);

  t.true(spy.called);

  const arg = spy.getCalls(0)[0].args[0];

  t.is(Object.keys(arg)[0], 'beforeCreate');
});

test('creates sandbox on the component sandbox', (t) => {
  t.truthy(myComponent.$sandbox);
});

test('sets perimeters', (t) => {
  t.deepEqual(myComponent.$sandbox.getPerimeters(), perimeters);
});

test('sets governess', (t) => {
  t.deepEqual(myComponent.$sandbox.governess, governess);
});

test('sets child', (t) => {
  t.is(myComponent.$sandbox.child, child);
});

test('adds methods from useSandboxMethods array', (t) => {
  t.true(typeof myComponent.$isNotAllowed === 'function');
  t.falsy(myComponent.$isAllowed);
});

test('exposes purpose', (t) => {
  t.true(myComponent.$foo instanceof Purpose);
});
