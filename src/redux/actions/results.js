import { apiCall } from "../../api";

export const SEARCH_FLIGHTS_START = 'SEARCH_FLIGHTS_START';
export const SEARCH_FLIGHTS_COMPLETE = 'SEARCH_FLIGHTS_COMPLETE';
export const SEARCH_FLIGHTS_ERROR = 'SEARCH_FLIGHTS_ERROR';

export const searchFlightsStart = () => ({
  type: SEARCH_FLIGHTS_START
});

const searchFlightsComplete = (payload) => ({
  type: SEARCH_FLIGHTS_COMPLETE,
  payload
});

const searchFlightsError = (error) => ({
  type: SEARCH_FLIGHTS_ERROR,
  error
});

// Action Creator (redux thunk , ver como obtener el token desde el estado con getState ?)
export const searchFlights = (searchParams, token) => async (dispatch) => {
  try {
    console.log('searchPArams faltan los otros parametros', searchParams);
    dispatch(searchFlightsStart());
    const response = await apiCall(
      `v2/shopping/flight-offers?originLocationCode=${searchParams.origen}&destinationLocationCode=${searchParams.destino}&departureDate=${searchParams.ida}&adults=${searchParams.adultos}&max=12&currencyCode=EUR`,
      // `v2/shopping/flight-offers?originLocationCode=${searchParams.origen}&destinationLocationCode=${searchParams.destino}&departureDate=2022-11-01&adults=${searchParams.adultos}&currencyCode=EUR`,
      token
    );
    console.log('Action Creator(searchFlights) response', response);
    dispatch(searchFlightsComplete(response?.data?.data));
  } catch (error) {
    dispatch(searchFlightsError(error));
  }
};