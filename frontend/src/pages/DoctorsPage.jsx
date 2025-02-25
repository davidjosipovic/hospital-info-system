import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../store/slices/doctorsSlice";
import DoctorsList from "../components/doctors/DoctorsList";

const DoctorsPage = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctors()); // ✅ Dohvati liječnike kad se stranica učita
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Liječnici</h2>

      {loading && <p>Učitavanje liječnika...</p>}
      {error && <p className="text-red-500">Greška: {error}</p>}

      <DoctorsList doctors={doctors} />
    </div>
  );
};

export default DoctorsPage;
