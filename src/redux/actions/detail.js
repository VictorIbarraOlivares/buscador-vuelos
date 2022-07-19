export const GET_FLIGHT_DETAIL_START = 'GET_FLIGHT_DETAIL_START';
export const GET_FLIGHT_DETAIL_COMPLETE = 'GET_FLIGHT_DETAIL_COMPLETE';
export const GET_FLIGHT_DETAIL_ERROR = 'GET_FLIGHT_DETAIL_ERROR';

export const getFlightStart = () => ({
  type: GET_FLIGHT_DETAIL_START
});

const getFlightComplete = (payload) => ({
  type: GET_FLIGHT_DETAIL_COMPLETE,
  payload
});

const getFlightError = (error) => ({
  type: GET_FLIGHT_DETAIL_ERROR,
  error
});

export const getFlighTDetail = (flightOffer) => async (dispatch) => {
  try {
    dispatch(getFlightStart());
    // ejecutar api para obtener la data de un flight offer
    /**
     * Se puede utilizar la API para validar el precio del vuelo, es necesario utilizar post y enviar la oferta
     */
    console.log('flightOffer', flightOffer);
    // console.log('action', action);
    dispatch(getFlightComplete(flightOffer));
  } catch (error) {
    dispatch(getFlightError(error));
  }
};