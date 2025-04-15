import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicalRecords, createMedicalRecord, deleteMedicalRecord } from "../medicalRecordsSlice";

const MedicalRecordsList = () => {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.medicalRecords);
  const [newRecord, setNewRecord] = useState({ diagnosis: "", treatment: "", patientId: "", doctorId: "" });

  useEffect(() => {
    dispatch(fetchMedicalRecords());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const safeRecords = Array.isArray(records) ? records : [];

  const handleCreate = () => {
    dispatch(createMedicalRecord(newRecord));
    setNewRecord({ diagnosis: "", treatment: "", patientId: "", doctorId: "" });
  };

  const handleDelete = (id) => {
    dispatch(deleteMedicalRecord(id));
  };

  return (
    <div>
      <h2>Create New Medical Record</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
        <input
          type="text"
          placeholder="Diagnosis"
          value={newRecord.diagnosis}
          onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
        />
        <input
          type="text"
          placeholder="Treatment"
          value={newRecord.treatment}
          onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
        />
        <input
          type="text"
          placeholder="Patient ID"
          value={newRecord.patientId}
          onChange={(e) => setNewRecord({ ...newRecord, patientId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Doctor ID"
          value={newRecord.doctorId}
          onChange={(e) => setNewRecord({ ...newRecord, doctorId: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>

      <h2>Medical Records</h2>
      <ul>
        {safeRecords.map((record) => (
          <li key={record.id}>
            <strong>Diagnosis:</strong> {record.diagnosis} <br />
            <strong>Treatment:</strong> {record.treatment} <br />
            <strong>Visit Date:</strong> {new Date(record.visitDate).toLocaleDateString()} <br />
            <button onClick={() => handleDelete(record.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicalRecordsList;