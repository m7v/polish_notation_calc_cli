import { clean } from './utils';

const OPERATORS = '^*/+-';

/**
 * Processing infix string (e.g. 1 - 2 * (3 + 4)) into Postfix notation.
 */
export function infixToPostfix(infix: string) {
  const outputQueue = [];
  const operatorStack = [];

  // Write all operators with their precedence and associativity.
  const operators: any = {
    '^': {
      precedence: 4,
      associativity: 'Right',
    },
    '/': {
      precedence: 3,
      associativity: 'Left',
    },
    '*': {
      precedence: 3,
      associativity: 'Left',
    },
    '+': {
      precedence: 2,
      associativity: 'Left',
    },
    '-': {
      precedence: 2,
      associativity: 'Left',
    },
  };

  // Simple clean. We leave just what we need.
  const infixArray = clean(infix.replace(/\s+/g, '').split(/([\+\-\*\/\^\(\)])/));

  for (let i = 0; i < infixArray.length; i++) {
    const token = infixArray[i];

    switch (true) {
      // We put numbers into stack.
      case !isNaN(Number(token)):
        outputQueue.push(token);
        break;
      // If we found operator we try to priority for that.
      case OPERATORS.indexOf(token) !== -1:
        const currentOperator = token;
        let operatorFromStack = operatorStack[operatorStack.length - 1];

        // We get current operator and last operator into a stack.
        const curOpData = operators[currentOperator];
        const opFromStackData = operators[operatorFromStack];

        // If operators have different precedence, we should put one into Queue.
        while (
          OPERATORS.indexOf(operatorFromStack) !== -1 &&
          ((curOpData.associativity === 'Left' && curOpData.precedence <= opFromStackData.precedence) ||
            (curOpData.associativity === 'Right' && curOpData.precedence < opFromStackData.precedence))
        ) {
          outputQueue.push(operatorStack.pop());
          operatorFromStack = operatorStack[operatorStack.length - 1];
        }
        operatorStack.push(currentOperator);
        break;
      case token === '(':
        operatorStack.push(token);
        break;
      case token === ')':
        while (operatorStack[operatorStack.length - 1] !== '(') {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.pop();
        break;
    }
  }

  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop());
  }

  return outputQueue.join(' ');
}
