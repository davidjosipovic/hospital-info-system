import React from "react";
import Table from "../ui/Table";

const DoctorsList = ({ doctors }) => {
  return (
    <Table
      columns={[
        { label: "ID", accessor: "id" },
        { label: "Ime", accessor: "firstName" },
        { label: "Prezime", accessor: "lastName" },
        { label: "Specijalizacija", accessor: "specialization" },
        { label: "Broj Licence", accessor: "licenseNumber" },
      ]}
      data={doctors}
    />
  );
};

export default DoctorsList;
