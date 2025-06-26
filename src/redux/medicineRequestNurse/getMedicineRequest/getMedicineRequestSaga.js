import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH__MEDICINE__REQUEST,
  fetchMedicineRequestFail,
  fetchMedicineRequestSuccess,
} from "./getMedicineRequestSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* getMedicineReuqestSaga() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/medicineRequest`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchMedicineRequestSuccess(response.data));
      console.log("RES", response.data);
    } else {
      yield put(fetchMedicineRequestFail(response.status));
    }
  } catch (error) {
    yield put(fetchMedicineRequestFail(error));
  }
}

function* watchFetchMedicineRequest() {
  yield takeLatest(FETCH__MEDICINE__REQUEST, getMedicineReuqestSaga);
}

export default watchFetchMedicineRequest;
