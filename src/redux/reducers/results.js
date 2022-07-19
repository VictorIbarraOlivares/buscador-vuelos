import {
  SEARCH_FLIGHTS_COMPLETE,
  SEARCH_FLIGHTS_ERROR,
  SEARCH_FLIGHTS_START
} from "../actions/results";

const initialState = {
  isLoading: false,
  data: [],
  error: {}
};

const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_FLIGHTS_START:
      return { ...state, isLoading: true, data: [] };
    case SEARCH_FLIGHTS_COMPLETE:
      return { ...state, isLoading: false, data: action.payload };
    case SEARCH_FLIGHTS_ERROR:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default resultsReducer;