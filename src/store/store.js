import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasksSlice";
import uiReducer from "./features/uiSlice";
import chatReducer from "./features/chatSlice.js";
import logReducer from "./features/logSlice.js";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    ui: uiReducer,
    chat: chatReducer,
    log: logReducer,
  },
});

export default store;
