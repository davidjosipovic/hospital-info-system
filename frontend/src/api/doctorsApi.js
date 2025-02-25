import { api } from "./api"; // ✅ Koristi Axios instancu

export const getDoctors = async () => {
  try {
    const response = await api.get("/doctors"); // ⚠️ Prilagodi rutu API-ja ako je drugačija
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dohvaćanju liječnika.";
  }
};
