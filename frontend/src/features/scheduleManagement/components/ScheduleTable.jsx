import React from 'react';
import ScheduleActions from './ScheduleActions';

const ScheduleTable = ({ schedules, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="p-2 text-left">User ID</th>
          <th className="p-2 text-left">Work Date</th>
          <th className="p-2 text-left">Start Time</th>
          <th className="p-2 text-left">End Time</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule) => (
          <tr key={schedule.id}>
            <td className="p-2">{schedule.userId}</td>
            <td className="p-2">{new Date(schedule.workDate).toLocaleDateString()}</td>
            <td className="p-2">{schedule.startTime}</td>
            <td className="p-2">{schedule.endTime}</td>
            <td className="p-2">
              <ScheduleActions
                onEdit={() => onEdit(schedule)}
                onDelete={() => onDelete(schedule.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
