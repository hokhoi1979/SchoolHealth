import { combineReducers } from "@reduxjs/toolkit";
import accountReducers from "./auth/authSlice";
import profileReducer from "./profileNurse/profileSlice";
import vaccineReducer from "./vaccine/vaccineSlice";
import vaccineStudentReducer from "./vaccine/vaccineByIdSlice";


const rootReducer = combineReducers({
  account: accountReducers,
  profile:profileReducer,
  vaccine:vaccineReducer,
  vaccineStudent:vaccineStudentReducer,
});

export default rootReducer;
