import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_MEDICINE_REQUEST,
  fetchMedicineRequestSuccess,
  fetchMedicineRequestFail,
} from "./MedicineRequestSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* medicineRequestSaga() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(
      axios.get,
      `${URL_API}/parent/v1/medicineRequest`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchMedicineRequestSuccess(response.data));
      console.log(response.data);
    } else {
      yield put(fetchMedicineRequestFail(error));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchMedicineRequestFail(error));
  }
}

function* watchFetchMedicineRequest() {
  yield takeLatest(FETCH_MEDICINE_REQUEST, medicineRequestSaga);
}
export default watchFetchMedicineRequest;
