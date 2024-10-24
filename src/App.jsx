import { useState, useEffect } from 'react';
import Assignment from './components/Assignment';
import OperationToggle from './components/OperationToggle';
import AssignmentCounter from './components/AssignmentCounter';
import useOperations from './hooks/useOperations';
import { generateAssignment } from './utils/generateAssignment';

const App = () => {
  const { OPERATIONS, selectedOperations, handleOperationToggle } = useOperations();
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

  const checkAnswers = () => {
    const correct = assignments.filter(
      (assignment) => Number(userAnswers[assignment.id]) === assignment.correctAnswer,
    ).length;
    setCorrectAnswers(correct);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center w-full p-4">
      <h1 className="text-3xl font-bold mb-4">Math Test</h1>
      <OperationToggle
        operations={OPERATIONS}
        selectedOperations={selectedOperations}
        onToggle={handleOperationToggle}
      />
      <AssignmentCounter count={numberOfAssignments} onChange={setNumberOfAssignments} />
      <div className="flex flex-wrap justify-center -mx-2">
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
          onClick={generateNewAssignments}
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
