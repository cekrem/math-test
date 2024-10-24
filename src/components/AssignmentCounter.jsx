import PropTypes from 'prop-types';

const AssignmentCounter = ({ count, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="assignmentCount" className="block text-sm font-medium text-gray-700">
        Number of Assignments: {count}
      </label>
      <input
        type="range"
        id="assignmentCount"
        min="1"
        max="100"
        value={count}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range accent-green-500 mt-1 block w-full"
      />
    </div>
  );
};

AssignmentCounter.propTypes = {
  count: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AssignmentCounter;
