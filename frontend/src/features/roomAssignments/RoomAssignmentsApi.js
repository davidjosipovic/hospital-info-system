import { api } from "../../api/api";

const API_URL = '/PatientRoomAssignments';

export const fetchRoomAssignments = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

export const createRoomAssignment = async (assignment) => {
  const res = await api.post(API_URL, assignment);
  return res.data;
};

export const updateRoomAssignment = async (id, assignment) => {
  const res = await api.put(`${API_URL}/${id}`, assignment);
  return res.data;
};

export const deleteRoomAssignment = async (id) => {
  await api.delete(`${API_URL}/${id}`);
};
