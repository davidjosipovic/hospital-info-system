import { api } from "./api";

// ✅ Fetch all users
export const getUsers = async () => {
  try {
    const response = await api.get("/users"); // Adjust API route if needed
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching users.";
  }
};
