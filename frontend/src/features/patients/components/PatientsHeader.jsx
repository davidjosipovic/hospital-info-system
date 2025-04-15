import React from "react";
import Button from "../../../components/ui/Button";
import { PlusCircle } from "lucide-react";

const PatientsHeader = ({ onAddPatient }) => (
  <div className="flex justify-between items-center mb-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white p-4 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold">Patients</h2>
    <Button
      className="flex items-center"
      onClick={onAddPatient}
      variant="primary"
      size="md"
    >
      <PlusCircle className="w-5 h-5 mr-2" />
      Add Patient
    </Button>
  </div>
);

export default PatientsHeader;