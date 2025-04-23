import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/ui/Navbar";
import AuthGuard from "./components/auth/AuthGuard";
import ProtectedRoleRoute from "./components/auth/ProtectedRoleRoute";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

import AdminDashboardPage from "./pages/admin/DashboardPage";
import DoctorsPage from "./pages/admin/DoctorsPage";
import DepartmentsPage from "./pages/admin/DepartmentsPage";
import SpecializationsPage from "./pages/admin/SpecializationsPage";
import UsersPage from "./pages/admin/UsersPage";
import HospitalRoomsPage from "./pages/admin/RoomsPage";  
import ScheduleManagementPage from "./pages/admin/ScheduleManagementPage";

import StaffDashboardPage from "./pages/staff/DashboardPage";
import AppointmentsPage from "./pages/staff/AppointmentsPage";
import PatientsPage from "./pages/staff/PatientsPage";
import MedicalRecordsPage from "./pages/staff/MedicalRecordsPage";  
import PrescriptionsPage from "./pages/staff/PrescriptionsPage";
import SchedulesPage from "./pages/staff/SchedulesPage";
import RoomAssignmentsPage from "./pages/staff/RoomAssignmentsPage";  
import PatientMedicalRecordsPage from "./pages/staff/PatientMedicalRecordsPage"; 
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { token } = useSelector((state) => state.auth);

  const adminRoutes = (
    <>
      <Route
        path="/admin/register"
        element={
          <ProtectedRoleRoute allowedRoles={["admin"]}>
            <RegisterPage />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/profile"
        element={
            <ProfilePage />
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoleRoute allowedRoles={["admin"]}>
            <UsersPage />
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
        path="/admin/schedules"
        element={
          <ProtectedRoleRoute allowedRoles={["admin"]}>
            <ScheduleManagementPage />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/admin/rooms"
        element={
          <ProtectedRoleRoute allowedRoles={["admin"]}>
            <HospitalRoomsPage />
          </ProtectedRoleRoute>
        }
      />
    </>
  );

  const staffRoutes = (
    <>
      <Route
        path="/staff/appointments"
        element={
          <ProtectedRoleRoute allowedRoles={["admin", "doctor", "nurse"]}>
            <AppointmentsPage />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/staff/patients"
        element={
          <ProtectedRoleRoute allowedRoles={["admin", "doctor", "nurse"]}>
            <PatientsPage />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/staff/medical-records"
        element={
          <ProtectedRoleRoute allowedRoles={["admin", "doctor", "nurse"]}>
            <MedicalRecordsPage />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/staff/prescriptions"
        element={
          <ProtectedRoleRoute allowedRoles={["admin", "doctor", "nurse"]}>
            <PrescriptionsPage />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/staff/schedules"
        element={
          <ProtectedRoleRoute allowedRoles={["admin", "doctor", "nurse"]}>
            <SchedulesPage />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/staff/room-assignments"
        element={
          <ProtectedRoleRoute allowedRoles={["admin", "doctor", "nurse"]}>
            <RoomAssignmentsPage />
          </ProtectedRoleRoute>
        }
      />
      <Route
        path="/staff/patients/:patientId/medical-records"
        element={
          <ProtectedRoleRoute allowedRoles={["admin", "doctor", "nurse"]}>
            <PatientMedicalRecordsPage />
          </ProtectedRoleRoute>
        }
      />
    </>
  );

  return (
    <div className="flex h-screen ">
      {token && <Navbar className="w-64 bg-gray-100 border-r" />}
      <div className="flex-1 overflow-y-auto p-4">
        <Routes>
          <Route
            path="/login"
            element={!token ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/*"
            element={
              <AuthGuard>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoleRoute allowedRoles={["admin"]}>
                        <AdminDashboardPage />
                      </ProtectedRoleRoute>
                    }
                  />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoleRoute allowedRoles={["admin", "doctor", "nurse"]}>
                        <StaffDashboardPage />
                      </ProtectedRoleRoute>
                    }
                  />
                  {adminRoutes}

                  {staffRoutes}

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </AuthGuard>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
