import test from 'ava';
import sinon from 'sinon';
import Vue from 'vue';
import install from '../../../src/vue-kindergarten/install';
import * as dC from '../../../src/vue-kindergarten/decorateComponents';

test.beforeEach((t) => {
  t.context.spy = sinon.stub(dC, 'default');
});

test.afterEach((t) => {
  t.context.spy.restore();
});

test('calls decorateComponents method with Vue', (t) => {
  install(Vue);
  t.true(t.context.spy.calledWith(Vue));
});

test('passes child as null if not given', (t) => {
  install(Vue);
  const secondArg = t.context.spy.getCalls(0)[0].args[1];
  t.is(secondArg.child, null);
});

test('passes array of sandbox methods by default', (t) => {
  install(Vue);
  const secondArg = t.context.spy.getCalls(0)[0].args[1];
  t.deepEqual(secondArg.useSandboxMethods, [
    'loadPerimeter',
    'loadModule',
    'guard',
    'isAllowed',
    'isNotAllowed',
    'hasPerimeter',
    'getPerimeter',
    'getPerimeters',
    'governess'
  ]);
});

test('passes a given child', (t) => {
  const child = {};
  install(Vue, { child });
  const secondArg = t.context.spy.getCalls(0)[0].args[1];
  t.is(secondArg.child, child);
});

test('passes a given array of sandbox methods', (t) => {
  const useSandboxMethods = [
    'isAllowed',
    'isNotAllowed'
  ];

  install(Vue, { useSandboxMethods });
  const secondArg = t.context.spy.getCalls(0)[0].args[1];
  t.is(secondArg.useSandboxMethods, useSandboxMethods);
});
