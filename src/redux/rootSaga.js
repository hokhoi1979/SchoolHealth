// rootSaga.js
import { all } from "redux-saga/effects";

// ===== Common =====
import watchFetchLogin from "./auth/authSaga";
import watchRegister from "./register/registerSaga";
import watchGetProfileSaga from "./getProflie/getProfileSaga";
import watchFetchChangePassword from "./ChangePassword/changePasswordSaga";

// ===== Parent =====
import watchHealthProfileSaga from "./profileParent/profileSaga";
import watchFetchStudentOfParent from "./profileParent/StudentOfParentSaga";
import watchFetchParentForm from "./profileParent/formSaga";
import watchFetchHealthStudent from "./profileParent/HealthByIdSaga";
import watchFetchCreateHealth from "./profileParent/createHealthSaga";
import watchFetchUpdateHealth from "./profileParent/updateHealthSaga";
import watchFetchParentHealth from "./profileParent/parentGetHealth/parentGetHealthSaga";
import watchFetchVaccineParent from "./getVaccineParent/getVaccineParentSaga";
import watchFetchVaccineParentResult from "./getVaccineParent/getVaccineParentResultSaga";
import watchFetchAcceptVaccine from "./getVaccineParent/getVaccineParentAcceptSaga";
import watchFetchDeclineVaccine from "./getVaccineParent/getVaccineParentDeclineSaga";
import watchFetchMedicineRequest from "./profileParent/medicalRequest/MedicineRequestSaga";
import watchFetchCreateMedicine from "./profileParent/medicalRequest/createMedicineSaga";
import watchFetchDeleteMedicine from "./profileParent/medicalRequest/deleteMedicineSaga";
import watchFetchDetailRequest from "./profileParent/medicalRequest/getDetailRequestSaga";
import watchFetchStopMedicines from "./profileParent/medicalRequest/stopMedicineSaga";
import watchFetchAcceptBenefit from "./profileParent/medicalRequest/acceptBenefitMedicineSaga";
import watchFetchRejectBenefit from "./profileParent/medicalRequest/rejectBenefitMedicineSaga";
import watchFetchCheckUpParent from "./getCheckupParent/getCheckupParentSaga";
import watchFetchAcceptCheckUp from "./getCheckupParent/getCheckupParentAcceptSaga";
import watchFetchDeclineCheckUp from "./getCheckupParent/getCheckupParentDeclineSaga";
import watchFetchDetailCheckUpParent from "./getCheckupParent/getDetailCheckupParentSaga";
import watchFetchResultCheckUpParent from "./getCheckupParent/getResultCheckupParentSaga";

// ===== Nurse =====
import watchFetchProfile from "./profileNurse/profileSaga";
import watchFetchVaccine from "./vaccineNurse/vaccine/vaccineSaga";
import watchFetchVaccineStudent from "./vaccineNurse/vaccineById/vaccineByIdSaga";
import watchFetchVaccineResult from "./vaccineNurse/vaccineResult/vaccineResultSaga";
import watchPostResultSaga from "./vaccineNurse/sendResult/sendResultSaga";
import watchUpdateVaccineResult from "./vaccineNurse/updateVaccineResult/updateResultSaga";
import watchFetchProfileDetail from "./vaccineNurse/profileDetail/profileStudentSaga";
import watchFetchAllMedicine from "./materialsNurse/getAllMedicine/getAllMedicineSaga";
import watchFetchRequestMedicine from "./materialsNurse/getSendRequestMedicine/getRequestMedicineSaga";
import watchFetchMedicineSupply from "./materialsNurse/getMedicineSupplies/getMedicineSuppliesSaga";
import watchPostRequestMedicine from "./materialsNurse/sendRequestMedicineNurse/sendRequestMedicineSaga";
import watchFetchRequestDetailSaga from "./materialsNurse/getDetailRequest/getDetailRequestSaga";
import watchFetchMedicineRequestNurse from "./medicineRequestNurse/getMedicineRequest/getMedicineRequestSaga";
import watchFetchMedicineDetailRequest from "./medicineRequestNurse/getDetailMedicineRequest/getMedicineDetailRequestSaga";
import watchRejectMedicineRequest from "./medicineRequestNurse/rejectMedicineRequest/rejectMedicineRequestSaga";
import watchAcceptMedicineRequest from "./medicineRequestNurse/acceptMedicineRequest/acceptMedicineRequestSaga";
import watchReceiveMedicineRequest from "./medicineRequestNurse/receiveMedicineRequest/receiveMedicineRequestSaga";
import watchFetchMedicineSchedule from "./materialsNurse/getMedicineSchedule/getMedicineScheduleSaga";
import watchGiveMedicineStudent from "./materialsNurse/giveMedicineStudent/giveMedicineStudentSaga";
import watchFetchLowStock from "./materialsNurse/getLowStock/getLowStockSaga";
import watchPatchQuantityStock from "./materialsNurse/patchMedicineStock/patchMedicineStockSaga";
import watchFetchMedicalEvent from "./medicalEventNurse/medicalEvent/getMedicalEventSaga";
import watchFetchMedicalEventDetail from "./medicalEventNurse/medicalDetailEvent/getMedicalEventDetailSaga";
import watchPostMedicalEvent from "./medicalEventNurse/createMedicalEvent/createMedicalEventSaga";
import watchSendMedicalEvent from "./medicalEventNurse/sendMedicalEvent/sendMedicalEventSaga";
import watchPatchHospitalEvent from "./medicalEventNurse/editHospitalEvent/editHospitalEventSaga";
import watchCreateMedicineEvent from "./medicalEventNurse/createMedicineEvent/createMedicineEventSaga";
import watchDeleteMedicalEvent from "./medicalEventNurse/deleteMedicalEvent/deleteMedicalEventSaga";
import watchFetchCheckup from "./checkupNurse/checkupDay/checkupSaga";
import watchCheckupJoin from "./checkupNurse/checkupJoin/checkupJoinSaga";
import watchCheckupDetailResult from "./checkupNurse/checkupDetailResult/checkupDetailResultSaga";
import watchPostCheckupResult from "./checkupNurse/sendCheckupDetailResult/sendCheckupDetailResultSaga";
import watchFetchStudentCheckup from "./checkupNurse/listStudentCheckup/listStudentCheckupSaga";
import watchFetchCheckupResult from "./checkupNurse/resultCheckup/resultCheckupSaga";
import watchSendCheckupParent from "./checkupNurse/sendCheckupToParent/sendCheckupParentSaga";

