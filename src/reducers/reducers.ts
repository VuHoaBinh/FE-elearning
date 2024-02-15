import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import questionReducer from "./questionSlice";
import toggleShow from "./toggleSlice";

const reducers = combineReducers({
  auth: authReducer,
  question: questionReducer,
  toggle: toggleShow,
});

export default reducers;
