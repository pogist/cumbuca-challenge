export function isNull<T>(value: T | null): value is null {
  return value === null;
}

export function isUndefined<T>(value: T | undefined): value is undefined {
  return value === undefined;
}

export function isNullable<T>(
  value: T | null | undefined,
): value is null | undefined {
  return isNull(value) || isUndefined(value);
}
