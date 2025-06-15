import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__REQUEST__MEDICINE,
  fetchRequestMedicineFail,
  fetchRequestMedicineSuccess,
} from "./getRequestMedicineSlice";
const URL_API = import.meta.env.VITE_API_URL;
function* getRequestMedicineSaga() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/medicine/send-request`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchRequestMedicineSuccess(response.data));
    } else {
      yield put(fetchRequestMedicineFail(response.status));
    }
  } catch (error) {
    yield put(fetchRequestMedicineFail(error));
  }
}

function* watchFetchRequestMedicine() {
  yield takeLatest(FETCH__REQUEST__MEDICINE, getRequestMedicineSaga);
}

export default watchFetchRequestMedicine;
