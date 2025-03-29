import React, { useState } from "react";
import Button from "../../../components/ui/Button";

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <div className="flex justify-end mt-4">
            <Button type="button" onClick={onCancel} className="bg-gray-500 text-white px-3 py-1 rounded mr-2">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
