import axios from "axios";

const API_URL = "/api/medicalrecords";

export const getMedicalRecords = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createMedicalRecordApi = async (record) => {
  const response = await axios.post(API_URL, record);
  return response.data;
};

export const updateMedicalRecordApi = async (record) => {
  const response = await axios.put(`${API_URL}/${record.id}`, record);
  return response.data;
};

export const deleteMedicalRecordApi = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};