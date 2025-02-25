import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../../store/slices/appointmentsSlice";
import AppointmentsList from "../../components/appointments/AppointmentsList";

const AppointmentsPage = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchAppointments()); // ✅ Dohvati termine kad se stranica učita
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Termini</h2>

      {loading && <p>Učitavanje termina...</p>}
      {error && <p className="text-red-500">Greška: {error}</p>}

      <AppointmentsList appointments={appointments} />
    </div>
  );
};

export default AppointmentsPage;
