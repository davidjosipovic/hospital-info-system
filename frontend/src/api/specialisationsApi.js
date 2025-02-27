import { api } from "./api"; // ✅ Uses Axios instance

// ✅ GET: Fetch all specializations
export const getSpecialisations = async () => {
  try {
    const response = await api.get("/specializations");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dohvaćanju specijalizacija.";
  }
};

// ✅ POST: Add a new specialization
export const createSpecialisation = async (specialisationData) => {
  try {
    const response = await api.post("/specializations", specialisationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dodavanju specijalizacije.";
  }
};

// ✅ PUT: Update specialization details
export const updateSpecialisation = async (id, specialisationData) => {
  try {
    const response = await api.put(`/specializations/${id}`, specialisationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri ažuriranju specijalizacije.";
  }
};

// ✅ DELETE: Remove a specialization (Admin only)
export const deleteSpecialisation = async (id) => {
  try {
    await api.delete(`/specializations/${id}`);
    return id; // Return ID so Redux can remove it from state
  } catch (error) {
    throw error.response?.data || "Greška pri brisanju specijalizacije.";
  }
};
