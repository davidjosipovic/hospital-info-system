import React from "react";
import MedicalRecordsList from "../../features/medicalRecords/components/MedicalRecordsList";

const MedicalRecordsPage = () => {
  return (
    <div className="md:ml-64 max-w-8xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Medical Records</h1>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <MedicalRecordsList />
      </div>
    </div>
  );
};

export default MedicalRecordsPage;