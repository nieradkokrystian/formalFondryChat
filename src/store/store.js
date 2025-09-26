import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasksSlice";
import uiReducer from "./features/uiSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    ui: uiReducer,
  },
});

export default store;
