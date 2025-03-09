import { api } from "../../api/api";

export const getAppointments = async () => {
  try {
    const response = await api.get("/appointments"); 
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dohvaćanju termina.";
  }
};
