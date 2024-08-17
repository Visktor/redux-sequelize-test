import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appFetch } from "#/lib/fetch/api";

interface ApiState {
  loading: "idle" | "pending" | "failure";
  data: any[];
}

const initialState: ApiState = {
  loading: "idle",
  data: [],
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    start: (state) => {
      state.loading = "pending";
    },
    success: (state, action) => {
      state.loading = "idle";
      state.data = action.payload;
    },
    failure: (state) => {
      state.loading = "failure";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default apiSlice.reducer;

export const { start, success, failure } = apiSlice.actions;

const fetchDataAsync = createAsyncThunk("api/fetchData", async () => {
  const response = await appFetch.get<any[]>(
    "https://jsonplaceholder.typicode.com/posts",
  );
  if (!response.success) {
    throw response.error;
  }

  return response.data;
});
