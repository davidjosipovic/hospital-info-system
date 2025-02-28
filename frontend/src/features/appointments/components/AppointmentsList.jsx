import React from "react";
import Table from "../../../components/ui/Table";

const AppointmentsList = ({ appointments }) => {
  return (
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
  );
};

export default AppointmentsList;
