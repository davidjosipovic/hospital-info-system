import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as scheduleApi from './scheduleApi';


export const fetchSchedules = createAsyncThunk('schedules/fetchSchedules', async () => {
  return await scheduleApi.getSchedules();
});

export const addSchedule = createAsyncThunk('schedules/addSchedule', async (scheduleData) => {
  return await scheduleApi.createSchedule(scheduleData);
});

export const updateSchedule = createAsyncThunk('schedules/updateSchedule', async ({ id, scheduleData }) => {
  return await scheduleApi.updateSchedule(id, scheduleData); 
});

export const removeSchedule = createAsyncThunk('schedules/removeSchedule', async (id) => {
  await scheduleApi.deleteSchedule(id);
  return id;
});


const scheduleSlice = createSlice({
  name: 'schedules',
  initialState: {
    schedules: [], 
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addSchedule.fulfilled, (state, action) => {
        state.schedules.push(action.payload);
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        const updatedSchedule = action.payload;  
      
        const index = state.schedules.findIndex((schedule) => schedule.id === updatedSchedule.id);
      
        if (index !== -1) {
          state.schedules[index] = updatedSchedule;  
        } else {
          console.error("Schedule not found for update:", updatedSchedule);
        }
      })
      
      .addCase(removeSchedule.fulfilled, (state, action) => {
        state.schedules = state.schedules.filter((schedule) => schedule.id !== action.payload);
      });
  },
});

export default scheduleSlice.reducer;
