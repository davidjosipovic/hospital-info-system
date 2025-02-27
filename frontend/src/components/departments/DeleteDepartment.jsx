import { useDispatch } from "react-redux";
import { removeDepartment } from "../store/slices/departmentsSlice";

const DeleteDepartment = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(removeDepartment(id));
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteDepartment;
