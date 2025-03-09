import React, { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const PatientForm = ({ onClose, onSave, existingPatient, refreshPatients=()=>{} }) => {
  const [formData, setFormData] = useState(
    existingPatient || {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      phoneNumber: "",
      address: "",
      emergencyContact: "",
    }
  );

  useEffect(() => {
    if (existingPatient) {
      setFormData({
        firstName: existingPatient.firstName || "",
        lastName: existingPatient.lastName || "",
        dateOfBirth: existingPatient.dateOfBirth 
          ? new Date(existingPatient.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: existingPatient.gender || "",
        phoneNumber: existingPatient.phoneNumber || "",
        address: existingPatient.address || "",
        emergencyContact: existingPatient.emergencyContact || "",
      });
    }
  }, [existingPatient]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
    refreshPatients(); 
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{existingPatient ? "Edit Patient" : "Add New Patient"}</h2>
        <form onSubmit={handleSubmit}>
          <Input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          <Input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          <Input name="dateOfBirth" type="date" placeholder="Date of Birth" value={formData.dateOfBirth || ""} onChange={handleChange} />
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <Input name="phoneNumber" type="text" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
          <Input name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} />
          <Input name="emergencyContact" type="text" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleChange} />
          <div className="flex justify-end gap-4 mt-4">
            <Button type="button" className="bg-gray-400" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-green-500">{existingPatient ? "Save Changes" : "Add Patient"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
