import { useSelector } from "react-redux";

function BoilerPlate() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-500">BoilerPlate</h2>
        <p className="text-center mt-2">Welcome, {user?.firstName} {user?.lastName}!</p>
      </div>
    </div>
  );
}

export default BoilerPlate;
