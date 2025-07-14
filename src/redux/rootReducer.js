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
import stopMedicineReducer from "./profileParent/medicalRequest/stopMedicineSlice";
import acceptBenefitMedicineReducer from "./profileParent/medicalRequest/acceptBenefitMedicineSlice";
import rejectBenefitMedicineReducer from "./profileParent/medicalRequest/rejectBenefitMedicineSlice";
import checkupParentReducer from "./getCheckupParent/getCheckupParentSlice";
import getCheckUpParentAcceptReducer from "./getCheckupParent/getCheckupParentAcceptSlice";
import getCheckUpParentDeclineReducer from "./getCheckupParent/getCheckupParentDeclineSlice";
import detailCheckUpParentReducer from "./getCheckupParent/getDetailCheckupParentSlice";
import resultCheckUpParentReducer from "./getCheckupParent/getResultCheckupParentSlice";
import meetingParentReducer from "./getMettingParent/getAllMettingParentSlice";
import getMeetingParentAcceptReducer from "./getMettingParent/getMeetingParentAcceptSlice";
import getMeetingParentDeclineReducer from "./getMettingParent/getMeetingParentDeclineSlice";

import managerMedicalReducer from "./manager/managerSlice";
import managerVaccineReducer from "./manager/createVaccineManagerSlice";
import getVaccineManagerReducer from "./manager/getVaccineManagerSlice";
import managerUpdateMedicalReducer from "./manager/updateVaccineManagerSlice";
import getClassManagerReducer from "./manager/getClassManagerSlice";
import patchManagerVaccineReducer from "./manager/successVaccineManagerSlice";

import vaccineResultReducer from "./vaccineNurse/vaccineResult/vaccineResultSlice";
import sendResultVaccineReducer from "./vaccineNurse/sendResult/sendResultSlice";
import updateVaccineReducer from "./vaccineNurse/updateVaccineResult/updateResultSlice";

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
import updateManagerSupplyReducer from "./manager/RejectRequestManager/rejectRequestManagerSlice";
import getAllMedicineNurseReducer from "./materialsNurse/getAllMedicine/getAllMedicineSlice";
import getRequestMedicineReducer from "./materialsNurse/getSendRequestMedicine/getRequestMedicineSlice";
import getMedicineSupplyReducer from "./materialsNurse/getMedicineSupplies/getMedicineSuppliesSlice";
import postRequestMedicineReducer from "./materialsNurse/sendRequestMedicineNurse/sendRequestMedicineSlice";
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
import rejectManagerMedicineSupplyReducer from "./manager/Reject/rejectMedicineSupplySlice";
import getManagerMedicalEventReducer from "./manager/ManagerMedicalEvent/managerMedicalEventSlice";
import getManagerMedicalEventDetailReducer from "./manager/ManagerMedicalEvent/managerMedicalEventDetailSlice";

import getProfileReducer from "./getProflie/getProfileSlice";
import changePasswordReducer from "./ChangePassword/changePasswordSlice";
import getDetailRequestManagerReducer from "./manager/GetDetailRequestManager/getDetailRequestManagerSlice";
import createAiChatReducer from "./AI_Chat/chatBoxSlice";
import getAllChatBoxAiReducer from "./AI_Chat/getChaxBoxSlice";
import getAllCheckupManagerReducer from "./MedicalCheckUpManager/GetAllCheckUpManager/getAllCheckUpManagerSlice";
import managerCheckupReducer from "./MedicalCheckUpManager/PostCheckUpManager/PostCheckUpManagerSlice";
import patchManagerConfirmCheckupReducer from "./MedicalCheckUpManager/ConfirmMedicalCheckupManager/confirmMedicalCheckupManagerSlice";
import endEventMedicalCheckUpManagerReducer from "./MedicalCheckUpManager/EndEventMedicalCheckUpManager/endEventMedicalCheckUpManagerSlice";
import deleteMedicalCheckupManagerReducer from "./MedicalCheckUpManager/DeleteMedicalCheckupManager/deleteMedicalCheckupManagerSlice";
import managerUpdateMedicalCheckupReducer from "./MedicalCheckUpManager/UpdateMedicalCheckupManager/updateMedicalCheckupManagerSlice";
import checkupReducer from "./checkupNurse/checkupDay/checkupSlice";
import checkupJoinReducer from "./checkupNurse/checkupJoin/checkupJoinSlice";
import fetchCheckupDetailResultReducer from "./checkupNurse/checkupDetailResult/checkupDetailResultSlice";
import postCheckupDetailResultReducer from "./checkupNurse/sendCheckupDetailResult/sendCheckupDetailResultSlice";
import studentCheckupReducer from "./checkupNurse/listStudentCheckup/listStudentCheckupSlice";
import checkupResultReducer from "./checkupNurse/resultCheckup/resultCheckupSlice";
import sendCheckupParentReducer from "./checkupNurse/sendCheckupToParent/sendCheckupParentSlice";

