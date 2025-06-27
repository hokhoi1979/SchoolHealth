import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_REJECT_BENEFIT_MEDICINE,
  fetchRejectBenefitMedicineSuccess,
  fetchRejectBenefitMedicineFail,
} from "./rejectBenefitMedicineSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* rejectBenefitMedicineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const requestID = action.payload;
    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/medicineRequest/rejected/${requestID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchRejectBenefitMedicineSuccess(response.data));
    } else {
      yield put(fetchRejectBenefitMedicineFail(error));
    }
  } catch (error) {
    yield put(fetchRejectBenefitMedicineFail(error));
  }
}

function* watchFetchRejectBenefit() {
  yield takeLatest(FETCH_REJECT_BENEFIT_MEDICINE, rejectBenefitMedicineSaga);
}
export default watchFetchRejectBenefit;
