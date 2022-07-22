import { createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../api";

const initialState = {
  isLoading: false,
  data: [],
  error: {}
};

const resultsSlice = createSlice({
  name: 'resultsFlights',
  initialState,
  reducers: {
    searchFlightsStart(state) {
      state.isLoading = false;
    },
    searchFlightsError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    searchFlightsComplete(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    }
  }
});

export const { searchFlightsStart, searchFlightsError, searchFlightsComplete } = resultsSlice.actions;

// Actions creators
export const searchFlights = (searchParams, token) => async (dispatch) => {
  try {
    console.log('searchPArams faltan los otros parametros', searchParams);
    dispatch(searchFlightsStart());
    const response = await apiCall(
      `v2/shopping/flight-offers?originLocationCode=${searchParams.origen}&destinationLocationCode=${searchParams.destino}&departureDate=${searchParams.ida}&adults=${searchParams.adultos}&max=12&currencyCode=EUR`,
      // `v2/shopping/flight-offers?originLocationCode=${searchParams.origen}&destinationLocationCode=${searchParams.destino}&departureDate=2022-11-01&adults=${searchParams.adultos}&currencyCode=EUR`,
      token
    );
    console.log('Action Creator(resultsSlice) response', response);
    dispatch(searchFlightsComplete(response?.data?.data));
  } catch (error) {
    dispatch(searchFlightsError(error));
  }
};

// selectors
export const isLoadingResultsFlights = (state) => state.resultsFlights.isLoading;
export const resultsFlightsError = (state) => state.resultsFlights.error;
export const resultsFlightsData = (state) => state.resultsFlights.data;

export default resultsSlice.reducer;