import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  Users,
  Calendar,
  UserCheck,
  ClipboardList,
  PlusCircle,
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
    const baseLinks = [
      {
        path: "/dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        path: "/appointments",
        label: "Appointments",
        icon: <Calendar className="w-5 h-5" />,
      },
    ];

    if (role === "admin") {
      return [
        ...baseLinks,
        {
          path: "/admin/users",
          label: "Users",
          icon: <Users className="w-5 h-5" />,
        },
        {
          path: "/admin/patients",
          label: "Patients",
          icon: <ClipboardList className="w-5 h-5" />,
        },
        {
          path: "/admin/doctors",
          label: "Doctors",
          icon: <UserCheck className="w-5 h-5" />,
        },
        {
          path: "/admin/specializations",
          label: "Specializations",
          icon: <UserCheck className="w-5 h-5" />,
        },
        {
          path: "/admin/departments",
          label: "Departments",
          icon: <UserCheck className="w-5 h-5" />,
        },
        {
          path: "/admin/register",
          label: "Register User",
          icon: <PlusCircle className="w-5 h-5 text-green-400" />,
        }, // ✅ Added Register Button
      ];
    } else if (role === "doctor" || role === "nurse") {
      return [
        ...baseLinks,
        {
          path: "/patients",
          label: "Patients",
          icon: <ClipboardList className="w-5 h-5" />,
        },
        {
          path: "/schedule",
          label: "Schedule",
          icon: <Calendar className="w-5 h-5" />,
        },
      ];
    }
    return baseLinks;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md md:hidden"
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
          <ul className="space-y-4">
            {getNavigation().map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="flex items-center p-2 hover:bg-gray-800 rounded"
                >
                  {link.icon} <span className="ml-3">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-2 bg-red-600 rounded hover:bg-red-700"
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
