import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoomAssignments,
  addRoomAssignment,
  editRoomAssignment,
  removeRoomAssignment,
} from "../../features/roomAssignments/RoomAssignmentsSlice";
import { getRooms } from "../../features/rooms/roomsApi";

function RoomAssignmentsPage() {
  const dispatch = useDispatch();
  const { assignments, loading, error } = useSelector((state) => state.roomAssignments);
  const { user } = useSelector((state) => state.auth);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    dispatch(getRoomAssignments());
    getRooms().then(setRooms).catch((err) => console.error("Error fetching rooms:", err));
  }, [dispatch]);

  const handleAdd = () => {
    // Logic for adding a room assignment
  };

  const handleEdit = (assignment) => {
    // Logic for editing a room assignment
  };

  const handleDelete = (id) => {
    dispatch(removeRoomAssignment(id));
  };

  return (
    <div className="ml-64 max-w-8xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-500">Room Assignments</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              {assignment.name} - Room: {assignment.roomId}
              <button onClick={() => handleEdit(assignment)}>Edit</button>
              <button onClick={() => handleDelete(assignment.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <button onClick={handleAdd}>Add Assignment</button>
      </div>
    </div>
  );
}

export default RoomAssignmentsPage;
