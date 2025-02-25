import axios from "axios";

const API_BASE_URL = "http://localhost:5214/api"; // 🚀 Postavi pravi backend URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

// ✅ Login API poziv
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

// ✅ Register API poziv
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response);
    throw error;
  }
};
