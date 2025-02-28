
import React from "react";
import Input from "../../../components/ui/Input";

const DoctorsSearch = ({ search, setSearch }) => (
  <Input
    type="text"
    placeholder="Search by name or specialization..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="mb-4 w-full"
  />
);
export default DoctorsSearch;