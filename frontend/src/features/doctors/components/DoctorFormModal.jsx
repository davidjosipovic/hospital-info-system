import React from "react";
import DoctorForm from "./DoctorForm";

const DoctorFormModal = ({ onClose, onSave, existingDoctor }) => (
  <DoctorForm onClose={onClose} onSave={onSave} existingDoctor={existingDoctor} />
);

export default DoctorFormModal;
