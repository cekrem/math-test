import { useState } from 'react';
import { OPERATIONS } from '../utils/operations';

const useOperations = () => {
  const [selectedOperations, setSelectedOperations] = useState([OPERATIONS[0]]);

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

  return { OPERATIONS, selectedOperations, handleOperationToggle };
};

export default useOperations;
