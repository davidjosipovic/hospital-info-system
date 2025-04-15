import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMedicalRecords, createMedicalRecordApi, updateMedicalRecordApi, deleteMedicalRecordApi } from "./medicalRecordsApi";

export const fetchMedicalRecords = createAsyncThunk(
  "medicalRecords/fetchMedicalRecords",
  async (_, { rejectWithValue }) => {
    try {
      return await getMedicalRecords();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createMedicalRecord = createAsyncThunk(
  "medicalRecords/createMedicalRecord",
  async (record, { rejectWithValue }) => {
    try {
      return await createMedicalRecordApi(record);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateMedicalRecord = createAsyncThunk(
  "medicalRecords/updateMedicalRecord",
  async (record, { rejectWithValue }) => {
    try {
      return await updateMedicalRecordApi(record);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteMedicalRecord = createAsyncThunk(
  "medicalRecords/deleteMedicalRecord",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteMedicalRecordApi(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const medicalRecordsSlice = createSlice({
  name: "medicalRecords",
  initialState: {
    records: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicalRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMedicalRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchMedicalRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createMedicalRecord.fulfilled, (state, action) => {
        state.records.push(action.payload);
      })
      .addCase(updateMedicalRecord.fulfilled, (state, action) => {
        state.records = state.records.map(record => 
          record.id === action.payload.id ? action.payload : record
        );
      })
      .addCase(deleteMedicalRecord.fulfilled, (state, action) => {
        state.records = state.records.filter(record => record.id !== action.payload);
      });
  },
});

export default medicalRecordsSlice.reducer;