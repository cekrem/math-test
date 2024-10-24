import PropTypes from 'prop-types';

const OperationToggle = ({ operations, selectedOperations, onToggle }) => (
  <div className="mb-4">
    {operations.map((operation) => (
      <label key={operation.symbol} className="inline-flex items-center mr-4">
        <input
          type="checkbox"
          checked={selectedOperations.includes(operation)}
          onChange={() => onToggle(operation)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="ml-2">{operation.symbol}</span>
      </label>
    ))}
  </div>
);

OperationToggle.propTypes = {
  operations: PropTypes.array.isRequired,
  selectedOperations: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default OperationToggle;
