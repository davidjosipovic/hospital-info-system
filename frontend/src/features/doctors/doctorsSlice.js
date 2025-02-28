import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "./doctorsApi";

export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async (_, { rejectWithValue }) => {
    try {
      return await getDoctors();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addDoctor = createAsyncThunk(
  "doctors/addDoctor",
  async (doctorData, { rejectWithValue }) => {
    try {
      return await createDoctor(doctorData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editDoctor = createAsyncThunk(
  "doctors/editDoctor",
  async ({ id, doctorData }, { rejectWithValue }) => {
    try {
      return await updateDoctor(id, doctorData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeDoctor = createAsyncThunk(
  "doctors/removeDoctor",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoctor(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
      })

      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors.push(action.payload);
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(editDoctor.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.doctors.findIndex(
          (doctor) => doctor.id === action.payload.id
        );
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
      })
      .addCase(editDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = state.doctors.filter(
          (doctor) => doctor.id !== action.payload
        );
      })
      .addCase(removeDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorsSlice.reducer;
