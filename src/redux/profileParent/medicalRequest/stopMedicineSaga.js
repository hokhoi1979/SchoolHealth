import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_STOP_MEDICINE,
  fetchStopMedicineSuccess,
  fetchStopMedicineFail,
} from "./stopMedicineSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* stopMedicineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const requestID = action.payload;
    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/medicineRequest/${requestID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchStopMedicineSuccess(response.data));
    } else {
      yield put(fetchStopMedicineFail(error));
    }
  } catch (error) {
    yield put(fetchStopMedicineFail(error));
  }
}

function* watchFetchStopMedicine() {
  yield takeLatest(FETCH_STOP_MEDICINE, stopMedicineSaga);
}
export default watchFetchStopMedicine;
