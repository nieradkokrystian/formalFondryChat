import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  limitTo100: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleLimitTo100(state) {
      state.limitTo100 = !state.limitTo100;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
