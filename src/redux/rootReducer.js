import { combineReducers } from "@reduxjs/toolkit";
import accountReducers from "./auth/authSlice";
import profileReducer from "./profileNurse/profileSlice";
import vaccineReducer from "./vaccineNurse/vaccine/vaccineSlice";
import vaccineStudentReducer from "./vaccineNurse/vaccineById/vaccineByIdSlice";
import vaccineResultReducer from "./vaccineNurse/vaccineResult/vaccineResultSlice";
import sendResultVaccineReducer from "./vaccineNurse/sendResult/sendResultSlice";
import updateVaccineReducer from "./vaccineNurse/updateVaccineResult/updateResultSlice";
import checkupReducer from "./checkupNurse/checkupSlice";
import profileDetailReducer from "./vaccineNurse/profileDetail/profileStudentSlice";





const rootReducer = combineReducers({
  account: accountReducers,
  profile:profileReducer,
  vaccine:vaccineReducer,
  vaccineStudent:vaccineStudentReducer,
  vaccineResult: vaccineResultReducer,
  sendVaccineResult: sendResultVaccineReducer,
  checkupNurse:checkupReducer,
  updateVaccineResult:updateVaccineReducer,
  fetchProfileDetail: profileDetailReducer,
});

export default rootReducer;
