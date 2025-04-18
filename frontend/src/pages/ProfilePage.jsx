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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Profile</h2>
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg shadow">
              <p className="text-lg font-semibold text-gray-700"><strong>First Name:</strong> {user.firstName}</p>
              <p className="text-lg font-semibold text-gray-700"><strong>Last Name:</strong> {user.lastName}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg shadow">
              <p className="text-lg font-semibold text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-lg font-semibold text-gray-700"><strong>Role:</strong> {user.role}</p>
            </div>
            <div className="col-span-1 md:col-span-2 p-4 bg-blue-50 rounded-lg shadow">
              <p className="text-lg font-semibold text-gray-700"><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;