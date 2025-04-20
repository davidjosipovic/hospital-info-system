import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const SpecializationForm = ({ onAdd }) => {
  const [newSpecialization, setNewSpecialization] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newSpecialization.trim()) {
      onAdd(newSpecialization);
      setNewSpecialization("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <Input
        type="text"
        placeholder="New Specialization Name"
        value={newSpecialization}
        onChange={(e) => setNewSpecialization(e.target.value)}
        required
      />
      <Button type="submit" className="bg-green-500">Add</Button>
    </form>
  );
};

export default SpecializationForm;