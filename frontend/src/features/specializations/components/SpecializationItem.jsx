// SpecializationItem.jsx
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
    <li className="flex justify-between items-center p-3 border rounded">
      {editingSpecialization?.id === specialization.id ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onUpdate(specialization.id, updatedName);
          }}
          className="flex gap-2"
        >
          <Input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            required
          />
          <Button type="submit" className="bg-blue-500">Save</Button>
          <Button type="button" className="bg-gray-400" onClick={onCancelEdit}>
            Cancel
          </Button>
        </form>
      ) : (
        <>
          <span>{specialization.name}</span>
          <div className="flex gap-2">
            <Button className="bg-blue-500" onClick={() => onEditClick(specialization)}>
              Edit
            </Button>
            <Button className="bg-red-500" onClick={() => onDelete(specialization.id)}>
              Delete
            </Button>
          </div>
        </>
      )}
    </li>
  );
};

export default SpecializationItem;
