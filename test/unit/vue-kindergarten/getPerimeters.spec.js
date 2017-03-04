import test from 'ava';
import { createPerimeter } from 'kindergarten';

import getPerimeters from '../../../src/vue-kindergarten/getPerimeters';

test('returns empty array if no perimeters given', (t) => {
  t.deepEqual(getPerimeters(), []);
});

test('throws an error if perimeters are not perimeters', (t) => {
  const perimeters = [
    1, 2, 3
  ];

  t.throws(
    () => getPerimeters(perimeters),
    'Perimeters must be instance of perimeter'
  );
});

test('returns given perimeters array', (t) => {
  const perimeters = [
    createPerimeter({
      purpose: 'foo'
    })
  ];

  t.is(getPerimeters(perimeters), perimeters);
});

test('returns empty array if given', (t) => {
  const perimeters = [];

  t.is(getPerimeters(perimeters), perimeters);
});
