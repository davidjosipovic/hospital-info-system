import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  return token ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default AuthGuard;
