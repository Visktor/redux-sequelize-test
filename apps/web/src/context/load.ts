import { createSlice } from "@reduxjs/toolkit";

const loadSlice = createSlice({
  name: "load",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    unsetLoading(state) {
      state.isLoading = false;
    },
  },
});

export { loadSlice };
