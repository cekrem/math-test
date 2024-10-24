export const OPERATIONS = [
  { symbol: '×', generate: (a, b) => ({ a, b, answer: a * b }) },
  { symbol: '÷', generate: (a, b) => ({ a: a * b, b, answer: a }) },
  { symbol: '-', generate: (a, b) => ({ a: a + b, b, answer: a }) },
  { symbol: '+', generate: (a, b) => ({ a, b, answer: a + b }) },
];
