import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRoomAssignments, createRoomAssignment, updateRoomAssignment, deleteRoomAssignment } from './RoomAssignmentsApi';

export const getRoomAssignments = createAsyncThunk(
  'roomAssignments/getRoomAssignments',
  async (_, thunkAPI) => {
    return await fetchRoomAssignments();
  }
);

export const addRoomAssignment = createAsyncThunk(
  'roomAssignments/addRoomAssignment',
  async (assignment, thunkAPI) => {
    return await createRoomAssignment(assignment);
  }
);

export const editRoomAssignment = createAsyncThunk(
  'roomAssignments/editRoomAssignment',
  async ({ id, assignment }, thunkAPI) => {
    return await updateRoomAssignment(id, assignment);
  }
);

export const removeRoomAssignment = createAsyncThunk(
  'roomAssignments/removeRoomAssignment',
  async (id, thunkAPI) => {
    await deleteRoomAssignment(id);
    return id;
  }
);

const roomAssignmentsSlice = createSlice({
  name: 'roomAssignments',
  initialState: {
    assignments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoomAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoomAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(getRoomAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRoomAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
      })
      .addCase(editRoomAssignment.fulfilled, (state, action) => {
        const idx = state.assignments.findIndex(a => a.id === action.payload.id);
        if (idx !== -1) state.assignments[idx] = action.payload;
      })
      .addCase(removeRoomAssignment.fulfilled, (state, action) => {
        state.assignments = state.assignments.filter(a => a.id !== action.payload);
      });
  },
});

export default roomAssignmentsSlice.reducer;
