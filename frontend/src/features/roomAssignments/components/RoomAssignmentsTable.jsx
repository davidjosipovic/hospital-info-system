// RoomAssignmentsTable.jsx
import React from 'react';

const RoomAssignmentsTable = ({ assignments, onEdit, onDelete }) => (
  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b">Patient</th>
        <th className="py-2 px-4 border-b">Room</th>
        <th className="py-2 px-4 border-b">Assigned Date</th>
        <th className="py-2 px-4 border-b">Released Date</th>
        <th className="py-2 px-4 border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {assignments.map((a) => (
        <tr key={a.id}>
          <td className="py-2 px-4 border-b">{a.patient?.firstName} {a.patient?.lastName}</td>
          <td className="py-2 px-4 border-b">{a.room?.roomNumber}</td>
          <td className="py-2 px-4 border-b">{a.assignedDate?.slice(0, 10)}</td>
          <td className="py-2 px-4 border-b">{a.releasedDate?.slice(0, 10) || '-'}</td>
          <td className="py-2 px-4 border-b">
            <button className="text-blue-500 mr-2" onClick={() => onEdit(a)}>Edit</button>
            <button className="text-red-500" onClick={() => onDelete(a.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default RoomAssignmentsTable;
