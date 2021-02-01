import { divide, multiply, power, subtract } from './math';

/**
 * Parse Polish notation and solve it.
 */
export function parsePolishNotation(newExpr: string) {
  const expr = newExpr.split(' ');
  const stack: string[] = [];

  if (!expr.length) {
    return 0;
  }

  for (let i = 0; i < expr.length; i++) {
    const elem = Number(expr[i]);

    // Add number into stack
    if (!isNaN(elem)) {
      stack.push(expr[i]);
    } else {
      // If we find Operator in stack, we will take last two numbers
      const a = Number(stack.pop());
      const b = Number(stack.pop());

      // Then we get result by operator
      switch (expr[i]) {
        case '+':
          stack.push(`${a + b}`);
          break;
        case '-':
          stack.push(`${subtract(b, a)}`);
          break;
        case '*':
          stack.push(`${multiply(a, b)}`);
          break;
        case '/':
          stack.push(`${divide(b, a)}`);
          break;
        case '^':
          stack.push(`${power(b, a)}`);
          break;
      }
    }
  }

  if (stack.length > 1) {
    return 'ERROR';
  } else {
    return stack[0];
  }
}
