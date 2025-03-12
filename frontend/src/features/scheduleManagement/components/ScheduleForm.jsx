import React from 'react';

const ScheduleForm = ({
  isEditing,
  scheduleData,
  onSubmit,
  onChange,
}) => {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">User ID</label>
          <input
            type="text"
            value={scheduleData.userId}
            onChange={(e) => onChange({ ...scheduleData, userId: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Work Date</label>
          <input
            type="date"
            value={scheduleData.workDate}
            onChange={(e) => onChange({ ...scheduleData, workDate: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Start Time</label>
          <input
            type="time"
            value={scheduleData.startTime}
            onChange={(e) => onChange({ ...scheduleData, startTime: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">End Time</label>
          <input
            type="time"
            value={scheduleData.endTime}
            onChange={(e) => onChange({ ...scheduleData, endTime: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? 'Update Schedule' : 'Add Schedule'}
        </button>
      </div>
    </form>
  );
};

export default ScheduleForm;
