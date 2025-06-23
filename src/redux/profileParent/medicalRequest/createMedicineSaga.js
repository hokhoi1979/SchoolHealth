import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_CREATE_MEDICINE,
  fetchCreateMedicineSuccess,
  fetchCreateMedicineFail,
} from "./createMedicineSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* createMedicineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const body = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/parent/v1/medicineRequest`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchCreateMedicineSuccess(response.data));
    } else {
      yield put(fetchCreateMedicineFail(`Status: ${response.status}`));
      console.log("EROR", response.status);
    }
  } catch (error) {
    yield put(fetchCreateMedicineFail(error.message || "Unknown error"));
  }
}

function* watchFetchCreateMedicine() {
  yield takeLatest(FETCH_CREATE_MEDICINE, createMedicineSaga);
}
export default watchFetchCreateMedicine;
