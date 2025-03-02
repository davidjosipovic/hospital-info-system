import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/usersSlice";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="p-6 mx-80">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul className="bg-white shadow rounded-lg p-4">
        {users.map((user) => (
          <li key={user.id} className="border-b p-2 last:border-none">
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
