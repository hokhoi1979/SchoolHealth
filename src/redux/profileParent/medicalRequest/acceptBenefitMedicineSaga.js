import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_ACCEPT_BENEFIT_MEDICINE,
  fetchAcceptBenefitMedicineSuccess,
  fetchAcceptBenefitMedicineFail,
} from "./acceptBenefitMedicineSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* acceptBenefitMedicineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const requestID = action.payload;
    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/medicineRequest/accepted/${requestID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchAcceptBenefitMedicineSuccess(response.data));
    } else {
      yield put(fetchAcceptBenefitMedicineFail(error));
    }
  } catch (error) {
    yield put(fetchAcceptBenefitMedicineFail(error));
  }
}

function* watchFetchAcceptBenefit() {
  yield takeLatest(FETCH_ACCEPT_BENEFIT_MEDICINE, acceptBenefitMedicineSaga);
}
export default watchFetchAcceptBenefit;
