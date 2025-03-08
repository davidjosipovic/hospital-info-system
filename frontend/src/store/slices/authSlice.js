import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api/api";
import { jwtDecode } from "jwt-decode";

const parseToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      role: decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
      userId: decoded.sub,
    };
  } catch (error) {
    return null;
  }
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      localStorage.setItem("token", data.token);
      const parsedToken = parseToken(data.token);

      return {
        token: data.token,
        role: parsedToken?.role || null,
        userId: parsedToken?.userId || null,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const storedToken = localStorage.getItem("token");
const storedUser = storedToken ? parseToken(storedToken) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: storedUser?.userId || null,
    role: storedUser?.role || null,
    token: storedToken || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userId = null;
      state.role = null;
      state.token = null;
      localStorage.removeItem("token");
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
