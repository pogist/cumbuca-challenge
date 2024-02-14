import { isNullable } from './isNullable';

export function isEmpty(value?: any | null): boolean {
  if (isNullable(value)) {
    return true;
  }
  if (typeof value === 'string') {
    return value.length === 0;
  }
  if (typeof value === 'object' && Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value as object).length === 0;
  }
  return false;
}
