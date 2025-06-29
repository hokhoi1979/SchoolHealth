import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_REJECT_BENEFIT_MEDICINE,
  fetchRejectBenefitMedicineSuccess,
  fetchRejectBenefitMedicineFail,
} from "./rejectBenefitMedicineSlice";
import axios from "axios";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;

function* rejectBenefitMedicineSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
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
      toast.success(response.data.message);
    } else {
      yield put(fetchRejectBenefitMedicineFail(error));
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(fetchRejectBenefitMedicineFail(error));
    toast.error(errorMessage);
  }
}

function* watchFetchRejectBenefit() {
  yield takeLatest(FETCH_REJECT_BENEFIT_MEDICINE, rejectBenefitMedicineSaga);
}
export default watchFetchRejectBenefit;
