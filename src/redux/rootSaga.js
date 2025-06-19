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
import watchHealthProfileSaga from "./profileParent/profileSaga";
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
