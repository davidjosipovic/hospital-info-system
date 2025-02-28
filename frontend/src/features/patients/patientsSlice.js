import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPatients, addPatient, updatePatient, deletePatient } from "./patientsApi";

export const fetchPatients = createAsyncThunk("patients/fetchPatients", async (_, { rejectWithValue }) => {
  try {
    return await getPatients();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createPatient = createAsyncThunk("patients/createPatient", async (patientData, { rejectWithValue }) => {
  try {
    return await addPatient(patientData);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editPatient = createAsyncThunk("patients/editPatient", async ({ id, patientData }, { rejectWithValue }) => {
  try {
    return await updatePatient(id, patientData);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const removePatient = createAsyncThunk("patients/removePatient", async (id, { rejectWithValue }) => {
  try {
    return await deletePatient(id);
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
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.patients.push(action.payload);
      })
      .addCase(editPatient.fulfilled, (state, action) => {
        const index = state.patients.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.patients[index] = action.payload;
      })
      .addCase(removePatient.fulfilled, (state, action) => {
        state.patients = state.patients.filter((p) => p.id !== action.payload);
      });
  },
});

export default patientsSlice.reducer;