import test from 'ava';
import Vue from 'vue';
import {
  createPerimeter,
  EasyGoverness
} from 'kindergarten';

import VueKindergarten from '../../../src';

const fooPerimeter = createPerimeter({
  purpose: 'foo'
});

test.beforeEach((t) => {
  t.context.child = {};
  t.context.perimeters = [
    fooPerimeter
  ];
  t.context.governess = new EasyGoverness();

  Vue.use(VueKindergarten, {
    child() {
      return t.context.child;
    },
    useSandboxMethods: false,
    exposePurpose: false
  });

  t.context.myComponent = new Vue({
    render(createElement) {
      return createElement('div', 'Hello World');
    },

    perimeters: t.context.perimeters,

    governess: t.context.governess
  }).$mount();
});

test('does not expose purpose', (t) => {
  t.falsy(t.context.myComponent.$foo);
});

test('does not add any sandbox methods', (t) => {
  const sandboxMethods = [
    '$loadPerimeter',
    '$loadModule',
    '$guard',
    '$isAllowed',
    '$isNotAllowed',
    '$hasPerimeter',
    '$getPerimeter',
    '$getPerimeters',
    '$governess'
  ];

  sandboxMethods.forEach((method) => {
    t.falsy(t.context.myComponent[method]);
  });
});
