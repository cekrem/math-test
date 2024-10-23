import PropTypes from 'prop-types';

const Assignment = ({ a, b, operator, userAnswer, correctAnswer, onAnswer, done }) => {
  const backgroundColor = done
    ? userAnswer === correctAnswer.toString()
      ? 'bg-green-500'
      : 'bg-red-500'
    : 'bg-white';

  const shadow = !userAnswer ? 'shadow-xl' : '';

  return (
    <div
      className={`transition-all rounded-lg p-4 m-4 w-56 flex flex-row items-center justify-between ${backgroundColor} ${shadow}`}
    >
      {[a, operator, b, '='].map((item, index) => (
        <div key={index} className="text-lg font-semibold m-2">
          {item}
        </div>
      ))}
      <input
        value={userAnswer}
        onChange={(e) => onAnswer(e.target.value)}
        type="number"
        className="border rounded px-2 py-1 w-16 text-lg"
      />
    </div>
  );
};

Assignment.propTypes = {
  a: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  userAnswer: PropTypes.string.isRequired,
  correctAnswer: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
};

export default Assignment;
