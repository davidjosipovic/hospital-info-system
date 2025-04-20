import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useNavigate } from "react-router-dom";

const DoctorForm = ({ onClose, onSave, existingDoctor }) => {
  const { users = [], loading: usersLoading } = useSelector(
    (state) => state.users || { users: [] }
  );
  const { list: departments = [], loading: departmentsLoading } = useSelector(
    (state) => state.departments || { list: [] }
  );
  const { list: specializations = [], loading: specializationsLoading } =
    useSelector((state) => state.specializations || { list: [] });
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    existingDoctor || {
      userId: "",
      departmentId: "",
      specializationId: "",
      yearsOfExperience: "",
    }
  );

  const availableDoctorUsers = Array.isArray(users)
    ? users.filter((user) => user.role === "doctor")
    : [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || "" });
  };

  const handleUserChange = (e) => {
    const selectedUser = availableDoctorUsers.find(
      (user) => user.id === e.target.value
    );
    setFormData({
      ...formData,
      userId: selectedUser?.id || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.userId ||
      !formData.specializationId ||
      !formData.departmentId ||
      !formData.yearsOfExperience
    ) {
      alert("All fields are required!");
      return;
    }

    const payload = {
      id: formData.id,
      userId: formData.userId,
      departmentId: formData.departmentId,
      specializationId: formData.specializationId,
      licenseNumber: existingDoctor
        ? existingDoctor.licenseNumber
        : `LIC-${Math.floor(100000 + Math.random() * 900000)}`,
      yearsOfExperience: parseInt(formData.yearsOfExperience, 10) || 0,
    };

    onSave(payload);
    onClose();
    navigate('/admin/doctors');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          {existingDoctor ? "Edit Doctor" : "Add New Doctor"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!existingDoctor && (
            <div>
              <label className="block font-medium mb-1 text-gray-700">Select User</label>
              {usersLoading ? (
                <p className="text-gray-500">Loading users...</p>
              ) : (
                <select
                  name="userId"
                  value={formData.userId || ""}
                  onChange={handleUserChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Select a user --</option>
                  {availableDoctorUsers.length > 0 ? (
                    availableDoctorUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </option>
                    ))
                  ) : (
                    <option disabled>No available users</option>
                  )}
                </select>
              )}
            </div>
          )}

          <div>
            <label className="block font-medium mb-1 text-gray-700">Select Specialization</label>
            {specializationsLoading ? (
              <p className="text-gray-500">Loading specializations...</p>
            ) : (
              <select
                name="specializationId"
                value={formData.specializationId || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select a specialization --</option>
                {specializations.length > 0 ? (
                  specializations.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No specializations available</option>
                )}
              </select>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Select Department</label>
            {departmentsLoading ? (
              <p className="text-gray-500">Loading departments...</p>
            ) : (
              <select
                name="departmentId"
                value={formData.departmentId || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select a department --</option>
                {departments.length > 0 ? (
                  departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No departments available</option>
                )}
              </select>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Years of Experience</label>
            <Input
              name="yearsOfExperience"
              type="number"
              placeholder="Years of Experience"
              value={formData.yearsOfExperience || ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" className="bg-gray-400 px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition text-white" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 px-4 py-2 rounded-lg shadow hover:bg-green-600 transition text-white">
              {existingDoctor ? "Save Changes" : "Add Doctor"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorForm;
