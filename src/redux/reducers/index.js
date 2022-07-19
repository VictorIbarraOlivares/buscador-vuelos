import { combineReducers } from "@reduxjs/toolkit";
import results from "./results";
import detailReducer from "./detail,js";

export default combineReducers({
  results,
  detailReducer
});