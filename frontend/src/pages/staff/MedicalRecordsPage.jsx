import React from "react";
import MedicalRecordsList from "../../features/medicalRecords/components/MedicalRecordsList";

const MedicalRecordsPage = () => {
  return (
    <div className="min-h-screen flex mx-80 flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Medical Records</h1>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <MedicalRecordsList />
      </div>
    </div>
  );
};

export default MedicalRecordsPage;