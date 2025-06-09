import { all } from "redux-saga/effects";
import watchFetchLogin from "./auth/authSaga";
import watchFetchProfile from "./profileNurse/profileSaga";
import watchFetchVaccineStudent from "./vaccineNurse/vaccineById/vaccineByIdSaga";
import watchFetchVaccineResult from "./vaccineNurse/vaccineResult/vaccineResultSaga";
import watchPostResultSaga from "./vaccineNurse/sendResult/sendResultSaga";
import watchUpdateVaccineResult from "./vaccineNurse/updateVaccineResult/updateResultSaga";
import watchFetchVaccine from "./vaccineNurse/vaccine/vaccineSaga";
import watchFetchCheckup from "./checkupNurse/checkupSaga";
import watchFetchProfileDetail from "./vaccineNurse/profileDetail/profileStudentSaga";


export default function* rootSaga() {
  yield all([
    watchFetchVaccine(),
    watchFetchLogin(),
    watchFetchProfile(),
    watchFetchVaccineStudent(),
    // watchFetchVaccineResult(),
    watchFetchVaccineResult(),
    watchPostResultSaga(),
    watchFetchCheckup(),
    watchUpdateVaccineResult(),
    watchFetchProfileDetail()
  ]);
}
