import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAppointments } from "./appointmentsApi"; // ✅ Import API funkcije

// ✅ Async action za dohvaćanje termina
export const fetchAppointments = createAsyncThunk("appointments/fetchAppointments", async (_, { rejectWithValue }) => {
  try {
    return await getAppointments();
  } catch (error) {
    return rejectWithValue(error);
  }
});

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appointmentsSlice.reducer;
