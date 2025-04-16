import React from 'react';
import ManageRooms from '../../features/rooms/components/ManageRooms';

const RoomsPage = () => {
  return (
    <div className="ml-64 max-w-8xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Manage Hospital Rooms</h1>
      <ManageRooms />
    </div>
  );
};

export default RoomsPage;
