import { all } from "redux-saga/effects";
import watchFetchLogin from "./auth/authSaga";
import watchFetchProfile from "./profileNurse/profileSaga";
import watchFetchVaccine from "./vaccine/vaccineSaga";
import watchFetchVaccineStudent from "./vaccine/vaccineByIdSaga";

export default function* rootSaga() {
  yield all([
    watchFetchVaccine(),
    watchFetchLogin(),
    watchFetchProfile(),
    watchFetchVaccineStudent(),
  ]);
}
