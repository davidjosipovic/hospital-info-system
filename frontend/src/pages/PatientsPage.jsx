import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../store/slices/patientsSlice";
import PatientsList from "../components/patients/PatientsList";

const PatientsPage = () => {
  const dispatch = useDispatch();
  const { patients, loading, error } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchPatients()); // ✅ Dohvati pacijente kad se stranica učita
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Pacijenti</h2>

      {loading && <p>Učitavanje pacijenata...</p>}
      {error && <p className="text-red-500">Greška: {error}</p>}

      <PatientsList patients={patients} />
    </div>
  );
};

export default PatientsPage;
