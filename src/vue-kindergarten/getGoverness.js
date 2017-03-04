import {
  HeadGoverness,
  isGoverness,
  ArgumentError
} from 'kindergarten';

export default (governess) => {
  if (!governess) return new HeadGoverness();

  if (!isGoverness(governess)) {
    throw new ArgumentError('Governess must be instance of HeadGoverness.');
  }

  return governess;
};
