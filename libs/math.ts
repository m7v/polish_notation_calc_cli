/**
 * Math lib provides simple operators based on "+" operator. Just for Fun =)
 */
function negate(a: number) {
  let x = 0;
  let d = a > 0 ? -1 : 1;

  while (a != 0) {
    x += d;
    a += d;
  }
  return x;
}

function abs(a: number) {
  return a < 0 ? negate(a) : a;
}

export function subtract(a: number, b: number) {
  return a + negate(b);
}

export function power(a: number, n: number): number {
  if (n == 0) {
    return 1;
  }
  if (n == 1) {
    return a;
  }
  const x = power(a, Math.floor(n / 2));

  return n % 2 === 0 ? x * x : a * x * x;
}

export function multiply(a: number, b: number): number {
  if (a < b) {
    return multiply(b, a);
  }
  let result = 0;

  for (let i = abs(b); i > 0; i--) {
    result += a;
  }

  return b > 0 ? result : negate(result);
}

export function divide(a: number, b: number) {
  if (b == 0) {
    throw new Error("Can't divide by zero");
  }
  const absA = abs(a);
  const absB = abs(b);

  let product = 0;
  let x = 0;
  while (product + absB <= absA) {
    product += absB;
    x++;
  }

  if ((a < 0 && b < 0) || (a > 0 && b > 0)) {
    return x;
  } else {
    return negate(x);
  }
}

export function mod(a: number, b: number) {
  if (b == 0) {
    throw new Error("Can't divide by zero");
  }
  const absA = abs(a);
  const absB = abs(b);

  let product = 0;
  let x = 0;
  while (product + absB <= absA) {
    product += absB;
    x++;
  }

  return absA + multiply(x, absB);
}
