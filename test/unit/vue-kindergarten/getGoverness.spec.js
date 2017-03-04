import test from 'ava';
import { HeadGoverness, GermanGoverness } from 'kindergarten';

import getGoverness from '../../../src/vue-kindergarten/getGoverness';

test('returns instance of HeadGoverness if no governess given', (t) => {
  t.true(getGoverness() instanceof HeadGoverness);
});

test('throws an error if governess is not governess', (t) => {
  t.throws(
    () => getGoverness('foo'),
    'Governess must be instance of HeadGoverness.'
  );
});

test('returns given governess', (t) => {
  t.true(getGoverness(new GermanGoverness()) instanceof GermanGoverness);
});
