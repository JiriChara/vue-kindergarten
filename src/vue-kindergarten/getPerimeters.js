import { isPerimeter, ArgumentError } from 'kindergarten';

export default (perimeters = []) => {
  if (!Array.isArray(perimeters)) {
    throw new ArgumentError('Array of perimeters must be given.');
  }

  perimeters.forEach((perimeter) => {
    if (!isPerimeter(perimeter)) {
      throw new ArgumentError('Perimeters must be instance of perimeter.');
    }
  });

  return perimeters;
};
