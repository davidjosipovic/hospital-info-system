import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/users/usersSlice"; 

const UserSelect = ({ onSelectUser }) => {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector((state) => state.users || { users: [] });
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  const handleSelectUser = (e) => {
    const userId = e.target.value;
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user); 
    onSelectUser(user); 
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">Select a User</h1>

      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <select
          className="border rounded p-2 w-full"
          onChange={handleSelectUser}
          value={selectedUser ? selectedUser.id : ""}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {`${user.firstName} ${user.lastName}`}
            </option>
          ))}
        </select>
      )}

  
      {selectedUser && (
        <div className="mt-4">
          <p className="font-semibold">Selected User:</p>
          <p>{`${selectedUser.firstName} ${selectedUser.lastName}`}</p>
        </div>
      )}
    </div>
  );
};

export default UserSelect;
