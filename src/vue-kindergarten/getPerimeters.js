import { isPerimeter, ArgumentError } from 'kindergarten';

export default (perimeters = []) => {
  if (!Array.isArray(perimeters)) return [];

  perimeters.forEach((perimeter) => {
    if (!isPerimeter(perimeter)) {
      throw new ArgumentError('Perimeters must be instance of perimeter');
    }
  });

  return perimeters;
};
