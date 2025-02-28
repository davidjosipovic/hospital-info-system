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
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {existingDoctor ? "Edit Doctor" : "Add New Doctor"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!existingDoctor && (
            <div>
              <label className="block font-medium mb-2">Select User</label>
              {usersLoading ? (
                <p>Loading users...</p>
              ) : (
                <select
                  name="userId"
                  value={formData.userId || ""}
                  onChange={handleUserChange}
                  className="w-full p-2 border rounded"
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
            <label className="block font-medium mb-2">
              Select Specialization
            </label>
            {specializationsLoading ? (
              <p>Loading specializations...</p>
            ) : (
              <select
                name="specializationId"
                value={formData.specializationId || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
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
            <label className="block font-medium mb-2">Select Department</label>
            {departmentsLoading ? (
              <p>Loading departments...</p>
            ) : (
              <select
                name="departmentId"
                value={formData.departmentId || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
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

          <Input
            name="yearsOfExperience"
            type="number"
            placeholder="Years of Experience"
            value={formData.yearsOfExperience || ""}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-4 mt-4">
            <Button type="button" className="bg-gray-400" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500">
              {existingDoctor ? "Save Changes" : "Add Doctor"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorForm;
