import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTasks(state, action) {
      state.tasks = action.payload;
    },
  },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
