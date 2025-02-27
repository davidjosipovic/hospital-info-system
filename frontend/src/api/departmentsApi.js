import { api } from "./api"; // ✅ Uses Axios instance

// ✅ GET: Fetch all departments
export const getDepartment = async () => {
  try {
    const response = await api.get("/departments");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dohvaćanju odjela.";
  }
};

// ✅ POST: Add a new departments
export const createDepartment = async (doctorData) => {
  try {
    const response = await api.post("/departments", doctorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dodavanju odjela.";
  }
};

// ✅ PUT: Update department details
export const updateDepartment = async (id, doctorData) => {
  try {
    const response = await api.put(`/departments/${id}`, doctorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri ažuriranju odjela.";
  }
};

// ✅ DELETE: Remove a departments (Admin only)
export const deleteDepartment = async (id) => {
  try {
    await api.delete(`/departments/${id}`);
    return id; // Return ID so Redux can remove it from state
  } catch (error) {
    throw error.response?.data || "Greška pri brisanju odjela.";
  }
};
