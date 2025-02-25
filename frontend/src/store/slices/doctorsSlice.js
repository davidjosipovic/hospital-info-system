import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoctors } from "../../api/doctorsApi"; // ✅ Import API funkcije

// ✅ Async action za dohvaćanje liječnika
export const fetchDoctors = createAsyncThunk("doctors/fetchDoctors", async (_, { rejectWithValue }) => {
  try {
    return await getDoctors();
  } catch (error) {
    return rejectWithValue(error);
  }
});

const doctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorsSlice.reducer;
