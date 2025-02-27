import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSpecialisations,
  createSpecialisation,
  updateSpecialisation,
  deleteSpecialisation,
} from "../../api/specialisationsApi";

// ✅ Fetch specializations
export const fetchSpecialisations = createAsyncThunk("specialisations/fetch", async () => {
  return await getSpecialisations();
});

// ✅ Add specialization
export const addSpecialisation = createAsyncThunk("specialisations/add", async (data) => {
  return await createSpecialisation(data);
});

// ✅ Update specialization
export const editSpecialisation = createAsyncThunk("specialisations/edit", async ({ id, data }) => {
  return await updateSpecialisation(id, data);
});

// ✅ Delete specialization
export const removeSpecialisation = createAsyncThunk("specialisations/delete", async (id) => {
  return await deleteSpecialisation(id);
});

const specialisationsSlice = createSlice({
  name: "specialisations",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialisations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpecialisations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSpecialisations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSpecialisation.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editSpecialisation.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeSpecialisation.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default specialisationsSlice.reducer;
