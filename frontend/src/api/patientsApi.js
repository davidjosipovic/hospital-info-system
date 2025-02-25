import { api } from "./api"; // ✅ Koristi Axios instancu

export const getPatients = async () => {
  try {
    const response = await api.get("/patients"); // ✅ API poziv
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dohvaćanju pacijenata.";
  }
};
