import { combineReducers } from "@reduxjs/toolkit";
// Reducers
import results from "./results";
import detailReducer from "./detail,js";

// Slices
import detailFlight from "../slices/detail";

export default combineReducers({
  results,
  detailReducer,
  detailFlight
});