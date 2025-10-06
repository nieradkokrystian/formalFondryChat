import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAvTags, fetchLogs } from "../../api/logs";

export const getLogs = createAsyncThunk(
  "log/getLogs",
  async (taskId, { getState }) => {
    const { filters } = getState().log;
    const logs = await fetchLogs(taskId, filters);
    return logs;
  }
);

export const getAvTags = createAsyncThunk("log/getAvTags", async (taskId) => {
  const avTags = await fetchAvTags(taskId);
  return avTags;
});

const initialState = {
  logs: [],
  avTags: [],
  filters: {
    level: 20,
    tags: [],
    sortOrder: "desc",
  },
  isLoadingLogs: false,
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    setLevelFilter(state, action) {
      state.filters.level = action.payload;
    },
    setTagFilter(state, action) {
      const tag = action.payload;
      if (state.filters.tags.includes(tag)) {
        state.filters.tags = state.filters.tags.filter((t) => t !== tag);
      } else {
        state.filters.tags.push(tag);
      }
    },
    setSortOrder(state, action) {
      state.filters.sortOrder = action.payload;
    },
    resetLogFilters(state) {
      state.filters = {
        level: 20,
        tags: [],
        sortOrder: "desc",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogs.pending, (state) => {
        state.isLoadingLogs = true;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.isLoadingLogs = false;
        state.logs = action.payload;
      })
      .addCase(getLogs.rejected, (state) => {
        state.isLoadingLogs = false;
      });

    builder.addCase(getAvTags.fulfilled, (state, action) => {
      state.avTags = action.payload;
    });
  },
});

export const logActions = logSlice.actions;
export default logSlice.reducer;
