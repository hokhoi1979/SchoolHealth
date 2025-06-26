import { all } from "redux-saga/effects";
import watchFetchLogin from "./auth/authSaga";
import watchFetchProfile from "./profileNurse/profileSaga";

import watchFetchManagerMedical from "./manager/managerSaga";
import watchPostManagerVaccine from "./manager/createVaccineManagerSaga";
import watchFetchVaccineManager from "./manager/getVaccineManagerSaga";
import watchPutVaccineManager from "./manager/updateVaccineManagerSage";
import watchFetchClassManager from "./manager/getClassManagerSaga";
import watchPatchVaccineManager from "./manager/successVaccineManagerSaga";

import watchFetchVaccineStudent from "./vaccineNurse/vaccineById/vaccineByIdSaga";
import watchFetchVaccineResult from "./vaccineNurse/vaccineResult/vaccineResultSaga";
import watchPostResultSaga from "./vaccineNurse/sendResult/sendResultSaga";
import watchUpdateVaccineResult from "./vaccineNurse/updateVaccineResult/updateResultSaga";
import watchFetchVaccine from "./vaccineNurse/vaccine/vaccineSaga";
import watchFetchCheckup from "./checkupNurse/checkupSaga";
import watchFetchProfileDetail from "./vaccineNurse/profileDetail/profileStudentSaga";
import watchPatchVaccineConfirmManager from "./manager/ConfirmVaccineManager/ConfirmVaccineManagerSaga";

//api parent
import watchFetchParentProfile from "./profileParent/profileSaga";
import watchFetchStudentOfParent from "./profileParent/StudentOfParentSaga";
import watchFetchParentForm from "./profileParent/formSaga";
import watchFetchHealthStudent from "./profileParent/HealthByIdSaga";
import watchFetchCreateHealth from "./profileParent/createHealthSaga";
import watchFetchVaccineParent from "./getVaccineParent/getVaccineParentSaga";
import watchFetchVaccineParentResult from "./getVaccineParent/getVaccineParentResultSaga";
import watchFetchUpdateHealth from "./profileParent/updateHealthSaga";
import watchFetchParentHealth from "./profileParent/parentGetHealth/parentGetHealthSaga";
import watchFetchAcceptVaccine from "./getVaccineParent/getVaccineParentAcceptSaga";
import watchFetchDeclineVaccine from "./getVaccineParent/getVaccineParentDeclineSaga";
import watchFetchMedicineRequest from "./profileParent/medicalRequest/MedicineRequestSaga";
import watchFetchCreateMedicine from "./profileParent/medicalRequest/createMedicineSaga";
import watchFetchDeleteMedicine from "./profileParent/medicalRequest/deleteMedicineSaga";
import watchFetchDetailRequest from "./profileParent/medicalRequest/getDetailRequestSaga";
import watchFetchStopMedicines from "./profileParent/medicalRequest/stopMedicineSaga";
import watchFetchAcceptBenefit from "./profileParent/medicalRequest/acceptBenefitMedicineSaga";
import watchFetchRejectBenefit from "./profileParent/medicalRequest/rejectBenefitMedicineSaga";

import watchDeleteManagerVaccine from "./manager/DeleteVaccineEvent/deleteVaccineEventSaga";
import watchPostManagerMedicine from "./manager/CreateManagerMedicine/createManagerMedicineSaga";
import watchFetchMedicineSuppplyManager from "./manager/GetMedicineAndSupplyManager/getMedicineAndSupplyManagerSaga";
import watchHealthProfileSaga from "./profileParent/profileSaga";
import watchFetchAllMedicine from "./materialsNurse/getAllMedicine/getAllMedicineSaga";
import watchFetchRequestMedicine from "./materialsNurse/getSendRequestMedicine/getRequestMedicineSaga";
import watchFetchMedicineSupply from "./materialsNurse/getMedicineSupplies/getMedicineSuppliesSaga";
import watchPostRequestMedicine from "./materialsNurse/sendRequestMedicineNurse/sendRequestMedicineSaga";
import watchFetchRequestDetailSaga from "./materialsNurse/getDetailRequest/getDetailRequestSaga";
import watchFetchMedicalEvent from "./medicalEventNurse/medicalEvent/getMedicalEventSaga";
import watchFetchMedicalEventDetail from "./medicalEventNurse/medicalDetailEvent/getMedicalEventDetailSaga";
import watchPostMedicalEvent from "./medicalEventNurse/createMedicalEvent/createMedicalEventSaga";
import watchSendMedicalEvent from "./medicalEventNurse/sendMedicalEvent/sendMedicalEventSaga";
import watchPatchHospitalEvent from "./medicalEventNurse/editHospitalEvent/editHospitalEventSaga";
import watchCreateMedicineEvent from "./medicalEventNurse/createMedicineEvent/createMedicineEventSaga";
import watchDeleteMedicalEvent from "./medicalEventNurse/deleteMedicalEvent/deleteMedicalEventSaga";

import watchGetProfileSaga from "./getProflie/getProfileSaga";
import watchFetchChangePassword from "./ChangePassword/changePasswordSaga";

export default function* rootSaga() {
  yield all([
    watchFetchVaccine(),
    watchFetchLogin(),
    watchFetchProfile(),
    watchFetchVaccineStudent(),
    //Parent
    watchFetchParentHealth(),
    watchFetchStudentOfParent(),
    watchFetchParentForm(),
    watchFetchHealthStudent(),
    watchFetchCreateHealth(),
    watchFetchUpdateHealth(),
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

    watchFetchAllMedicine(),
    watchFetchRequestMedicine(),
    watchFetchMedicineSupply(),
    watchPostRequestMedicine(),
    watchFetchRequestDetailSaga(),
    watchFetchMedicalEvent(),
    watchFetchMedicalEventDetail(),
    watchPostMedicalEvent(),
    watchSendMedicalEvent(),
    watchPatchHospitalEvent(),
    watchCreateMedicineEvent(),
    watchDeleteMedicalEvent(),
    //Manager
    watchFetchManagerMedical(),
    watchPostManagerVaccine(),
    watchFetchVaccineManager(),
    watchPutVaccineManager(),
    watchFetchClassManager(),
    watchPatchVaccineManager(),
    watchDeleteManagerVaccine(),
    watchPostManagerMedicine(),
    watchFetchMedicineSuppplyManager(),

    // watchFetchVaccineResult(),
    watchFetchVaccineResult(),
    watchPostResultSaga(),
    watchFetchCheckup(),
    watchUpdateVaccineResult(),
    watchFetchProfileDetail(),

    watchPatchVaccineConfirmManager(),
    watchHealthProfileSaga(),

    watchGetProfileSaga(),
    watchFetchChangePassword(),
  ]);
}
