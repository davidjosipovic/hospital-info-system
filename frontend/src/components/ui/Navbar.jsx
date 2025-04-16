import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardList,
  UserCheck,
  FileText,
  NotebookPen,
  Box,
} from "lucide-react";
import { logout } from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const getNavigation = () => {
    const commonLinks = [
      {
        path: "/profile",
        label: "Profile",
        icon: <FileText className="w-5 h-5" />,
      },
    ];

    if (role === "admin") {
      return [
        ...commonLinks,
        {
          path: "/",
          label: "Dashboard",
          icon: <LayoutDashboard className="w-5 h-5" />,
        },
        {
          path: "/admin/users",
          label: "User Management",
          icon: <Users className="w-5 h-5" />,
        },
        {
          path: "/admin/doctors",
          label: "Doctor Management",
          icon: <Users className="w-5 h-5" />,
        },
        {
          path: "/admin/departments",
          label: "Departments",
          icon: <Box className="w-5 h-5" />,
        },
        {
          path: "/admin/specializations",
          label: "Specializations",
          icon: <UserCheck className="w-5 h-5" />,
        },
        {
          path: "/admin/schedules",
          label: "Schedules",
          icon: <Calendar className="w-5 h-5" />,
        },
        {
          path: "/admin/rooms",
          label: "Rooms",
          icon: <ClipboardList className="w-5 h-5" />,
        },
        
      ];
    } else if (role === "doctor" || role === "nurse") {
      return [
        ...commonLinks,
        {
          path: "/",
          label: "Dashboard",
          icon: <LayoutDashboard className="w-5 h-5" />,
        },
        {
          path: "/staff/appointments",
          label: "Appointments",
          icon: <Calendar className="w-5 h-5" />,
        },
        {
          path: "/staff/patients",
          label: "Patients",
          icon: <ClipboardList className="w-5 h-5" />,
        },
        {
          path: "/staff/medical-records",
          label: "Medical Records",
          icon: <FileText className="w-5 h-5" />,
        },
        {
          path: "/staff/prescriptions",
          label: "Prescriptions",
          icon: <NotebookPen className="w-5 h-5" />,
        },
        {
          path: "/staff/schedule",
          label: "Work Schedule",
          icon: <Calendar className="w-5 h-5" />,
        },
        {
          path: "/staff/room-assignments",
          label: "Room Assignments",
          icon: <Box className="w-5 h-5" />,
        },
      ];
    }

    return commonLinks;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white px-3 py-1  rounded-md md:hidden"
      >
        ☰
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <div className="p-5 text-lg font-bold text-center border-b border-gray-700">
          {role ? `Welcome, ${role}` : "Welcome"}
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-6">
            {getNavigation().map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="flex items-center p-3 rounded-md hover:bg-gray-800 transition-all"
                >
                  {link.icon}
                  <span className="ml-3 text-sm font-medium">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-3 bg-red-600 rounded-md hover:bg-red-700 transition-all"
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
