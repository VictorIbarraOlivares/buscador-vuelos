import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: {},
  error: {}
};

const detailSlice = createSlice({
  name: 'detailFlight',
  initialState,
  reducers: {
    getFlightStart(state) {
      state.isLoading = true;
    },
    getFlightError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getFlightComplete(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    }
  }
});

export const { getFlightStart, getFlightError, getFlightComplete } = detailSlice.actions;

// Actions creators
export const getFlightDetail = (flightOffer) => async (dispatch) => {
  try {
    dispatch( getFlightStart() );
    /**
     * Se puede utilizar la API para validar el precio del vuelo, es necesario utilizar post y enviar la oferta
     */
    
    console.log('flightOffer in Slice', flightOffer);

    dispatch( getFlightComplete(flightOffer) );
  } catch (error) {
    dispatch( getFlightError(error) );
  }
};

// selectors
export const isLoadingFlightDetail = (state) => state.detailFlight.isLoading;
export const flightDetailData = (state) => state.detailFlight.data;
export const flightDetailError = (state) => state.detailFlight.error;


export default detailSlice.reducer;