import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecialisations,
  addSpecialisation,
  editSpecialisation,
  removeSpecialisation,
} from "../../store/slices/specialisationsSlice";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const SpecialisationsPage = () => {
  const dispatch = useDispatch();
  const { list: specialisations, loading, error } = useSelector((state) => state.specialisations);

  const [newSpecialisation, setNewSpecialisation] = useState("");
  const [editingSpecialisation, setEditingSpecialisation] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Fetch specializations on page load
  useEffect(() => {
    dispatch(fetchSpecialisations());
  }, [dispatch]);

  // Handle adding a new specialization
  const handleAddSpecialisation = (e) => {
    e.preventDefault();
    if (newSpecialisation.trim()) {
      dispatch(addSpecialisation({ name: newSpecialisation }));
      setNewSpecialisation(""); // Reset input
    }
  };

  // Handle starting an edit
  const handleEditClick = (specialisation) => {
    setEditingSpecialisation(specialisation);
    setUpdatedName(specialisation.name);
  };

  // Handle updating a specialization
  const handleUpdateSpecialisation = (e) => {
    e.preventDefault();
    if (updatedName.trim()) {
      dispatch(editSpecialisation({ id: editingSpecialisation.id, data: { name: updatedName } }));
      setEditingSpecialisation(null); // Exit edit mode
    }
  };

  // Handle deleting a specialization
  const handleDeleteSpecialisation = (id) => {
    if (window.confirm("Are you sure you want to delete this specialization?")) {
      dispatch(removeSpecialisation(id));
    }
  };

  return (
    <div className="p-6 mx-80">
      <h1 className="text-2xl font-bold mb-4">Specialisations</h1>

      {/* Display error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Add new specialization form */}
      <form onSubmit={handleAddSpecialisation} className="mb-4 flex gap-2">
        <Input
          type="text"
          placeholder="New Specialisation Name"
          value={newSpecialisation}
          onChange={(e) => setNewSpecialisation(e.target.value)}
          required
        />
        <Button type="submit" className="bg-green-500">Add</Button>
      </form>

      {/* Loading indicator */}
      {loading && <p>Loading specialisations...</p>}

      {/* Specialisation List */}
      <ul className="space-y-4">
        {specialisations.map((specialisation) => (
          <li key={specialisation.id} className="flex justify-between items-center p-3 border rounded">
            {editingSpecialisation?.id === specialisation.id ? (
              // Editing Mode
              <form onSubmit={handleUpdateSpecialisation} className="flex gap-2">
                <Input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  required
                />
                <Button type="submit" className="bg-blue-500">Save</Button>
                <Button type="button" className="bg-gray-400" onClick={() => setEditingSpecialisation(null)}>Cancel</Button>
              </form>
            ) : (
              // Normal Display Mode
              <>
                <span>{specialisation.name}</span>
                <div className="flex gap-2">
                  <Button className="bg-blue-500" onClick={() => handleEditClick(specialisation)}>Edit</Button>
                  <Button className="bg-red-500" onClick={() => handleDeleteSpecialisation(specialisation.id)}>Delete</Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialisationsPage;