// ===== Manager =====
import watchFetchManagerMedical from "./manager/managerSaga";
import watchPostManagerVaccine from "./manager/createVaccineManagerSaga";
import watchFetchVaccineManager from "./manager/getVaccineManagerSaga";
import watchPutVaccineManager from "./manager/updateVaccineManagerSage";
import watchFetchClassManager from "./manager/getClassManagerSaga";
import watchPatchVaccineManager from "./manager/successVaccineManagerSaga";
import watchPatchVaccineConfirmManager from "./manager/ConfirmVaccineManager/ConfirmVaccineManagerSaga";
import watchDeleteManagerVaccine from "./manager/DeleteVaccineEvent/deleteVaccineEventSaga";
import watchPostManagerMedicine from "./manager/CreateManagerMedicine/createManagerMedicineSaga";
import watchFetchMedicineSuppplyManager from "./manager/GetMedicineAndSupplyManager/getMedicineAndSupplyManagerSaga";
import watchFetchMedicineClasstifyManager from "./manager/GetManagerMedineClassify/getManagerMedicineClassifySaga";
import watchPostManagerClasstify from "./manager/CreateManagerClassify/createManagerClassifySaga";
import watchFetchDetailManagerClassify from "./manager/GetDetallManagerClassify/getDetailManagerClassifySaga";
import watchPutClassifyManager from "./manager/UpdateDetailClassifyManager/updateDetailClassifyManagerSaga";
import watchDeleteManagerMedicineClassify from "./manager/DeleteManagerClassify/deleteManagerMedicineClassifySaga";
import watchDeleteMedicineManager from "./manager/DeleteManagerMedicine/DeleteManagerMedicineSaga";
import watchFetchAllMedicineSupplyManager from "./manager/GetAllMedicineSupplyManager/getAllMedicineSupplyManagerSaga";
import watchPostManagerSupply from "./manager/CreateManagerSuppy/createManagerSupplySaga";
import watchPutManagerSupply from "./manager/UpdateManagerSupply/updateManagerSupplySaga";
import watchDeleteManagerSupply from "./manager/DeleteManagerSupply/deleteManagerSupplySaga";
import watchFetchAllRequest from "./manager/GetAllRequest/getAllRequestSaga";
import watchFetchDetailRequestManager from "./manager/GetDetailRequestManager/getDetailRequestManagerSaga";
import watchUpdateManagerSupply from "./manager/RejectRequestManager/rejectRequestManagerSaga";
import watchRejectMedicineSupplyManager from "./manager/Reject/rejectMedicineSupplySaga";
import watchFetchManagerMedicalEvent from "./manager/ManagerMedicalEvent/managerMedicalEventSaga";
import watchFetchManagerMedicalEventDetail from "./manager/ManagerMedicalEvent/managerMedicalEventDetailSaga";

import watchFetchStudentDetailProfile from "./getProflie/getProfileStudentSaga";
import watchPostAiChat from "./AI_Chat/chatBoxSaga";
import watchFetchCheckupManager from "./MedicalCheckUpManager/GetAllCheckUpManager/getAllCheckUpManagerSaga";
import watchPostManagerCheckup from "./MedicalCheckUpManager/PostCheckUpManager/postCheckUpManagerSaga";
import watchPatchCheckupConfirmManager from "./MedicalCheckUpManager/ConfirmMedicalCheckupManager/confirmMedicalCheckupManagerSaga";
import watchPatchEndMedicalCheckupManager from "./MedicalCheckUpManager/EndEventMedicalCheckUpManager/endEventMedicalCheckUpManagerSaga";
import watchDeleteManagerMedicalCheckup from "./MedicalCheckUpManager/DeleteMedicalCheckupManager/deleteMedicalCheckupManagerSaga";
import watchUpdateMedicalCheckupManager from "./MedicalCheckUpManager/UpdateMedicalCheckupManager/updateMedicalCheckupManagerSaga";

