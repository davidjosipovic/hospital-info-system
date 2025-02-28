import { api } from "../../api/api";

export const getDoctors = async () => {
  try {
    const response = await api.get("/doctors");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dohvaćanju liječnika.";
  }
};

export const createDoctor = async (doctorData) => {
  try {
    const response = await api.post("/doctors", doctorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dodavanju liječnika.";
  }
};

export const updateDoctor = async (id, doctorData) => {
  try {
    const response = await api.put(`/doctors/${id}`, doctorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri ažuriranju liječnika.";
  }
};

export const deleteDoctor = async (id) => {
  try {
    await api.delete(`/doctors/${id}`);
    return id;
  } catch (error) {
    throw error.response?.data || "Greška pri brisanju liječnika.";
  }
};
