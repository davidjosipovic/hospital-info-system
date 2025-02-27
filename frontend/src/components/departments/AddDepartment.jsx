import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDepartment } from "../store/slices/departmentsSlice";

const AddDepartment = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDepartment({ name }));
    setName(""); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Department Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <button type="submit">Add Department</button>
    </form>
  );
};

export default AddDepartment;
