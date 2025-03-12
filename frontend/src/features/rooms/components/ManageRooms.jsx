import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, addRoom, editRoom, removeRoom } from '../roomsSlice';

const ManageRooms = () => {
  const dispatch = useDispatch();
  const { rooms, status, error } = useSelector((state) => state.rooms);
  const [newRoom, setNewRoom] = useState({ roomNumber: '', capacity: '' });
  const [editRoomData, setEditRoomData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleAddRoom = (e) => {
    e.preventDefault();
    dispatch(addRoom(newRoom));
    setNewRoom({ roomNumber: '', capacity: '' });
  };

  const handleUpdateRoom = (e) => {
    e.preventDefault();
    dispatch(editRoom({ id: editRoomData.id, roomData: editRoomData }))
      .then(() => {
        // Re-fetch rooms after successful update to get the latest data
        dispatch(fetchRooms());
      });
    setIsEditing(false);
    setEditRoomData(null);
  };

  const handleDeleteRoom = (id) => {
    dispatch(removeRoom(id));
  };

  const handleEditRoom = (room) => {
    setIsEditing(true);
    setEditRoomData({ ...room });
  };

  // Sort rooms after each update to avoid mutating the original array
  const sortedRooms = rooms.slice().sort((a, b) => a.roomNumber - b.roomNumber);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="mx-80">
      <form onSubmit={isEditing ? handleUpdateRoom : handleAddRoom} className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Room Number</label>
            <input
              type="text"
              value={isEditing ? editRoomData.roomNumber : newRoom.roomNumber}
              onChange={(e) => isEditing ? setEditRoomData({ ...editRoomData, roomNumber: e.target.value }) : setNewRoom({ ...newRoom, roomNumber: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Capacity</label>
            <input
              type="number"
              value={isEditing ? editRoomData.capacity : newRoom.capacity}
              onChange={(e) => isEditing ? setEditRoomData({ ...editRoomData, capacity: e.target.value }) : setNewRoom({ ...newRoom, capacity: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? 'Update Room' : 'Add Room'}
          </button>
        </div>
      </form>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 text-left">Room Number</th>
            <th className="p-2 text-left">Capacity</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedRooms.map((room) => (
            <tr key={room.id}>
              <td className="p-2">{room.roomNumber}</td>
              <td className="p-2">{room.capacity}</td>
              <td className="p-2">
                <button
                  onClick={() => handleEditRoom(room)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRooms;
