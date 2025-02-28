import { api } from "../../api/api"; // ✅ Uses Axios instance

// ✅ GET: Fetch all specializations
export const getSpecializations = async () => {
  try {
    const response = await api.get("/specializations");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dohvaćanju specijalizacija.";
  }
};

// ✅ POST: Add a new specialization
export const createSpecialization = async (specializationData) => {
  try {
    const response = await api.post("/specializations", specializationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dodavanju specijalizacije.";
  }
};

// ✅ PUT: Update specialization details
export const updateSpecialization = async (id, specializationData) => {
  try {
    const response = await api.put(`/specializations/${id}`, specializationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri ažuriranju specijalizacije.";
  }
};

// ✅ DELETE: Remove a specialization (Admin only)
export const deleteSpecialization = async (id) => {
  try {
    await api.delete(`/specializations/${id}`);
    return id; // Return ID so Redux can remove it from state
  } catch (error) {
    throw error.response?.data || "Greška pri brisanju specijalizacije.";
  }
};
