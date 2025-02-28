import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments, addDepartment, editDepartment, removeDepartment } from "../../features/departments/departmentsSlice";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const DepartmentsPage = () => {
  const dispatch = useDispatch();
  const { list: departments, loading, error } = useSelector((state) => state.departments);

  const [newDepartment, setNewDepartment] = useState("");
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Fetch departments on page load
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  // Handle adding a new department
  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (newDepartment.trim()) {
      dispatch(addDepartment({ name: newDepartment }));
      setNewDepartment(""); // Reset input
    }
  };

  // Handle starting an edit
  const handleEditClick = (department) => {
    setEditingDepartment(department);
    setUpdatedName(department.name);
  };

  // Handle updating a department
  const handleUpdateDepartment = (e) => {
    e.preventDefault();
    if (updatedName.trim()) {
      dispatch(editDepartment({ id: editingDepartment.id, data: { name: updatedName } }));
      setEditingDepartment(null); // Exit edit mode
    }
  };

  // Handle deleting a department
  const handleDeleteDepartment = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      dispatch(removeDepartment(id));
    }
  };

  return (
    <div className="p-6 mx-80">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>

      {/* Display error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Add new department form */}
      <form onSubmit={handleAddDepartment} className="mb-4 flex gap-2">
        <Input
          type="text"
          placeholder="New Department Name"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          required
        />
        <Button type="submit" className="bg-green-500">Add</Button>
      </form>

      {/* Loading indicator */}
      {loading && <p>Loading departments...</p>}

      {/* Department List */}
      <ul className="space-y-4">
        {departments.map((department) => (
          <li key={department.id} className="flex justify-between items-center p-3 border rounded">
            {editingDepartment?.id === department.id ? (
              // Editing Mode
              <form onSubmit={handleUpdateDepartment} className="flex gap-2">
                <Input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  required
                />
                <Button type="submit" className="bg-blue-500">Save</Button>
                <Button type="button" className="bg-gray-400" onClick={() => setEditingDepartment(null)}>Cancel</Button>
              </form>
            ) : (
              // Normal Display Mode
              <>
                <span>{department.name}</span>
                <div className="flex gap-2">
                  <Button className="bg-blue-500" onClick={() => handleEditClick(department)}>Edit</Button>
                  <Button className="bg-red-500" onClick={() => handleDeleteDepartment(department.id)}>Delete</Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentsPage;
