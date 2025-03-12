import React from 'react';

const ScheduleActions = ({ onEdit, onDelete }) => {
  return (
    <div>
      <button
        onClick={onEdit}
        className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 mr-2"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default ScheduleActions;
