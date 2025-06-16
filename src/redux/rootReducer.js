import { combineReducers } from "@reduxjs/toolkit";
import accountReducers from "./auth/authSlice";
import profileReducer from "./profileNurse/profileSlice";

//api parent
import studentOfParentReducer from "./profileParent/StudentOfParentSlice";
import parentHealthProfileReducer from "./profileParent/parentGetHealth/parentGetHealthSlice";
import formParentReducer from "./profileParent/formSlice";
import healthStudentReducer from "./profileParent/HealthByIdSlice";
import createHealthStudentReducer from "./profileParent/createHealthSlice";
import updateHealthStudentReducer from "./profileParent/updateHealthSlice";
import vaccineParentReducer from "./getVaccineParent/getVaccineParentSlice";
import vaccineParentResultReducer from "./getVaccineParent/getVaccineParentResultSlice";

import managerMedicalReducer from "./manager/managerSlice";
import managerVaccineReducer from "./manager/createVaccineManagerSlice";
import getVaccineManagerReducer from "./manager/getVaccineManagerSlice";
import managerUpdateMedicalReducer from "./manager/updateVaccineManagerSlice";
import getClassManagerReducer from "./manager/getClassManagerSlice";
import patchManagerVaccineReducer from "./manager/successVaccineManagerSlice";

import vaccineResultReducer from "./vaccineNurse/vaccineResult/vaccineResultSlice";
import sendResultVaccineReducer from "./vaccineNurse/sendResult/sendResultSlice";
import updateVaccineReducer from "./vaccineNurse/updateVaccineResult/updateResultSlice";
import checkupReducer from "./checkupNurse/checkupSlice";
import profileDetailReducer from "./vaccineNurse/profileDetail/profileStudentSlice";
import vaccineStudentReducer from "./vaccineNurse/vaccineById/vaccineByIdSlice";
import vaccineReducer from "./vaccineNurse/vaccine/vaccineSlice";
import updateHealthReducer from "./profileParent/updateHealthSlice";

const rootReducer = combineReducers({
  account: accountReducers,
  profile: profileReducer,
  vaccine: vaccineReducer,
  vaccineStudent: vaccineStudentReducer,

  //api parent
  studentOfParent: studentOfParentReducer,
  healthParentProfile: parentHealthProfileReducer,
  formParent: formParentReducer,
  healthStudent: healthStudentReducer,
  createHealthStudent: createHealthStudentReducer,
  updateHealthStudent: updateHealthReducer,
  vaccineParent: vaccineParentReducer,
  vaccineParentResult: vaccineParentResultReducer,

  vaccineResult: vaccineResultReducer,
  sendVaccineResult: sendResultVaccineReducer,
  checkupNurse: checkupReducer,
  updateVaccineResult: updateVaccineReducer,
  fetchProfileDetail: profileDetailReducer,

  managerMedical: managerMedicalReducer,
  managerVaccine: managerVaccineReducer,
  getmanagerVaccine: getVaccineManagerReducer,
  putManagerVaccine: managerUpdateMedicalReducer,
  getManagerClass: getClassManagerReducer,
  patchManagerVaccine: patchManagerVaccineReducer,
});

export default rootReducer;
