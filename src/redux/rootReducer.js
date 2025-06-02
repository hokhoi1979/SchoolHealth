import { combineReducers } from "@reduxjs/toolkit";
import accountReducers from "./auth/authSlice";


const rootReducer = combineReducers({
  account: accountReducers,

});

export default rootReducer;
