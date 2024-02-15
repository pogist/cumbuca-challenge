export function identity<A>(a: A): A {
  return a;
}

export function compose2<A, B, C>(g: (b: B) => C, f: (a: A) => B): (a: A) => C {
  return (a) => g(f(a));
}

export function compose<A, B>(
  f: (a: A) => B,
  ...fs: ((a: A) => A)[]
): (a: A) => B {
  return compose2(f, fs.reduce(compose2, identity));
}

export function replace(
  regex: RegExp,
  newValue: string,
): (value: string) => string {
  return (value) => value.replace(regex, newValue);
}
