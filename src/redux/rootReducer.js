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
import getMedicineClasstifyManagerReducer from "./manager/GetManagerMedineClassify/getManagerMedicineClassifySlice";
import { postManagerClasstify } from "./manager/CreateManagerClassify/createManagerClassifySlice";
import getDetailManagerClassifyReducer from "./manager/GetDetallManagerClassify/getDetailManagerClassifySlice";
import UpdateDetailClassifyManagerReducer from "./manager/UpdateDetailClassifyManager/updateDetailClassifyManagerSlice";
import deleteManagerMedicineClassifyReducer from "./manager/DeleteManagerClassify/deleteManagerMedicineClassifySlice";
import deleteMedicineManagerReducer from "./manager/DeleteManagerMedicine/deleteManagerMedicineSlice";
import getAllMedicineSupplyManagerReducer from "./manager/GetAllMedicineSupplyManager/getAllMedicineSupplyManagerSlice";
import managerCreateSupplyReducer from "./manager/CreateManagerSuppy/createManagerSupplySlice";
import managerUpdateSupplyReducer from "./manager/UpdateManagerSupply/updateManagerSupplySlice";
import deleteManagerSupplyReducer from "./manager/DeleteManagerSupply/deleteManagerSupplySlice";
import getAllRequestReducer from "./manager/GetAllRequest/getAllRequestSlice";
import getDetailRequestReducer from "./manager/GetDetailRequestManager/getDetailRequestManagerSlice";
import updateManagerSupplyReducer from "./manager/RejectRequestManager/rejectRequestManagerSlice";

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
  getMedicineClasstifyManager: getMedicineClasstifyManagerReducer,
  createManagerClasstify: postManagerClasstify,
  getDetailManagerClassify: getDetailManagerClassifyReducer,
  updateDetailClassifyManager: UpdateDetailClassifyManagerReducer,
  deleteManagerMedicineClassify: deleteManagerMedicineClassifyReducer,
  deleteMedicineManager: deleteMedicineManagerReducer,
  getAllMedicineSupplyManager: getAllMedicineSupplyManagerReducer,
  postmanagerCreateSupply: managerCreateSupplyReducer,
  patchManagerUpdateSupply: managerUpdateSupplyReducer,
  deleteManagerSupply: deleteManagerSupplyReducer,
  getAllRequest: getAllRequestReducer,
  getDetailRequest: getDetailRequestReducer,
  updateManagerSupply: updateManagerSupplyReducer,

  parentProfileHealth: healthProfileReducer,
});

export default rootReducer;
