// RoomAssignmentForm.jsx
import React, { useState } from 'react';

const RoomAssignmentForm = ({ patients, rooms, initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState(
    initial || { patientId: '', roomId: '', startDate: '', endDate: '' }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block">Patient</label>
        <select name="patientId" value={form.patientId} onChange={handleChange} required className="w-full border rounded p-2">
          <option value="">Select patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block">Room</label>
        <select name="roomId" value={form.roomId} onChange={handleChange} required className="w-full border rounded p-2">
          <option value="">Select room</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>{r.roomNumber}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block">Start Date</label>
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required className="w-full border rounded p-2" />
      </div>
      <div>
        <label className="block">End Date</label>
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full border rounded p-2" />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default RoomAssignmentForm;
