import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  isLogView: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSidebar(state) {
      state.isSidebarOpen = true;
    },
    closeSidebar(state) {
      state.isSidebarOpen = false;
    },
    setLogView(state) {
      state.isLogView = true;
    },
    disableLogView(state) {
      state.isLogView = false;
    },
    toggleLogView(state) {
      state.isLogView = !state.isLogView;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
