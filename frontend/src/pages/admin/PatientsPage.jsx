import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, removePatient, editPatient, createPatient } from "../../features/patients/patientsSlice";
import PatientsList from "../../features/patients/components/PatientsList";
import PatientForm from "../../features/patients/components/PatientForm";
import PatientsHeader from "../../features/patients/components/PatientsHeader";
import PatientsSearch from "../../features/patients/components/PatientsSearch";

const PatientsPage = () => {
  const dispatch = useDispatch();
  const { patients = [], loading, error } = useSelector((state) => state.patients || { patients: [] });

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      await dispatch(removePatient(id));
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setIsModalOpen(true);
  };

  const handleSavePatient = async (patientData) => {
    if (selectedPatient) {
      await dispatch(editPatient({ id: selectedPatient.id, patientData }));
    } else {
      await dispatch(createPatient(patientData));
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-80 p-6 bg-white rounded-lg shadow-lg">
      <PatientsHeader onAddPatient={handleAddPatient} />
      <PatientsSearch search={search} setSearch={setSearch} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <PatientsList
          patients={filteredPatients}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      {isModalOpen && (
        <PatientForm
          onClose={handleCloseModal}
          onSave={handleSavePatient}
          existingPatient={selectedPatient}
        />
      )}
    </div>
  );
};

export default PatientsPage;