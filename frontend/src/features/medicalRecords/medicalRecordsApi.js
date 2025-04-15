import { api } from "../../api/api";

const API_URL = "/medicalrecords";

export const getMedicalRecords = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

export const createMedicalRecordApi = async (record) => {
  const response = await api.post(API_URL, record);
  return response.data;
};

export const updateMedicalRecordApi = async (record) => {
  const response = await api.put(`${API_URL}/${record.id}`, record);
  return response.data;
};

export const deleteMedicalRecordApi = async (id) => {
  const response = await api.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getMedicalRecordsByPatient = async (patientId) => {
  const response = await api.get(`${API_URL}?patientId=${patientId}`);
  return response.data;
};