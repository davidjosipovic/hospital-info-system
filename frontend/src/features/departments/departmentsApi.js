import { api } from "../../api/api"; 


export const getDepartment = async () => {
  try {
    const response = await api.get("/departments");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dohvaćanju odjela.";
  }
};


export const createDepartment = async (doctorData) => {
  try {
    const response = await api.post("/departments", doctorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri dodavanju odjela.";
  }
};


export const updateDepartment = async (id, doctorData) => {
  try {
    console.log(id,doctorData)
    const response = await api.put(`/departments/${id}`, doctorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Greška pri ažuriranju odjela.";
  }
};


export const deleteDepartment = async (id) => {
  try {
    await api.delete(`/departments/${id}`);
    return id;
  } catch (error) {
    throw error.response?.data || "Greška pri brisanju odjela.";
  }
};
