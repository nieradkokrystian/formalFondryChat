import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../../api/tasks";

const initialState = {
  tasks: [],
};

export const getTasks = createAsyncThunk("getTasks", async (userId) => {
  const tasks = await fetchTasks(userId);
  return tasks;
});

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
