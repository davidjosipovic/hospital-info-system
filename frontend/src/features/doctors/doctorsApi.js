import { api } from "../../api/api"; // ✅ Uses Axios instance

// ✅ GET: Fetch all doctors
export const getDoctors = async () => {
  try {
    const response = await api.get("/doctors");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dohvaćanju liječnika.";
  }
};

// ✅ POST: Add a new doctor
export const createDoctor = async (doctorData) => {
  try {
    const response = await api.post("/doctors", doctorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dodavanju liječnika.";
  }
};

// ✅ PUT: Update doctor details
export const updateDoctor = async (id, doctorData) => {
  try {
    const response = await api.put(`/doctors/${id}`, doctorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri ažuriranju liječnika.";
  }
};

// ✅ DELETE: Remove a doctor (Admin only)
export const deleteDoctor = async (id) => {
  try {
    await api.delete(`/doctors/${id}`);
    return id; // Return ID so Redux can remove it from state
  } catch (error) {
    throw error.response?.data || "Greška pri brisanju liječnika.";
  }
};
