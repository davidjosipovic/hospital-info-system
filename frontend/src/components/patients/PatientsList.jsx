import React from "react";
import Table from "../ui/Table";

const PatientsList = ({ patients }) => {
  return (
    <Table
      columns={[
        { label: "ID", accessor: "id" },
        { label: "Ime", accessor: "firstName" },
        { label: "Prezime", accessor: "lastName" },
        { label: "Datum rođenja", accessor: "dateOfBirth" },
        { label: "Telefon", accessor: "phoneNumber" },
      ]}
      data={patients}
    />
  );
};

export default PatientsList;
