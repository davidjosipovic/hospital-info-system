import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { api } from "../api/api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const decoded = jwtDecode(token);
        const email = decoded.email;

        const response = await api.get(`/users?email=${email}`);
        
        setUser(response.data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p className="text-center text-blue-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-blue-300" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-2xl text-blue-700 font-bold border-2 border-blue-300">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
          )}
        </div>
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">Welcome to Your Profile</h2>
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md">
              <p className="text-xl font-semibold text-gray-800"><strong>First Name:</strong> {user.firstName}</p>
              <p className="text-xl font-semibold text-gray-800"><strong>Last Name:</strong> {user.lastName}</p>
            </div>
            <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md">
              <p className="text-xl font-semibold text-gray-800"><strong>Email:</strong> {user.email}</p>
              <p className="text-xl font-semibold text-gray-800"><strong>Role:</strong> {user.role}</p>
            </div>
            <div className="col-span-1 md:col-span-2 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md">
              <p className="text-xl font-semibold text-gray-800"><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
        {!user && (
          <p className="text-center text-gray-600 text-lg">No user data available. Please try again later.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;