export const generateAssignment = (selectedOps) => {
  const operation = selectedOps[Math.floor(Math.random() * selectedOps.length)];
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const { a: displayA, b: displayB, answer } = operation.generate(a, b);
  return {
    id: Math.random().toString(36).substr(2, 9),
    a: displayA,
    b: displayB,
    operator: operation.symbol,
    correctAnswer: answer,
  };
};
