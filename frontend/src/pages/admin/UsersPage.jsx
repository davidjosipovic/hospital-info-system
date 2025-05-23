import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "../../features/users/usersSlice";
import UserForm from "../../features/users/components/UserForm";
import UserSearch from "../../features/users/components/UserSearch";
import Table from "../../components/ui/Table";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");
  const { role } = useSelector((state) => state.auth || {});

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = (updatedUser) => {
    dispatch(updateUser(updatedUser));
    setEditingUser(null);
    window.location.reload();
  };

  const filteredUsers = useMemo(() => {
    const searchLower = search.toLowerCase();
    return users
      .map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email:user.email,
        role: user.role, 
      }))
      .filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.trim().toLowerCase();
        return fullName.includes(searchLower);
      });
  }, [users, search]);

  return (
    <div className="ml-64 max-w-8xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <UserSearch search={search} setSearch={setSearch} />

      {!loading && !error && filteredUsers.length === 0 && (
        <p>No users found matching the search criteria.</p>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <Table
          data={filteredUsers}
          onDelete={role === "admin" ? handleDelete : null}
          onEdit={role === "admin" ? handleEdit : null}
        />
      )}

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
