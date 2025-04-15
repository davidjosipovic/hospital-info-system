import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../features/patients/patientsSlice";
import { fetchDoctors } from "../../features/doctors/doctorsSlice";
import {jwtDecode} from "jwt-decode";
import { getMedicalRecordsByPatient, createMedicalRecordApi, deleteMedicalRecordApi, updateMedicalRecordApi } from "../../features/medicalRecords/medicalRecordsApi";

const PatientMedicalRecordsPage = () => {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const { doctors = [] } = useSelector((state) => state.doctors || { doctors: [] });
  const { patients = [], loading: patientsLoading } = useSelector((state) => state.patients || { patients: [] });
  const { userId, role } = useSelector((state) => state.auth || {});
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRecord, setNewRecord] = useState({ diagnosis: "", treatment: "" });
  const [patient, setPatient] = useState(null);

  const token = localStorage.getItem("token");
  let doctorEmail = "";
  if (token) {
    try {
      const decoded = jwtDecode(token); // Only this, no .default
      doctorEmail = decoded.email;
    } catch (e) {
      doctorEmail = "";
    }
  }

  // Find the doctorId for the logged-in doctor by email
  let doctorId = "";
  if (role === "doctor" && doctorEmail && Array.isArray(doctors)) {
    const doctor = doctors.find((d) => d.user && d.user.email === doctorEmail);
    if (doctor) doctorId = doctor.id;
  }

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use the API that fetches by patientId
      const allRecords = await getMedicalRecordsByPatient(patientId);
      setRecords(allRecords);
      console.log(allRecords);
    } catch (err) {
      setError("Failed to fetch medical records.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line
  }, [patientId, doctorId]);

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (patients && patients.length > 0) {
      const found = patients.find((p) => p.id === patientId);
      setPatient(found || null);
    }
  }, [patients, patientId]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!doctorId) {
      alert("Doctor ID not found. Please make sure you are logged in as a doctor.");
      return;
    }
    try {
      await createMedicalRecordApi({
        ...newRecord,
        patientId,
        doctorId,
      });
      setNewRecord({ diagnosis: "", treatment: "" });
      fetchRecords();
    } catch (err) {
      alert("Failed to create medical record.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedicalRecordApi(id);
      fetchRecords();
    } catch (err) {
      alert("Failed to delete medical record.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!doctors.length) return <p>Loading doctors...</p>;
  if (!doctorId) return <p>Doctor ID not found. Please make sure you are logged in as a doctor.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Medical Records</h1>
      {patientsLoading && <p>Loading patient info...</p>}
      {patient && (
        <div className="mb-6 p-4 bg-white rounded shadow w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-2">Patient Info</h2>
          <div><b>Name:</b> {patient.firstName} {patient.lastName}</div>
          <div><b>Date of Birth:</b> {new Date(patient.dateOfBirth).toLocaleDateString()}</div>
          <div><b>Gender:</b> {patient.gender}</div>
          <div><b>Phone:</b> {patient.phoneNumber || "N/A"}</div>
          <div><b>Address:</b> {patient.address || "N/A"}</div>
          <div><b>Emergency Contact:</b> {patient.emergencyContact || "N/A"}</div>
        </div>
      )}
      <form onSubmit={handleCreate} className="bg-white rounded-lg shadow p-4 mb-8 flex flex-col gap-3 max-w-xl">
        <input
          type="text"
          placeholder="Diagnosis"
          value={newRecord.diagnosis}
          onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Treatment"
          value={newRecord.treatment}
          onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Record</button>
      </form>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Records</h2>
        {records.length === 0 ? (
          <p>No records found for this patient.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {records.map((record) => (
              <div key={record.id} className="bg-gray-50 rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-100">
                <div><b>Diagnosis:</b> {record.diagnosis}</div>
                <div><b>Treatment:</b> {record.treatment}</div>
                <div><b>Visit Date:</b> {new Date(record.visitDate).toLocaleDateString()}</div>
                <button onClick={() => handleDelete(record.id)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded self-end">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientMedicalRecordsPage;
