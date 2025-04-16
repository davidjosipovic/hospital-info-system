import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  addDepartment,
  editDepartment,
  removeDepartment,
} from "../../features/departments/departmentsSlice";
import DepartmentForm from "../../features/departments/components/DepartmentForm";
import DepartmentItem from "../../features/departments/components/DepartmentItem";

const DepartmentsPage = () => {
  const dispatch = useDispatch();
  const {
    list: departments,
    loading,
    error,
  } = useSelector((state) => state.departments);

  const [newDepartment, setNewDepartment] = useState("");
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (newDepartment.trim()) {
      dispatch(addDepartment({ name: newDepartment }));
      setNewDepartment("");
    }
  };

  const handleEditClick = (department) => {
    setEditingDepartment(department);
    setUpdatedName(department.name);
  };

  const handleUpdateDepartment = (e) => {
    e.preventDefault();
    if (updatedName.trim()) {
      dispatch(
        editDepartment({
          id: editingDepartment.id,
          data: { id: editingDepartment.id, name: updatedName },
        })
      ).then(() => dispatch(fetchDepartments()));
      setEditingDepartment(null);
    }
  };

  const handleDeleteDepartment = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      dispatch(removeDepartment(id));
    }
  };

  return (
    <div className="ml-64 max-w-8xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      {error && <p className="text-red-500">{error}</p>}
      <DepartmentForm
        newDepartment={newDepartment}
        setNewDepartment={setNewDepartment}
        handleAddDepartment={handleAddDepartment}
      />
      {loading && <p>Loading departments...</p>}
      <ul className="space-y-4">
        {departments.map((department) => (
          <DepartmentItem
            key={department.id}
            department={department}
            handleEditClick={handleEditClick}
            handleDeleteDepartment={handleDeleteDepartment}
            editingDepartment={editingDepartment}
            updatedName={updatedName}
            setUpdatedName={setUpdatedName}
            handleUpdateDepartment={handleUpdateDepartment}
            setEditingDepartment={setEditingDepartment}
          />
        ))}
      </ul>
    </div>
  );
};

export default DepartmentsPage;
