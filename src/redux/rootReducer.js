import { combineReducers } from "@reduxjs/toolkit";
import accountReducers from "./auth/authSlice";
import profileReducer from "./profileNurse/profileSlice";

//api parent
import studentOfParentReducer from "./profileParent/StudentOfParentSlice";
import parentHealthProfileReducer from "./profileParent/parentGetHealth/parentGetHealthSlice";
import formParentReducer from "./profileParent/formSlice";
import healthStudentReducer from "./profileParent/HealthByIdSlice";
import createHealthStudentReducer from "./profileParent/createHealthSlice";
import updateHealthReducer from "./profileParent/updateHealthSlice";
import vaccineParentReducer from "./getVaccineParent/getVaccineParentSlice";
import vaccineParentResultReducer from "./getVaccineParent/getVaccineParentResultSlice";
import getVaccineParentAcceptReducer from "./getVaccineParent/getVaccineParentAcceptSlice";
import getVaccineParentDeclineReducer from "./getVaccineParent/getVaccineParentDeclineSlice";
import getMedicineRequestReducer from "./profileParent/medicalRequest/MedicineRequestSlice";
import createMedicineReducer from "./profileParent/medicalRequest/createMedicineSlice";
import deleteMedicineReducer from "./profileParent/medicalRequest/deleteMedicineSlice";
import getDetailRequestReducer from "./profileParent/medicalRequest/getDetailRequestSlice";

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
import patchManagerConfirmVaccineReducer, {
  patchManagerConfirmVaccine,
} from "./manager/ConfirmVaccineManager/ConfirmVaccineManagerSlice";
import vaccineStudentReducer from "./vaccineNurse/vaccineById/vaccineByIdSlice";
import vaccineReducer from "./vaccineNurse/vaccine/vaccineSlice";

import healthProfileReducer from "./profileParent/profileSlice";
import managerDeleteVaccineReducer from "./manager/DeleteVaccineEvent/deleteVaccineEventSlice";
import managerCreateMedicineReducer from "./manager/CreateManagerMedicine/createManagerMedicineSlice";
import getMedicineSupplyManagerReducer from "./manager/GetMedicineAndSupplyManager/getMedicineAndSupplyManagerSlice";
import getAllMedicineNurseReducer from "./materialsNurse/getAllMedicine/getAllMedicineSlice";
import getRequestMedicineReducer from "./materialsNurse/getSendRequestMedicine/getRequestMedicineSlice";
import getMedicineSupplyReducer from "./materialsNurse/getMedicineSupplies/getMedicineSuppliesSlice";
import postRequestMedicineReducer from "./materialsNurse/sendRequestMedicineNurse/sendRequestMedicineSLice";
import getRequestDetailReducer from "./materialsNurse/getDetailRequest/getDetailRequestSlice";
import getMedicalEventNurseReducer from "./medicalEventNurse/medicalEvent/getMedicalEventSlice";
import getMedicalEventDetailReducer from "./medicalEventNurse/medicalDetailEvent/getMedicalEventDetailSlice";
import createMedicalEventReducer from "./medicalEventNurse/createMedicalEvent/createMedicalEventSlice";
import sendMedicalEnventReducer from "./medicalEventNurse/sendMedicalEvent/sendMedicalEventSlice";
import hospitalEventReducer from "./medicalEventNurse/editHospitalEvent/editHospitalEventSlice";
import postMedicineEventReducer from "./medicalEventNurse/createMedicineEvent/createMedicineEventSlice";
import deleteMedicalEventReducer from "./medicalEventNurse/deleteMedicalEvent/deleteMedicalEventSlice";

import getProfileReducer from "./getProflie/getProfileSlice";
import changePasswordReducer from "./ChangePassword/changePasswordSlice";

const rootReducer = combineReducers({
  account: accountReducers,
  profile: profileReducer,
  vaccine: vaccineReducer,
  vaccineStudent: vaccineStudentReducer,
  medicineNurse: getAllMedicineNurseReducer,
  requestMedicine: getRequestMedicineReducer,
  getMedicineSupplyNurse: getMedicineSupplyReducer,
  postRequestMedicine: postRequestMedicineReducer,
  getRequestDetailNurse: getRequestDetailReducer,
  getMedicalEventNurse: getMedicalEventNurseReducer,
  getMedicalEventDetailNurse: getMedicalEventDetailReducer,
  postMedicalEventNurse: createMedicalEventReducer,
  sendMedicalEnventNurse: sendMedicalEnventReducer,
  hospitalEvent: hospitalEventReducer,
  postMedicineEvent: postMedicineEventReducer,
  deleteMedicalEvent: deleteMedicalEventReducer,

  //api parent
  studentOfParent: studentOfParentReducer,
  healthParentProfile: parentHealthProfileReducer,
  formParent: formParentReducer,
  healthStudent: healthStudentReducer,
  createHealthStudent: createHealthStudentReducer,
  updateHealthStudent: updateHealthReducer,
  vaccineParent: vaccineParentReducer,
  vaccineParentResult: vaccineParentResultReducer,
  vaccineParentAccept: getVaccineParentAcceptReducer,
  vaccineParentDecline: getVaccineParentDeclineReducer,
  medicineRequest: getMedicineRequestReducer,
  createMedicineRequest: createMedicineReducer,
  deleteMedicineRequest: deleteMedicineReducer,
  getDetailRequest: getDetailRequestReducer,

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
  patchManagerConfirmVaccine: patchManagerConfirmVaccineReducer,
  deleteManagerVacine: managerDeleteVaccineReducer,
  createManagerMedicine: managerCreateMedicineReducer,
  getMedicineSupplyManager: getMedicineSupplyManagerReducer,

  parentProfileHealth: healthProfileReducer,

  getProfile: getProfileReducer,
  changePassword: changePasswordReducer,
});

export default rootReducer;
