function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to Hospital Info System</h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center">
        Our hospital management system helps you efficiently manage patient records, appointments, and medical staff.
      </p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-blue-500">📋 Patient Management</h2>
          <p className="text-gray-600 mt-2">Easily add, edit, and manage patient records.</p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-blue-500">📅 Appointments</h2>
          <p className="text-gray-600 mt-2">Schedule and manage appointments efficiently.</p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-blue-500">👩‍⚕️ Staff Management</h2>
          <p className="text-gray-600 mt-2">Keep track of doctors, nurses, and other medical staff.</p>
        </div>
      </div>
      
    </div>
  );
}

export default HomePage;
