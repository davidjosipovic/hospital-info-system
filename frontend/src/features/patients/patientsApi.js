import { api } from "../../api/api";

export const getPatients = async () => {
  try {
    const response = await api.get("/patients");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching patients.";
  }
};

export const addPatient = async (patientData) => {
  try {
    console.log("Original date:", patientData.dateOfBirth);

    const formattedData = {
      firstName: patientData.firstName?.trim(),
      lastName: patientData.lastName?.trim(),
      dateOfBirth: new Date(patientData.dateOfBirth).toISOString(), // Ensure UTC format
      gender: patientData.gender,
      phoneNumber: patientData.phoneNumber || null,
      address: patientData.address || null,
      emergencyContact: patientData.emergencyContact || null,
    };

    console.log("Formatted date:", formattedData.dateOfBirth);
    const response = await api.post("/patients", formattedData);
    return response.data;
  } catch (error) {
    console.error("Error adding patient:", error.response?.data);
    throw error.response?.data || "Error adding patient.";
  }
};

export const updatePatient = async (id, patientData) => {
  try {
    console.log("Original date:", patientData.dateOfBirth);

    const formattedData = {
      firstName: patientData.firstName?.trim(),
      lastName: patientData.lastName?.trim(),
      dateOfBirth: new Date(patientData.dateOfBirth).toISOString(), // Ensure UTC format
      gender: patientData.gender,
      phoneNumber: patientData.phoneNumber || null,
      address: patientData.address || null,
      emergencyContact: patientData.emergencyContact || null,
    };

    console.log("Formatted date:", formattedData.dateOfBirth);
    const response = await api.put(`/patients/${id}`, formattedData);
    return response.data;
  } catch (error) {
    console.error("Error updating patient:", error.response?.data);
    throw error.response?.data || "Error updating patient.";
  }
};


export const deletePatient = async (id) => {
  try {
    await api.delete(`/patients/${id}`);
    return id;
  } catch (error) {
    throw error.response?.data || "Error deleting patient.";
  }
};
