import { api } from "../../api/api";

export const getUsers = async () => {
  try {
    const response = await api.get("/users"); 
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching users.";
  }
};

export const deleteUserApi = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    return id;
  } catch (error) {
    throw error.response?.data || "Error deleting user.";
  }
};

export const updateUserApi = async (user) => {
  try {
    const response = await api.put(`/users/${user.id}`, user);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error updating user.";
  }
};
