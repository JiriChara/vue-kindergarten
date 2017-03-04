import {
  HeadGoverness,
  isGoverness
} from 'kindergarten';

export default governess => (
  (isGoverness(governess)) ? governess : new HeadGoverness()
);
