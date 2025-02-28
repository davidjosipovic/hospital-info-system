import React from "react";
import Button from "../../../components/ui/Button";
import { PlusCircle } from "lucide-react";

const DoctorsHeader = ({ role, onAddDoctor }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold">Doctors</h2>
    {role === "admin" && (
      <Button className="bg-green-500 text-white flex items-center" onClick={onAddDoctor}>
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Doctor
      </Button>
    )}
  </div>
);
export default DoctorsHeader;