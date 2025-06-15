import {
  FETCH_ALL__MEDICINE,
  fetchAllMedicineFail,
  fetchAllMedicineSuccess,
} from "./getAllMedicineSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
const URL_API = import.meta.env.VITE_API_URL;

function* getAllMedicineSaga() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/medicine?classifyID=1&page=1&limit=5&sortBy=createdAt&order=asc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchAllMedicineSuccess(response.data));
      console.log("MEDINCE", response.data);
    } else {
      yield put(fetchAllMedicineFail(response.status));
    }
  } catch (error) {
    yield put(fetchAllMedicineFail(error));
  }
}

function* watchFetchAllMedicine() {
  yield takeLatest(FETCH_ALL__MEDICINE, getAllMedicineSaga);
}

export default watchFetchAllMedicine;
