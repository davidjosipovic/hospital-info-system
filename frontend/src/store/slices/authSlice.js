import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api/api";
import {jwtDecode} from "jwt-decode"; // ✅ Install: npm install jwt-decode

// ✅ Function to Decode JWT Token
const parseToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"], // ✅ Extract role from JWT
      userId: decoded.sub, // ✅ Extract user ID (if available)
    };
  } catch (error) {
    return null;
  }
};

// ✅ Login Action (Uses API and stores token)
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const data = await loginUser(credentials);
    localStorage.setItem("token", data.token); // ✅ Save token in localStorage
    const parsedToken = parseToken(data.token);
    
    return { 
      token: data.token, 
      role: parsedToken?.role || null, 
      userId: parsedToken?.userId || null 
    };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// ✅ Register Action (Handles registration)
export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const data = await registerUser(userData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// ✅ Load token & role from localStorage on page refresh
const storedToken = localStorage.getItem("token");
const storedUser = storedToken ? parseToken(storedToken) : null;

// ✅ Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: storedUser?.userId || null, // ✅ Load user ID from token
    role: storedUser?.role || null, // ✅ Load role from token
    token: storedToken || null, // ✅ Load token from storage on refresh
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userId = null;
      state.role = null;
      state.token = null;
      localStorage.removeItem("token"); // ✅ Remove token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.userId = action.payload.userId;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
