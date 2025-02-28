import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecializations,
  addSpecialization,
  editSpecialization,
  removeSpecialization,
} from "../../features/specializations/specializationsSlice";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const SpecializationsPage = () => {
  const dispatch = useDispatch();
  const { list: specializations, loading, error } = useSelector((state) => state.specializations);

  const [newSpecialization, setNewSpecialization] = useState("");
  const [editingSpecialization, setEditingSpecialization] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Fetch specializations on page load
  useEffect(() => {
    dispatch(fetchSpecializations());
  }, [dispatch]);

  // Handle adding a new specialization
  const handleAddSpecialzation = (e) => {
    e.preventDefault();
    if (newSpecialization.trim()) {
      dispatch(addSpecialization({ name: newSpecialization }));
      setNewSpecialization(""); // Reset input
    }
  };

  // Handle starting an edit
  const handleEditClick = (specialization) => {
    setEditingSpecialization(specialization);
    setUpdatedName(specialization.name);
  };

  // Handle updating a specialization
  const handleUpdateSpecialization = (e) => {
    e.preventDefault();
    if (updatedName.trim()) {
      dispatch(editSpecialization({ id: editingSpecialization.id, data: { name: updatedName } }));
      setEditingSpecialization(null); // Exit edit mode
    }
  };

  // Handle deleting a specialization
  const handleDeleteSpecialization = (id) => {
    if (window.confirm("Are you sure you want to delete this specialization?")) {
      dispatch(removeSpecialization(id));
    }
  };

  return (
    <div className="p-6 mx-80">
      <h1 className="text-2xl font-bold mb-4">Specializations</h1>

      {/* Display error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Add new specialization form */}
      <form onSubmit={handleAddSpecialization} className="mb-4 flex gap-2">
        <Input
          type="text"
          placeholder="New Specialization Name"
          value={newSpecialization}
          onChange={(e) => setNewSpecialization(e.target.value)}
          required
        />
        <Button type="submit" className="bg-green-500">Add</Button>
      </form>

      {/* Loading indicator */}
      {loading && <p>Loading specializations...</p>}

      {/* Specialization List */}
      <ul className="space-y-4">
        {specializations.map((specialization) => (
          <li key={specialization.id} className="flex justify-between items-center p-3 border rounded">
            {editingSpecialization?.id === specialization.id ? (
              // Editing Mode
              <form onSubmit={handleUpdateSpecialization} className="flex gap-2">
                <Input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  required
                />
                <Button type="submit" className="bg-blue-500">Save</Button>
                <Button type="button" className="bg-gray-400" onClick={() => setEditingSpecialization(null)}>Cancel</Button>
              </form>
            ) : (
              // Normal Display Mode
              <>
                <span>{specialization.name}</span>
                <div className="flex gap-2">
                  <Button className="bg-blue-500" onClick={() => handleEditClick(specialization)}>Edit</Button>
                  <Button className="bg-red-500" onClick={() => handleDeleteSpecialization(specialization.id)}>Delete</Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecializationsPage;
