import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicalRecords, createMedicalRecord, deleteMedicalRecord } from "../medicalRecordsSlice";
import { fetchPatients } from "../../patients/patientsSlice";
import { fetchDoctors } from "../../doctors/doctorsSlice";

const MedicalRecordsList = ({ patientId }) => {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.medicalRecords);
  const [newRecord, setNewRecord] = useState({ diagnosis: "", treatment: "", patientId: "", doctorId: "" });

  const { userId, role } = useSelector((state) => state.auth || {});
  const { doctors = [] } = useSelector((state) => state.doctors || { doctors: [] });
  const { patients = [] } = useSelector((state) => state.patients || { patients: [] });

  let doctorId = "";
  if (role === "doctor" && userId && Array.isArray(doctors)) {
    const doctor = doctors.find((d) => d.userId === userId);
    if (doctor) doctorId = doctor.id;
  }

  const [patientSearch, setPatientSearch] = useState("");
  const [doctorSearch, setDoctorSearch] = useState("");

  useEffect(() => {
    dispatch(fetchMedicalRecords());
    dispatch(fetchPatients());
    dispatch(fetchDoctors());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const safeRecords = Array.isArray(records) ? records : [];
  const filteredRecords = patientId ? safeRecords.filter(r => r.patientId === patientId) : safeRecords;

  const handleCreate = () => {
    if (!doctorId) {
      alert("Doctor ID not found. Please make sure you are logged in as a doctor.");
      return;
    }
    dispatch(createMedicalRecord({ ...newRecord, doctorId }));
    setNewRecord({ diagnosis: "", treatment: "", patientId: "", doctorId: "" });
  };

  const handleDelete = (id) => {
    dispatch(deleteMedicalRecord(id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 mt-2">Create New Medical Record</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
        className="bg-white rounded-lg shadow p-4 mb-8 flex flex-col gap-3 max-w-xl"
      >
        <input
          type="text"
          placeholder="Diagnosis"
          value={newRecord.diagnosis}
          onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Treatment"
          value={newRecord.treatment}
          onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <select
          value={newRecord.patientId}
          onChange={(e) => setNewRecord({ ...newRecord, patientId: e.target.value })}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select patient</option>
          {patients
            .filter((p) =>
              `${p.firstName} ${p.lastName}`
                .toLowerCase()
                .includes(patientSearch.toLowerCase())
            )
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.firstName} {p.lastName} ({p.id})
              </option>
            ))}
        </select>
        
        <select
          value={newRecord.doctorId || ""}
          onChange={(e) => setNewRecord({ ...newRecord, doctorId: e.target.value })}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select doctor</option>
          {doctors
            .filter((d) => {
              const user = d.user || {};
              return `${user.firstName || ""} ${user.lastName || ""}`
                .toLowerCase()
                .includes(doctorSearch.toLowerCase());
            })
            .map((d) => (
              <option key={d.id} value={d.id}>
                {d.user?.firstName || ""} {d.user?.lastName || ""} ({d.id})
              </option>
            ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Medical Records</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-lg shadow p-6 flex flex-col gap-2 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-blue-700">Diagnosis:</span>
              <span className="text-gray-800">{record.diagnosis}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-blue-700">Treatment:</span>
              <span className="text-gray-800">{record.treatment}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-blue-700">Visit Date:</span>
              <span className="text-gray-800">{new Date(record.visitDate).toLocaleDateString()}</span>
            </div>
            <button
              onClick={() => handleDelete(record.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition self-end"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecordsList;