import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editDepartment } from "../store/slices/departmentsSlice";

const UpdateDepartment = ({ department }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(department.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editDepartment({ id: department.id, data: { name } }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateDepartment;
