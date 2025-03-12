import React from 'react';
import ManageRooms from '../../features/rooms/components/ManageRooms';

const RoomsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Manage Hospital Rooms</h1>
      <ManageRooms />
    </div>
  );
};

export default RoomsPage;
