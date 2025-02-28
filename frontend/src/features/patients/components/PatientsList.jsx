import React from "react";

const PatientsList = ({ patients, onDelete, onEdit }) => (
  <ul className="divide-y divide-gray-200">
    {patients.map((patient) => (
      <li key={patient.id} className="p-4 flex justify-between items-center">
        <div>
          <p className="font-bold">{patient.firstName} {patient.lastName}</p>
          <p className="text-gray-500 text-sm">DOB: {patient.dateOfBirth}</p>
          <p className="text-gray-500 text-sm">Gender: {patient.gender}</p>
          <p className="text-gray-500 text-sm">Phone: {patient.phoneNumber || "N/A"}</p>
          <p className="text-gray-500 text-sm">Address: {patient.address || "N/A"}</p>
          <p className="text-gray-500 text-sm">Emergency Contact: {patient.emergencyContact || "N/A"}</p>
        </div>
        <div>
          <button onClick={() => onEdit(patient)} className="text-blue-500">Edit</button>
          <button onClick={() => onDelete(patient.id)} className="text-red-500 ml-4">Delete</button>
        </div>
      </li>
    ))}
  </ul>
);

export default PatientsList;