import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LayoutDashboard, Users, Calendar, Settings, LogOut } from "lucide-react";

const AdminSidebar = ({ onLogout }) => {
  const { role } = useSelector((state) => state.auth);

  // ✅ Prikaži Sidebar samo ako je korisnik Admin
  if (role !== "admin") return null;

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed flex flex-col shadow-lg">
      {/* ✅ Logo */}
      <div className="p-5 text-lg font-bold text-center border-b border-gray-700">
        Admin Panel
      </div>

      {/* ✅ Navigacija */}
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link to="/admin/dashboard" className="flex items-center p-2 hover:bg-gray-800 rounded">
              <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="flex items-center p-2 hover:bg-gray-800 rounded">
              <Users className="w-5 h-5 mr-3" /> Korisnici
            </Link>
          </li>
          <li>
            <Link to="/admin/schedule" className="flex items-center p-2 hover:bg-gray-800 rounded">
              <Calendar className="w-5 h-5 mr-3" /> Termini
            </Link>
          </li>
          <li>
            <Link to="/admin/settings" className="flex items-center p-2 hover:bg-gray-800 rounded">
              <Settings className="w-5 h-5 mr-3" /> Postavke
            </Link>
          </li>
        </ul>
      </nav>
      
    </div>
  );
};

export default AdminSidebar;
