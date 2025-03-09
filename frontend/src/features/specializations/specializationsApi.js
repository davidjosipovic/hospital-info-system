import { api } from "../../api/api"; 

export const getSpecializations = async () => {
  try {
    const response = await api.get("/specializations");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dohvaćanju specijalizacija.";
  }
};


export const createSpecialization = async (specializationData) => {
  try {
    const response = await api.post("/specializations", specializationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dodavanju specijalizacije.";
  }
};


export const updateSpecialization = async (id, specializationData) => {
  try {
    const response = await api.put(`/specializations/${id}`, specializationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri ažuriranju specijalizacije.";
  }
};


export const deleteSpecialization = async (id) => {
  try {
    await api.delete(`/specializations/${id}`);
    return id; 
  } catch (error) {
    throw error.response?.data || "Greška pri brisanju specijalizacije.";
  }
};
