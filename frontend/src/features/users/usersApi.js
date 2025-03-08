import { api } from "../../api/api";

export const getUsers = async () => {
  try {
    const response = await api.get("/users"); 
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching users.";
  }
};
