import React from "react";
import Button from "../../../components/ui/Button";
import { PlusCircle } from "lucide-react";

const PatientsHeader = ({ onAddPatient }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold">Patients</h2>
    <Button className="bg-green-500 text-white flex items-center" onClick={onAddPatient}>
      <PlusCircle className="w-5 h-5 mr-2" />
      Add Patient
    </Button>
  </div>
);
export default PatientsHeader