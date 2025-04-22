import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoomAssignments,
  addRoomAssignment,
  editRoomAssignment,
  removeRoomAssignment,
} from "../../features/roomAssignments/RoomAssignmentsSlice";
import { getRooms } from "../../features/rooms/roomsApi";
import { fetchPatients } from "../../features/patients/patientsSlice";
import RoomAssignmentsTable from "../../features/roomAssignments/components/RoomAssignmentsTable";
import RoomAssignmentForm from "../../features/roomAssignments/components/RoomAssignmentForm";

function RoomAssignmentsPage() {
  const dispatch = useDispatch();
  const { assignments, loading, error } = useSelector((state) => state.roomAssignments);
  const [rooms, setRooms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editAssignment, setEditAssignment] = useState(null);

  useEffect(() => {
    dispatch(getRoomAssignments());
    getRooms().then(setRooms).catch((err) => console.error("Error fetching rooms:", err));
    dispatch(fetchPatients())
      .unwrap()
      .then(setPatients)
      .catch((err) => console.error("Error fetching patients:", err));
  }, [dispatch]);

  const handleAdd = () => {
    setEditAssignment(null);
    setShowForm(true);
  };

  const handleEdit = (assignment) => {
    setEditAssignment(assignment);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    dispatch(removeRoomAssignment(id));
  };

  const handleFormSubmit = (form) => {
    console.log(form)
    const action = editAssignment
      ? editRoomAssignment({ id: editAssignment.id, assignment: { ...editAssignment, ...form } })
      : addRoomAssignment(form);

    dispatch(action)
      .unwrap()
      .then(() => dispatch(getRoomAssignments())) // Refresh assignments after add/edit
      .catch((err) => console.error("Error saving assignment:", err));

    setShowForm(false);
    setEditAssignment(null);
  };
  console.log(assignments)
  return (
    <div className="ml-64 max-w-8xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-500">Room Assignments</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!showForm ? (
          <>
            <RoomAssignmentsTable
              assignments={assignments}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleAdd}
            >
              Add Assignment
            </button>
          </>
        ) : (
          <RoomAssignmentForm
            patients={patients}
            rooms={rooms}
            initial={editAssignment}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default RoomAssignmentsPage;
