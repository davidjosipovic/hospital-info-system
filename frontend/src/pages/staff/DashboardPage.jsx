import { useSelector } from "react-redux";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="ml-64 max-w-8xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-500">Dashboard</h2>
        <p className="text-center mt-2">Welcome, {user?.firstName} {user?.lastName}!</p>
      </div>
    </div>
  );
}

export default Dashboard;
