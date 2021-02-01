import { infixToPostfix } from './libs/infixToPostfix';
import { parsePolishNotation } from './libs/parsePolishNotation';

const infix = '1 - 2 * (18 + 6) / 2 ^ 2'
console.log('Initial', infix);
const postFix = infixToPostfix(infix);
console.log('postFix', postFix);
const result = parsePolishNotation(postFix);
console.log('result', result);
