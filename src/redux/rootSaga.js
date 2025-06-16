import { all } from "redux-saga/effects";
import watchFetchLogin from "./auth/authSaga";
import watchFetchProfile from "./profileNurse/profileSaga";
import watchFetchStudentOfParent from "./profileParent/StudentOfParentSaga";
import watchFetchParentForm from "./profileParent/formSaga";
import watchFetchHealthStudent from "./profileParent/HealthByIdSaga";
import watchFetchCreateHealth from "./profileParent/createHealthSaga";
import watchFetchVaccineParent from "./getVaccineParent/getVaccineParentSaga";
import watchFetchVaccineParentResult from "./getVaccineParent/getVaccineParentResultSaga";
import watchFetchVaccineStudent from "./vaccineNurse/vaccineById/vaccineByIdSaga";
import watchFetchVaccineManager from "./manager/getVaccineManagerSaga";
import watchPutVaccineManager from "./manager/updateVaccineManagerSage";
import watchPatchVaccineManager from "./manager/successVaccineManagerSaga";
import watchFetchVaccineResult from "./vaccineNurse/vaccineResult/vaccineResultSaga";
import watchUpdateVaccineResult from "./vaccineNurse/updateVaccineResult/updateResultSaga";
import watchFetchProfileDetail from "./vaccineNurse/profileDetail/profileStudentSaga";
import watchFetchVaccine from "./vaccineNurse/vaccine/vaccineSaga";
import watchFetchManagerMedical from "./manager/managerSaga";
import watchPostManagerVaccine from "./manager/createVaccineManagerSaga";
import watchFetchClassManager from "./manager/getClassManagerSaga";
import watchPostResultSaga from "./vaccineNurse/sendResult/sendResultSaga";
import watchFetchCheckup from "./checkupNurse/checkupSaga";
import watchHealthProfileSaga from "./profileParent/profileSaga";
import watchFetchUpdateHealth from "./profileParent/updateHealthSaga";
import watchFetchParentHealth from "./profileParent/parentGetHealth/parentGetHealthSaga";

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
    //Manager
    watchFetchManagerMedical(),
    watchPostManagerVaccine(),
    watchFetchVaccineManager(),
    watchPutVaccineManager(),
    watchFetchClassManager(),
    watchPatchVaccineManager(),

    // watchFetchVaccineResult(),
    watchFetchVaccineResult(),
    watchPostResultSaga(),
    watchFetchCheckup(),
    watchUpdateVaccineResult(),
    watchFetchProfileDetail(),
    watchHealthProfileSaga(),
  ]);
}
