import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecializations,
  addSpecialization,
  editSpecialization,
  removeSpecialization,
} from "../../features/specializations/specializationsSlice";
import SpecializationForm from "../../features/specializations/components/SpecializationForm";
import SpecializationItem from "../../features/specializations/components/SpecializationItem";

const SpecializationsPage = () => {
  const dispatch = useDispatch();
  const { list: specializations, loading, error } = useSelector(
    (state) => state.specializations
  );
  
  const [editingSpecialization, setEditingSpecialization] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    dispatch(fetchSpecializations());
  }, [dispatch]);

  const handleAddSpecialization = (name) => {
    dispatch(addSpecialization({ name }));
  };

  const handleEditClick = (specialization) => {
    setEditingSpecialization(specialization);
    setUpdatedName(specialization.name);
  };

  const handleUpdateSpecialization = (id, name) => {
    dispatch(editSpecialization({ id, data: { id, name } })).then(() => {
      dispatch(fetchSpecializations());
    });
    setEditingSpecialization(null);
  };

  const handleDeleteSpecialization = (id) => {
    if (window.confirm("Are you sure you want to delete this specialization?")) {
      dispatch(removeSpecialization(id));
    }
  };

  return (
    <div className="ml-64 max-w-8xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Specializations</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      <SpecializationForm onAdd={handleAddSpecialization} />

      {loading && <p>Loading specializations...</p>}
      <ul className="space-y-4">
        {specializations.map((specialization) => (
          <SpecializationItem
            key={specialization.id}
            specialization={specialization}
            editingSpecialization={editingSpecialization}
            updatedName={updatedName}
            setUpdatedName={setUpdatedName}
            onEditClick={handleEditClick}
            onUpdate={handleUpdateSpecialization}
            onDelete={handleDeleteSpecialization}
            onCancelEdit={() => setEditingSpecialization(null)}
          />
        ))}
      </ul>
    </div>
  );
};

export default SpecializationsPage;