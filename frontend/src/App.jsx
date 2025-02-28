import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProtectedRoleRoute from "./components/auth/ProtectedRoleRoute";
import HomePage from "./pages/HomePage";
import PatientsPage from "./pages/admin/PatientsPage";
import AppointmentsPage from "./pages/staff/AppointmentsPage";
import Navbar from "./components/ui/Navbar";
import AuthGuard from "./components/auth/AuthGuard";
import DoctorsPage from "./pages/admin/DoctorsPage";
import DepartmentsPage from "./pages/admin/DepartmentsPage";
import SpecializationsPage from "./pages/admin/SpecializationsPage";

function App() {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <div>
      {/* ✅ Show Navbar only when user is logged in */}
      {token && <Navbar />}

      <Routes>
        {/* ✅ Public Route (Redirect if Logged In) */}
        <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />

        {/* ✅ Protected Routes inside `AuthGuard` */}
        <Route
          path="/*"
          element={
            <AuthGuard>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin/dashboard" element={<DashboardPage />} />
                

                <Route
                  path="/admin/register"
                  element={
                    <ProtectedRoleRoute allowedRoles={["admin"]}>
                      <RegisterPage />
                    </ProtectedRoleRoute>
                  }
                />

                <Route
                  path="/admin/patients"
                  element={
                    <ProtectedRoleRoute allowedRoles={["admin", "doctor", "nurse"]}>
                      <PatientsPage />
                    </ProtectedRoleRoute>
                  }
                />

<Route
                  path="/admin/doctors"
                  element={
                    <ProtectedRoleRoute allowedRoles={["admin"]}>
                      <DoctorsPage />
                    </ProtectedRoleRoute>
                  }
                />
                <Route
                  path="/admin/departments"
                  element={
                    <ProtectedRoleRoute allowedRoles={["admin"]}>
                      <DepartmentsPage />
                    </ProtectedRoleRoute>
                  }
                />
                <Route
                  path="/admin/specializations"
                  element={
                    <ProtectedRoleRoute allowedRoles={["admin"]}>
                      <SpecializationsPage />
                    </ProtectedRoleRoute>
                  }
                />

                <Route
                  path="/appointments"
                  element={
                    <ProtectedRoleRoute allowedRoles={["admin", "doctor", "nurse"]}>
                      <AppointmentsPage />
                    </ProtectedRoleRoute>
                  }
                />
                 <Route
                  path="/patients"
                  element={
                    <ProtectedRoleRoute allowedRoles={["admin", "doctor", "nurse"]}>
                      <PatientsPage />
                    </ProtectedRoleRoute>
                  }
                />
              </Routes>
            </AuthGuard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
