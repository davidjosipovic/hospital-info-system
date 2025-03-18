import { api } from "../../api/api";

const API_URL = "/workschedules";

export const getSchedules = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    throw error;
  }
};


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
   
    const response = await api.put(`${API_URL}/${scheduleId}`, data); 

    if (response.status === 204) {
      console.log("Schedule updated successfully");
      return data; 
    }

  } catch (error) {
    console.error("Error updating schedule:", error);
    if (error.response) {
      console.error("Response from server:", error.response.data);
    }
    throw error;  
  }
};



export const deleteSchedule = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting schedule:", error);
    throw error;
  }
};
