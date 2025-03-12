import { api } from "../../api/api";

const API_URL = "/workschedules";

// Fetch all work schedules
export const getSchedules = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    throw error;
  }
};

// Create a new work schedule
export const createSchedule = async (scheduleData) => {
  try {
    const response = await api.post(API_URL, scheduleData);
    return response.data;
  } catch (error) {
    console.error("Error creating schedule:", error);
    throw error;
  }
};

// Update a work schedule by ID
export const updateSchedule = async (id, scheduleData) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, scheduleData);
    return response.data;
  } catch (error) {
    console.error("Error updating schedule:", error);
    throw error;
  }
};

// Delete a work schedule by ID
export const deleteSchedule = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting schedule:", error);
    throw error;
  }
};
