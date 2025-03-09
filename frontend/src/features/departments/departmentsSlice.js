import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDepartment, createDepartment, updateDepartment, deleteDepartment } from "./departmentsApi";


export const fetchDepartments = createAsyncThunk("departments/fetch", async () => {
  return await getDepartment();
});


export const addDepartment = createAsyncThunk("departments/add", async (data) => {
  return await createDepartment(data);
});


export const editDepartment = createAsyncThunk("departments/edit", async ({ id, data }) => {
  return await updateDepartment(id, data);
});


export const removeDepartment = createAsyncThunk("departments/delete", async (id) => {
  return await deleteDepartment(id);
});

const departmentsSlice = createSlice({
  name: "departments",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editDepartment.fulfilled, (state, action) => {
        const index = state.list.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeDepartment.fulfilled, (state, action) => {
        state.list = state.list.filter((d) => d.id !== action.payload);
      });
  },
});

export default departmentsSlice.reducer;
