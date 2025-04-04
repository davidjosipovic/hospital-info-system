import axios from "axios";

const API_BASE_URL = "http://backend:5214/api"; 

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login",
      credentials,
    );
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response);
    throw error;
  }
};
