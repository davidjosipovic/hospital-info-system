import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoleRoute = ({ allowedRoles, children }) => {
  const { role } = useSelector((state) => state.auth);
  return allowedRoles.includes(role) ? children : <Navigate to="/dashboard" />;
};

export default ProtectedRoleRoute;
