import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../features/patients/patientsSlice";
import { fetchDoctors } from "../../features/doctors/doctorsSlice";
import { jwtDecode } from "jwt-decode";
import { getMedicalRecordsByPatient, createMedicalRecordApi, deleteMedicalRecordApi } from "../../features/medicalRecords/medicalRecordsApi";

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
      const decoded = jwtDecode(token);
      doctorEmail = decoded.email;
    } catch (e) {
      doctorEmail = "";
    }
  }

  let doctorId = "";
  if (role === "doctor" && doctorEmail && Array.isArray(doctors)) {
    const doctor = doctors.find((d) => d.user && d.user.email === doctorEmail);
    if (doctor) doctorId = doctor.id;
  }

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const allRecords = await getMedicalRecordsByPatient(patientId);
      setRecords(allRecords);
    } catch (err) {
      setError("Failed to fetch medical records.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
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

  if (loading) return <p className="text-center text-blue-500 font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;
  if (!doctors.length) return <p className="text-center text-gray-500">Loading doctors...</p>;
  if (!doctorId) return <p className="text-center text-red-500">Doctor ID not found. Please make sure you are logged in as a doctor.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Patient Medical Records</h1>
      {patientsLoading && <p className="text-center text-blue-500 font-semibold">Loading patient info...</p>}
      {patient && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Patient Info</h2>
          <div className="text-gray-600"><b>Name:</b> {patient.firstName} {patient.lastName}</div>
          <div className="text-gray-600"><b>Date of Birth:</b> {new Date(patient.dateOfBirth).toLocaleDateString()}</div>
          <div className="text-gray-600"><b>Gender:</b> {patient.gender}</div>
          <div className="text-gray-600"><b>Phone:</b> {patient.phoneNumber || "N/A"}</div>
          <div className="text-gray-600"><b>Address:</b> {patient.address || "N/A"}</div>
          <div className="text-gray-600"><b>Emergency Contact:</b> {patient.emergencyContact || "N/A"}</div>
        </div>
      )}
      <form onSubmit={handleCreate} className="bg-white rounded-lg shadow-lg p-6 mb-10 flex flex-col gap-4 max-w-lg">
        <input
          type="text"
          placeholder="Diagnosis"
          value={newRecord.diagnosis}
          onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Treatment"
          value={newRecord.treatment}
          onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">Add Record</button>
      </form>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Records</h2>
        {records.length === 0 ? (
          <p className="text-center text-gray-500">No records found for this patient.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {records.map((record) => (
              <div key={record.id} className="bg-gray-50 rounded-lg shadow p-6 flex flex-col gap-4 border border-gray-200">
                <div className="text-gray-600"><b>Diagnosis:</b> {record.diagnosis}</div>
                <div className="text-gray-600"><b>Treatment:</b> {record.treatment}</div>
                <div className="text-gray-600"><b>Visit Date:</b> {new Date(record.visitDate).toLocaleDateString()}</div>
                <button onClick={() => handleDelete(record.id)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition self-end">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientMedicalRecordsPage;
