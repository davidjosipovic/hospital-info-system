import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as roomsApi from './roomsApi';

// Async Thunks
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  return await roomsApi.getRooms();
});

export const addRoom = createAsyncThunk('rooms/addRoom', async (roomData) => {
  return await roomsApi.createRoom(roomData);
});

export const editRoom = createAsyncThunk('rooms/editRoom', async ({ id, roomData }) => {
  return await roomsApi.updateRoom(id, roomData);
});

export const removeRoom = createAsyncThunk('rooms/removeRoom', async (id) => {
  await roomsApi.deleteRoom(id);
  return id;
});

// Slice
const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch rooms
      .addCase(fetchRooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add room
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      })
      // Edit room
      .addCase(editRoom.fulfilled, (state, action) => {
        const index = state.rooms.findIndex((room) => room.id === action.payload.id);
        if (index !== -1) {
          state.rooms[index] = action.payload; // Replace the room with the updated one
        }
      })
      // Remove room
      .addCase(removeRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      });
  },
});

export default roomsSlice.reducer;
