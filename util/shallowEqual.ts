export function shallowEqual<T extends object>(lhs: T, rhs: T): boolean {
  for (const key of Object.keys(lhs)) {
    const lhsValue = lhs[key as keyof T];
    const rhsValue = rhs[key as keyof T];
    const isNotEqual =
      typeof lhsValue !== typeof rhsValue ||
      (typeof lhsValue === 'object' && !Object.is(lhsValue, rhsValue)) ||
      lhsValue !== rhsValue;
    if (isNotEqual) {
      return false;
    }
  }
  return true;
}
