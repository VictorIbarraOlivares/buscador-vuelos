import { combineReducers } from "@reduxjs/toolkit";
import detailFlight from "../slices/detail";
import resultsFlights from "../slices/results";

export default combineReducers({
  detailFlight,
  resultsFlights
});