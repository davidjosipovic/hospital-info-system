import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/slices/authSlice";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoleRoute from "./components/ProtectedRoleRoute";

function App() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <h1 className="text-xl">My App</h1>
        {token && (
          <div className="flex items-center">
            <span className="mr-4">Welcome, {user?.firstName}!</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </div>
       )}
      </nav>

      <Routes>
        <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={<ProtectedRoleRoute allowedRoles={["Admin"]}><RegisterPage /></ProtectedRoleRoute>} />
        <Route path="/dashboard" element={token ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