// ===== AI Chat =====
import watchAiChat from "./AI_Chat/chatBoxSaga";
import watchGetAllChatBoxAi from "./AI_Chat/getChaxBoxSaga";
import watchFetchDetailCheckupManager from "./MedicalCheckUpManager/getDetailCheckUpManager/getDetailCheckUpManagerSaga";
import watchFetchDetailVaccineManager from "./manager/GetDetailVaccineManager/getDetailVaccineManagerSaga";

export default function* rootSaga() {
  yield all([
    // Common
    watchFetchLogin(),
    watchRegister(),
    watchGetProfileSaga(),
    watchFetchChangePassword(),

    // Parent
    watchHealthProfileSaga(),
    watchFetchStudentOfParent(),
    watchFetchParentForm(),
    watchFetchHealthStudent(),
    watchFetchCreateHealth(),
    watchFetchUpdateHealth(),
    watchFetchParentHealth(),
    watchFetchVaccineParent(),
    watchFetchVaccineParentResult(),
    watchFetchAcceptVaccine(),
    watchFetchDeclineVaccine(),
    watchFetchMedicineRequest(),
    watchFetchCreateMedicine(),
    watchFetchDeleteMedicine(),
    watchFetchDetailRequest(),
    watchFetchStopMedicines(),
    watchFetchAcceptBenefit(),
    watchFetchRejectBenefit(),
    watchFetchCheckUpParent(),
    watchFetchAcceptCheckUp(),
    watchFetchDeclineCheckUp(),
    watchFetchDetailCheckUpParent(),
    watchFetchResultCheckUpParent(),

    // Nurse
    watchFetchProfile(),
    watchFetchVaccine(),
    watchFetchVaccineStudent(),
    watchFetchVaccineResult(),
    watchPostResultSaga(),
    watchUpdateVaccineResult(),
    watchFetchProfileDetail(),
    watchFetchAllMedicine(),
    watchFetchRequestMedicine(),
    watchFetchMedicineSupply(),
    watchPostRequestMedicine(),
    watchFetchRequestDetailSaga(),
    watchFetchMedicineRequestNurse(),
    watchFetchMedicineDetailRequest(),
    watchRejectMedicineRequest(),
    watchAcceptMedicineRequest(),
    watchReceiveMedicineRequest(),
    watchFetchMedicineSchedule(),
    watchGiveMedicineStudent(),
    watchFetchLowStock(),
    watchPatchQuantityStock(),
    watchFetchMedicalEvent(),
    watchFetchMedicalEventDetail(),
    watchPostMedicalEvent(),
    watchSendMedicalEvent(),
    watchPatchHospitalEvent(),
    watchCreateMedicineEvent(),
    watchDeleteMedicalEvent(),
    watchFetchCheckup(),
    watchCheckupJoin(),
    watchCheckupDetailResult(),
    watchPostCheckupResult(),
    watchFetchStudentCheckup(),
    watchFetchCheckupResult(),
    watchSendCheckupParent(),

    //Manager
    watchFetchManagerMedical(),
    watchPostManagerVaccine(),
    watchFetchVaccineManager(),
    watchPutVaccineManager(),
    watchFetchClassManager(),
    watchPatchVaccineManager(),
    watchPatchVaccineConfirmManager(),
    watchDeleteManagerVaccine(),
    watchPostManagerMedicine(),
    watchFetchMedicineSuppplyManager(),
    watchFetchMedicineClasstifyManager(),
    watchPostManagerClasstify(),
    watchFetchDetailManagerClassify(),
    watchPutClassifyManager(),
    watchDeleteManagerMedicineClassify(),
    watchDeleteMedicineManager(),
    watchFetchAllMedicineSupplyManager(),
    watchPostManagerSupply(),
    watchPutManagerSupply(),
    watchDeleteManagerSupply(),
    watchFetchAllRequest(),
    watchFetchDetailRequestManager(),
    watchUpdateManagerSupply(),
    watchRejectMedicineSupplyManager(),
    watchFetchManagerMedicalEvent(),
    watchFetchManagerMedicalEventDetail(),
    watchFetchCheckupManager(),
    watchPostManagerCheckup(),
    watchPatchCheckupConfirmManager(),
    watchPatchEndMedicalCheckupManager(),
    watchDeleteManagerMedicalCheckup(),
    watchUpdateMedicalCheckupManager(),
    watchFetchDetailCheckupManager(),
    watchFetchDetailVaccineManager(),

    // watchFetchVaccineResult(),
    watchFetchVaccineResult(),
    watchPostResultSaga(),
    watchFetchCheckup(),
    watchUpdateVaccineResult(),
    watchFetchProfileDetail(),

    watchHealthProfileSaga(),

    watchFetchStudentDetailProfile(),
    // AI Chat
    watchAiChat(),
    watchGetAllChatBoxAi(),
  ]);
}