import studentDetailProfileReducer from "./getProflie/getProfileStudentSlice";
import getDetailCheckupManagerReducer from "./MedicalCheckUpManager/getDetailCheckUpManager/getDetailCheckUpManagerSlice";
import getDetailVaccineManagerReducer from "./manager/GetDetailVaccineManager/getDetailVaccineManagerSlice";
import stopProvideMedicineReducer from "./medicineRequestNurse/stopProvideMedicine/stopProvideMedicineSlice";
import studentMeetingReducer from "./checkupNurse/listStudentMeeting/listStudentMeetingSlice";
import checkScheduleReducer from "./checkupNurse/checkTime/checkTimeSlice";
import createMeetingReducer from "./checkupNurse/createMeeting/createMeetingSlice";
import meetedReducer from "./checkupNurse/meeted/meetedSlice";
import deleteMeetingReducer from "./checkupNurse/deleteMeeting/deleteMeetingSlice";
import deleteStudentReducer from "./checkupNurse/deleteStudent/deleteStudentSlice";

import getAllStudentReducer from "./admin/getAllStudentSlice";
import getAllAccountReducer from "./admin/getAllAccountSlice";
import detailAccountReducer from "./admin/getDetailAccountSlice";
import changeStatusUserReducer from "./admin/changeStatusUserSlice";
import createInformationStudentAdminReducer from "./admin/createStudentAdminSlice";

import medicalEventDashboardReducer, {
  medicalEventDashboard,
} from "./admin/getMedicalEventDashboardSlice";
import healthProfileDashboardReducer from "./admin/getHealthProfileDashboardSlice";

import completeMeetingReducer from "./checkupNurse/completeMeeting/completeMeetingSlice";
import getTotalStudentSlice from "./manager/GetTotalStudent/getTotalStudentSlice";
import updateParentReducer from "./profileParent/updateParentProfile/updateParentProfileSlice";

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
  checkupJoin: checkupJoinReducer,
  fetchCheckupDetailResult: fetchCheckupDetailResultReducer,
  postCheckupDetailResult: postCheckupDetailResultReducer,
  studentCheckup: studentCheckupReducer,
  sendCheckupParent: sendCheckupParentReducer,
  stopProvideMedicine: stopProvideMedicineReducer,
  studentMeeting: studentMeetingReducer,
  checkSchedule: checkScheduleReducer,
  createMeeting: createMeetingReducer,
  meeted: meetedReducer,
  deleteMeeting: deleteMeetingReducer,
  deleteStudent: deleteStudentReducer,
  completeMeeting: completeMeetingReducer,

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
  medicineRequestParent: getMedicineRequestReducer,
  createMedicineRequest: createMedicineReducer,
  deleteMedicineRequest: deleteMedicineReducer,
  getDetailRequestParent: getDetailRequestReducer,
  checkupResult: checkupResultReducer,
  stopMedicine: stopMedicineReducer,
  acceptBenefitMedicine: acceptBenefitMedicineReducer,
  rejectBenefitMedicine: rejectBenefitMedicineReducer,
  checkupParent: checkupParentReducer,
  checkupParentAccept: getCheckUpParentAcceptReducer,
  checkupParentDecline: getCheckUpParentDeclineReducer,
  detailCheckUpParent: detailCheckUpParentReducer,
  resultCheckUpParent: resultCheckUpParentReducer,
  meetingParent: meetingParentReducer,
  meetingParentAccept: getMeetingParentAcceptReducer,
  meetingParentDecline: getMeetingParentDeclineReducer,

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
  getDetailRequest: getDetailRequestManagerReducer,
  updateManagerSupply: updateManagerSupplyReducer,
  rejectManagerMedicineSupply: rejectManagerMedicineSupplyReducer,
  getManagerMedicalEvent: getManagerMedicalEventReducer,
  getManagerMedicalEventDetail: getManagerMedicalEventDetailReducer,
  createAiChat: createAiChatReducer,
  getAllChatBoxAi: getAllChatBoxAiReducer,
  getAllCheckupManager: getAllCheckupManagerReducer,
  postManagerCheckup: managerCheckupReducer,
  patchManagerConfirmCheckup: patchManagerConfirmCheckupReducer,
  endEventMedicalCheckUpManager: endEventMedicalCheckUpManagerReducer,
  deleteMedicalCheckupManager: deleteMedicalCheckupManagerReducer,
  managerUpdateMedicalCheckup: managerUpdateMedicalCheckupReducer,
  getDetailCheckupManager: getDetailCheckupManagerReducer,
  getDetailVaccineManager: getDetailVaccineManagerReducer,
  getTotalStudent: getTotalStudentSlice,

  //admin
  // getAllStudentAdmin: getAllStudentAdminReducer,
  // createInformationStudentAdmin: createInformationStudentAdminReducer,

  //
  parentProfileHealth: healthProfileReducer,
  updateParentProfile: updateParentReducer,

  //api student
  getProfile: getProfileReducer,
  changePassword: changePasswordReducer,
  getProfileStudent: studentDetailProfileReducer,

  //api admin
  getAllStudent: getAllStudentReducer,
  getAllAccount: getAllAccountReducer,
  getDetailAccount: detailAccountReducer,
  changeStatusUser: changeStatusUserReducer,
  createInformationStudentAdmin: createInformationStudentAdminReducer,
  getMedicalEventDashboard: medicalEventDashboardReducer,
  getHealthProfileDashboard: healthProfileDashboardReducer,
});

export default rootReducer;
