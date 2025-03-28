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

export const updateDoctor = async (doctorId, doctorData) => {
  try {
    const response = await fetch(`http://localhost:5214/api/doctors/${doctorId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Update Doctor API Error:", errorData);
      throw new Error(JSON.stringify(errorData)); // Ensure error is logged
    }

    return await response.json();
  } catch (error) {
    console.error("Error in updateDoctor:", error);
    throw error;
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
