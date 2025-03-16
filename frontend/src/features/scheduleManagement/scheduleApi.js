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

export const updateSchedule = async (scheduleId, data) => {
  try {
    console.log("Updating schedule with ID:", scheduleId);
    console.log("Data being sent:", data);

    
    const response = await api.put(`${API_URL}/${scheduleId}`, data); // Correct URL for update

    if (response.status === 204) {
      console.log("Schedule updated successfully, no data returned");
      return { success: true }; // Indicate success without returning data
    }

    console.log("Schedule updated:", response.data);
    return response.data;  // This would be for cases where data is returned
  } catch (error) {
    console.error("Error updating schedule:", error);
    if (error.response) {
      console.error("Response from server:", error.response.data);
    }
    throw error;  // Ensure we throw the error if something goes wrong
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
