import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";

const PatientsList = ({ patients, onDelete, onEdit }) => (
  <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow-md">
    {patients.map((patient) => (
      <li key={patient.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
        <div>
          <p className="font-bold text-lg text-gray-800">{patient.firstName} {patient.lastName}</p>
          <p className="text-gray-500 text-sm">DOB: {patient.dateOfBirth}</p>
          <p className="text-gray-500 text-sm">Gender: {patient.gender}</p>
          <p className="text-gray-500 text-sm">Phone: {patient.phoneNumber || "N/A"}</p>
          <p className="text-gray-500 text-sm">Address: {patient.address || "N/A"}</p>
          <p className="text-gray-500 text-sm">Emergency Contact: {patient.emergencyContact || "N/A"}</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => onEdit(patient)} variant="primary" size="sm">Edit</Button>
          <Button onClick={() => onDelete(patient.id)} variant="danger" size="sm">Delete</Button>
          <Link
            to={`/staff/patients/${patient.id}/medical-records`}
            className="text-green-600 hover:underline"
          >
            <Button variant="secondary" size="sm">Medical Records</Button>
          </Link>
        </div>
      </li>
    ))}
  </ul>
);

export default PatientsList;