import { useEffect, useMemo, useState } from 'react';
import Assignment from './Assignment';

const generateAssignment = () => {
  const id = Math.random().toString(36).substring(2, 15);
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return {
    id,
    a,
    b,
    operator: 'x',
    correctAnswer: a * b,
    userAnswer: '',
  };
};

const App = () => {
  const [assignments, setAssignments] = useState([]);
  const [numberOfAssignments, setNumberOfAssignments] = useState(100);
  const [reset, setReset] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(null);

  useEffect(() => {
    setAssignments(Array.from({ length: numberOfAssignments }, generateAssignment));
  }, [numberOfAssignments, reset]);

  const updateUserAnswer = (id, userAnswer) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === id ? { ...assignment, userAnswer } : assignment,
      ),
    );
  };

  const dirty = useMemo(
    () => assignments.some((assignment) => assignment.userAnswer !== ''),
    [assignments],
  );

  const startTime = useMemo(() => new Date(), [dirty]);

  const calculateCorrectAnswers = () => {
    const correct = assignments.filter(
      (assignment) => Number(assignment.userAnswer) === assignment.correctAnswer,
    ).length;
    setCorrectAnswers(correct);
    const endTime = new Date();
    const timeTaken = endTime - startTime;
    console.log(`Time taken: ${timeTaken}ms`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-start justify-center flex-wrap py-4">
        <div className="w-full flex items-center justify-center m-2">
          <div className="flex items-center justify-center h-32">
            {dirty ? (
              <>
                <button
                  onClick={calculateCorrectAnswers}
                  className="bg-green-500 text-white text-2xl mx-2 px-4 py-2 rounded"
                >
                  √
                </button>
                <button
                  onClick={() => {
                    setReset((prev) => !prev);
                    setCorrectAnswers(null);
                  }}
                  className="bg-red-500 text-white text-2xl mx-2 px-4 py-2 rounded"
                >
                  X
                </button>
                {correctAnswers !== null && (
                  <span className="text-lg font-semibold ml-4 underline">
                    {correctAnswers} / {assignments.length}
                  </span>
                )}
              </>
            ) : (
              <>
                <input
                  disabled={dirty}
                  type="range"
                  min="1"
                  max="200"
                  value={numberOfAssignments}
                  onChange={(e) => setNumberOfAssignments(Number(e.target.value))}
                  className="range accent-green-50 w-64 m-4"
                />
                <div className="text-lg font-semibold w-12">{numberOfAssignments}</div>
              </>
            )}
          </div>
        </div>
        {assignments.map((assignment) => (
          <Assignment
            key={assignment.id}
            {...assignment}
            done={correctAnswers !== null}
            onAnswer={(userAnswer) => updateUserAnswer(assignment.id, userAnswer)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
