import React from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const SpecializationItem = ({
  specialization,
  editingSpecialization,
  updatedName,
  setUpdatedName,
  onEditClick,
  onUpdate,
  onDelete,
  onCancelEdit,
}) => {
  return (
    <li className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm mb-2">
      {editingSpecialization?.id === specialization.id ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onUpdate(specialization.id, updatedName);
          }}
          className="flex gap-2 w-full"
        >
          <Input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">Save</Button>
          <Button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition" onClick={onCancelEdit}>
            Cancel
          </Button>
        </form>
      ) : (
        <>
          <span className="font-medium text-gray-800">{specialization.name}</span>
          <div className="flex gap-2">
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition" onClick={() => onEditClick(specialization)}>
              Edit
            </Button>
            <Button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition" onClick={() => onDelete(specialization.id)}>
              Delete
            </Button>
          </div>
        </>
      )}
    </li>
  );
};

export default SpecializationItem;
