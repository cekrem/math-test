import { useState, useEffect } from 'react';
import Assignment from './Assignment';

const OPERATIONS = [
  { symbol: '×', generate: (a, b) => ({ a, b, answer: a * b }) },
  { symbol: '÷', generate: (a, b) => ({ a: a * b, b, answer: a }) },
  { symbol: '-', generate: (a, b) => ({ a: a + b, b, answer: a }) },
  { symbol: '+', generate: (a, b) => ({ a, b, answer: a + b }) },
];

const generateAssignment = (selectedOps) => {
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

const App = () => {
  const [selectedOperations, setSelectedOperations] = useState([OPERATIONS[0]]);
  const [assignments, setAssignments] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [numberOfAssignments, setNumberOfAssignments] = useState(10);

  useEffect(() => {
    generateNewAssignments();
  }, [selectedOperations, numberOfAssignments]);

  const generateNewAssignments = () => {
    setAssignments(
      Array.from({ length: numberOfAssignments }, () => generateAssignment(selectedOperations)),
    );
    setUserAnswers({});
    setCorrectAnswers(null);
  };

  const updateUserAnswer = (id, answer) => {
    setUserAnswers((prev) => ({ ...prev, [id]: answer }));
  };

  const resetAnswers = () => {
    setUserAnswers({});
  };

  const checkAnswers = () => {
    const correct = assignments.filter(
      (assignment) => Number(userAnswers[assignment.id]) === assignment.correctAnswer,
    ).length;
    setCorrectAnswers(correct);
  };

  const handleOperationToggle = (operation) => {
    setSelectedOperations((prev) => {
      if (prev.includes(operation) && prev.length > 1) {
        return prev.filter((op) => op !== operation);
      } else if (!prev.includes(operation)) {
        return [...prev, operation];
      }
      return prev;
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full p-4">
      <h1 className="text-3xl font-bold mb-4">Math Test</h1>
      <div className="mb-4">
        {OPERATIONS.map((operation) => (
          <label key={operation.symbol} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedOperations.includes(operation)}
              onChange={() => handleOperationToggle(operation)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">{operation.symbol}</span>
          </label>
        ))}
      </div>
      <div className="mb-4">
        <label htmlFor="assignmentCount" className="block text-sm font-medium text-gray-700">
          Number of Assignments: {numberOfAssignments}
        </label>
        <input
          type="range"
          id="assignmentCount"
          min="1"
          max="100"
          value={numberOfAssignments}
          onChange={(e) => setNumberOfAssignments(Number(e.target.value))}
          className="range accent-green-500 mt-1 block w-full"
        />
      </div>
      <div className="flex flex-wrap -mx-2">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="px-2 mb-4">
            <Assignment
              {...assignment}
              userAnswer={userAnswers[assignment.id] || ''}
              onAnswer={(answer) => updateUserAnswer(assignment.id, answer)}
              done={correctAnswers !== null}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={checkAnswers}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          ✓
        </button>
        <button
          onClick={resetAnswers}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          ✗
        </button>
      </div>
      {correctAnswers !== null && (
        <p className="mt-4 text-lg text-center">
          You got {correctAnswers} out of {assignments.length} correct!
        </p>
      )}
    </div>
  );
};

export default App;
