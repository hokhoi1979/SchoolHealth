import { combineReducers } from "@reduxjs/toolkit";
import accountReducers from "./auth/authSlice";
import profileReducer from "./profileNurse/profileSlice";
import profileParentReducer from "./profileParent/profileSlice";
import studentOfParentReducer from "./profileParent/StudentOfParentSlice";
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
import medicineRequestReducer from "./medicineRequestNurse/getMedicineRequest/getMedicineRequestSlice";
import medicineDeTailRequestReducer from "./medicineRequestNurse/getDetailMedicineRequest/getMedicineDetailRequestSlice";
import rejectMedicineRequestReducer from "./medicineRequestNurse/rejectMedicineRequest/rejectMedicineRequestSlice";
import acceptMedicineRequestReducer from "./medicineRequestNurse/acceptMedicineRequest/acceptMedicineRequestSlice";
import receiveMedicineRequestReducer from "./medicineRequestNurse/receiveMedicineRequest/receiveMedicineRequestSlice";
import fetchMedicineScheduleReducer from "./materialsNurse/getMedicineSchedule/getMedicineScheduleSlice";
import giveMedicineStudentReducer from "./materialsNurse/giveMedicineStudent/giveMedicineStudentSlice";
import getLowStockReducer from "./materialsNurse/getLowStock/getLowStockSlice";
import patchQuantityStockReducer from "./materialsNurse/patchMedicineStock/patchMedicineStockSlice";
import registerReducer from "./register/registerSlice";

const rootReducer = combineReducers({
  account: accountReducers,
  accountRegister: registerReducer,
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
  medicineRequest: medicineRequestReducer,
  medicineDeTailRequest: medicineDeTailRequestReducer,
  rejectMedicineRequest: rejectMedicineRequestReducer,
  acceptMedicineRequest: acceptMedicineRequestReducer,
  receiveMedicineRequest: receiveMedicineRequestReducer,
  medicineSchedule: fetchMedicineScheduleReducer,
  giveMedicineStudent: giveMedicineStudentReducer,
  getLowStock: getLowStockReducer,
  patchQuantityStock: patchQuantityStockReducer,

  profileParent: profileParentReducer,
  studentOfParent: studentOfParentReducer,
  formParent: formParentReducer,
  healthStudent: healthStudentReducer,
  createHealthStudent: createHealthStudentReducer,
  updateHealthStudent: updateHealthStudentReducer,
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
  patchManagerConfirmVaccine: patchManagerConfirmVaccineReducer,
  deleteManagerVacine: managerDeleteVaccineReducer,
  createManagerMedicine: managerCreateMedicineReducer,
  getMedicineSupplyManager: getMedicineSupplyManagerReducer,

  parentProfileHealth: healthProfileReducer,
});

export default rootReducer;
