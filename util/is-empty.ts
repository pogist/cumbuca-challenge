import { isNullable } from './is-nullable';

export function isEmpty(value?: string | null): boolean {
  if (isNullable(value)) {
    return true;
  }
  return value.length === 0;
}
