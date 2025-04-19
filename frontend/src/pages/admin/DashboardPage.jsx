import { useSelector } from "react-redux";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="ml-64 max-w-8xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-500">Dashboard</h2>
        <p className="text-center mt-2">Welcome, {user?.firstName} {user?.lastName}!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-600">Total Patients</h3>
          <p className="text-2xl font-bold text-green-800">120</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-yellow-600">Appointments Today</h3>
          <p className="text-2xl font-bold text-yellow-800">15</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-red-600">Pending Approvals</h3>
          <p className="text-2xl font-bold text-red-800">8</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-600">Doctors On Duty</h3>
          <p className="text-2xl font-bold text-blue-800">10</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
