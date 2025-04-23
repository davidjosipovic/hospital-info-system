import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../../features/appointments/appointmentsSlice";
import Table from "../../components/ui/Table";
const AppointmentsPage = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchAppointments()); 
  }, [dispatch]);

  return (
    <div className="ml-64 max-w-8xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Termini</h2>
      {loading && <p>Učitavanje termina...</p>}
      {error && <p className="text-red-500">Greška: {error}</p>}

      <Table
      columns={[
        { label: "ID", accessor: "id" },
        { label: "Pacijent", accessor: "patientName" },
        { label: "Liječnik", accessor: "doctorName" },
        { label: "Datum", accessor: "appointmentDate" },
        { label: "Status", accessor: "status" },
      ]}
      data={appointments}
    />
    </div>
  );
};

export default AppointmentsPage;
