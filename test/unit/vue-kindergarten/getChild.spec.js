import test from 'ava';

import getChild from '../../../src/vue-kindergarten/getChild';

test('returns null if no child given', (t) => {
  t.is(null, getChild());
});

test('returns given child if not function', (t) => {
  const child = {};

  t.is(child, getChild(child));
});

test('extracts child from the given store', (t) => {
  const child = store => store.foo;

  const store = { foo: 'bar' };

  t.is('bar', getChild(child, { store }));
});

test('returns return value of the child method', (t) => {
  const child = () => 'bar';

  t.is('bar', getChild(child));
});
