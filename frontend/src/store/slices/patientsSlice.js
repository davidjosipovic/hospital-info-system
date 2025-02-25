import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPatients } from "../../api/patientsApi"; // ✅ Import API funkcije

// ✅ Async action za dohvaćanje pacijenata
export const fetchPatients = createAsyncThunk("patients/fetchPatients", async (_, { rejectWithValue }) => {
  try {
    return await getPatients();
  } catch (error) {
    return rejectWithValue(error);
  }
});

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    patients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default patientsSlice.reducer;
