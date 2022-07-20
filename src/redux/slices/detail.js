import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: {},
  error: {}
}

const detailSlice = createSlice({
  name: 'detailFlight',
  initialState,
  reducers: {
    getFlightStart(state) {
      state.isLoading = true;
    },
    getFlightError(state, payload) {
      state.isLoading = false;
      state.error = payload;
    },
    getFlightComplete(state, payload) {
      state.isLoading = false;
      state.data = payload;
    }
  }
});

export const { getFlightStart, getFlightError, getFlightComplete } = detailSlice.actions;
export default detailSlice.reducer;