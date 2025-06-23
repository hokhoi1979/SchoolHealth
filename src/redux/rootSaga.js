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
import watchFetchParentProfile from "./profileParent/profileSaga";
import watchFetchStudentOfParent from "./profileParent/StudentOfParentSaga";
import watchFetchParentForm from "./profileParent/formSaga";
import watchFetchHealthStudent from "./profileParent/HealthByIdSaga";
import watchFetchCreateHealth from "./profileParent/createHealthSaga";
import watchFetchUpdateHealth from "./profileParent/profileSaga";
import watchFetchVaccineParent from "./getVaccineParent/getVaccineParentSaga";
import watchFetchVaccineParentResult from "./getVaccineParent/getVaccineParentResultSaga";

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
import watchFetchDetailRequest from "./manager/GetDetailRequestManager/getDetailRequestManagerSaga";
import watchUpdateManagerSupply from "./manager/RejectRequestManager/rejectRequestManagerSaga";
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
import watchRejectMedicineSupplyManager from "./manager/Reject/rejectMedicineSupplySaga";
import watchFetchManagerMedicalEvent from "./manager/ManagerMedicalEvent/managerMedicalEventSaga";
import watchFetchManagerMedicalEventDetail from "./manager/ManagerMedicalEvent/managerMedicalEventDetailSaga";

export default function* rootSaga() {
  yield all([
    watchFetchVaccine(),
    watchFetchLogin(),
    watchFetchProfile(),
    watchFetchVaccineStudent(),
    watchFetchParentProfile(),
    watchFetchStudentOfParent(),
    watchFetchParentForm(),
    watchFetchHealthStudent(),
    watchFetchCreateHealth(),
    watchFetchUpdateHealth(),
    watchFetchVaccineParent(),
    watchFetchVaccineParentResult(),
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
    watchFetchDetailRequest(),
    watchUpdateManagerSupply(),
    watchRejectMedicineSupplyManager(),
    watchFetchManagerMedicalEvent(),
    watchFetchManagerMedicalEventDetail(),

    // watchFetchVaccineResult(),
    watchFetchVaccineResult(),
    watchPostResultSaga(),
    watchFetchCheckup(),
    watchUpdateVaccineResult(),
    watchFetchProfileDetail(),
    watchPatchVaccineConfirmManager(),
    watchHealthProfileSaga(),
  ]);
}
