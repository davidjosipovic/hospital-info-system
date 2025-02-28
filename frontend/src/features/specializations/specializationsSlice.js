import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSpecializations,
  createSpecialization,
  updateSpecialization,
  deleteSpecialization,
} from "./specializationsApi";

// ✅ Fetch specializations
export const fetchSpecializations = createAsyncThunk("specializations/fetch", async () => {
  return await getSpecializations();
});

// ✅ Add specialization
export const addSpecialization = createAsyncThunk("specializations/add", async (data) => {
  return await createSpecialization(data);
});

// ✅ Update specialization
export const editSpecialization = createAsyncThunk("specializations/edit", async ({ id, data }) => {
  return await updateSpecialization(id, data);
});

// ✅ Delete specialization
export const removeSpecialization = createAsyncThunk("specializations/delete", async (id) => {
  return await deleteSpecialization(id);
});

const specializationsSlice = createSlice({
  name: "specializations",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecializations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpecializations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSpecializations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSpecialization.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editSpecialization.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeSpecialization.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default specializationsSlice.reducer;
