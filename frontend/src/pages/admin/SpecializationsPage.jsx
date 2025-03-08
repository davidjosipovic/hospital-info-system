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
  const {
    list: specializations,
    loading,
    error,
  } = useSelector((state) => state.specializations);

  const [newSpecialization, setNewSpecialization] = useState("");
  const [editingSpecialization, setEditingSpecialization] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    dispatch(fetchSpecializations());
  }, [dispatch]);

  const handleAddSpecialization = (e) => {
    e.preventDefault();
    if (newSpecialization.trim()) {
      dispatch(addSpecialization({ name: newSpecialization }));
      setNewSpecialization("");
    }
  };

  const handleEditClick = (specialization) => {
    setEditingSpecialization(specialization);
    setUpdatedName(specialization.name);
  };

  const handleUpdateSpecialization = (e) => {
    e.preventDefault();
    if (updatedName.trim()) {
      dispatch(
        editSpecialization({
          id: editingSpecialization.id,
          data: { name: updatedName },
        })
      );
      setEditingSpecialization(null);
    }
  };

  const handleDeleteSpecialization = (id) => {
    if (
      window.confirm("Are you sure you want to delete this specialization?")
    ) {
      dispatch(removeSpecialization(id));
    }
  };

  return (
    <div className="p-6 mx-80">
      <h1 className="text-2xl font-bold mb-4">Specializations</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleAddSpecialization} className="mb-4 flex gap-2">
        <Input
          type="text"
          placeholder="New Specialization Name"
          value={newSpecialization}
          onChange={(e) => setNewSpecialization(e.target.value)}
          required
        />
        <Button type="submit" className="bg-green-500">
          Add
        </Button>
      </form>

      {loading && <p>Loading specializations...</p>}

      <ul className="space-y-4">
        {specializations.map((specialization) => (
          <li
            key={specialization.id}
            className="flex justify-between items-center p-3 border rounded"
          >
            {editingSpecialization?.id === specialization.id ? (
              <form
                onSubmit={handleUpdateSpecialization}
                className="flex gap-2"
              >
                <Input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  required
                />
                <Button type="submit" className="bg-blue-500">
                  Save
                </Button>
                <Button
                  type="button"
                  className="bg-gray-400"
                  onClick={() => setEditingSpecialization(null)}
                >
                  Cancel
                </Button>
              </form>
            ) : (
              <>
                <span>{specialization.name}</span>
                <div className="flex gap-2">
                  <Button
                    className="bg-blue-500"
                    onClick={() => handleEditClick(specialization)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500"
                    onClick={() =>
                      handleDeleteSpecialization(specialization.id)
                    }
                  >
                    Delete
                  </Button>
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
