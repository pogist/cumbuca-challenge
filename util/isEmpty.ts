import { isNullable } from './isNullable';

export function isEmpty(value?: string | null): boolean {
  if (isNullable(value)) {
    return true;
  }
  return value.length === 0;
}
