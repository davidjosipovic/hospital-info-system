import React from "react";

const SaveScheduleButton = ({ onSave }) => {
  return (
    <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
      Save Schedule
    </button>
  );
};

export default SaveScheduleButton;
