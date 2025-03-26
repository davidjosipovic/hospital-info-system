import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "../../features/users/usersSlice";
import UserForm from "../../features/users/components/UserForm";
import UserSearch from "../../features/users/components/UserSearch";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this user?"))
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = (updatedUser) => {
    dispatch(updateUser(updatedUser));
    setEditingUser(null);
  };

  const filteredUsers=useMemo(()=>{
    const searchLower = search.toLowerCase();
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.trim().toLowerCase();
      return fullName.includes(searchLower) || user.email.toLowerCase().includes(searchLower);
    });

  },[users, search])

  

  return (
    <div className="p-6 mx-80">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <UserSearch search={search} setSearch={setSearch} />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="border p-2">{user.firstName}</td>
              <td className="border p-2">{user.lastName}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2 flex gap-2">
                <button 
                  className="bg-blue-500 text-white px-2 py-1 rounded" 
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded" 
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <UserForm 
          user={editingUser} 
          onSave={handleUpdate} 
          onCancel={() => setEditingUser(null)}
        />
      )}
    </div>
  );
};

export default UsersPage;