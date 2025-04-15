import React from "react";
import Input from "../../../components/ui/Input";

const PatientsSearch = ({ search, setSearch }) => (
  <Input
    type="text"
    placeholder="Search by name or medical history..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="mb-4 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
);

export default PatientsSearch;