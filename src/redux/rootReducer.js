import { combineReducers } from "@reduxjs/toolkit";
import accountReducers from "./auth/authSlice";
import profileReducer from "./profileNurse/profileSlice";
import vaccineReducer from "./vaccine/vaccineSlice";
import vaccineStudentReducer from "./vaccine/vaccineByIdSlice";
import profileParentReducer from "./profileParent/profileSlice";
import studentOfParentReducer from "./profileParent/StudentOfParentSlice";
import formParentReducer from "./profileParent/formSlice";
import healthStudentReducer from "./profileParent/HealthByIdSlice";
import createHealthStudentReducer from "./profileParent/createHealthSlice";
import updateHealthStudentReducer from "./profileParent/updateHealthSlice";

const rootReducer = combineReducers({
  account: accountReducers,
  profile: profileReducer,
  vaccine: vaccineReducer,
  vaccineStudent: vaccineStudentReducer,
  profileParent: profileParentReducer,
  studentOfParent: studentOfParentReducer,
  formParent: formParentReducer,
  healthStudent: healthStudentReducer,
  createHealthStudent: createHealthStudentReducer,
  updateHealthStudent: updateHealthStudentReducer,
});

export default rootReducer;
