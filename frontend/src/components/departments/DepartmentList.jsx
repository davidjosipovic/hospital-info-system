import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../store/slices/departmentsSlice";

const DepartmentList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.departments);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  return (
    <div>
      <h2>Departments</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {list.map((dept) => (
          <li key={dept.id}>{dept.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;
