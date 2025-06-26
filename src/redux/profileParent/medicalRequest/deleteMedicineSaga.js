import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_DELETE_MEDICINE,
  fetchDeleteMedicineSuccess,
  fetchDeleteMedicineFail,
} from "./deleteMedicineSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* deleteMedicineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(
      axios.delete,
      `${URL_API}/parent/v1/medicineRequest/${action.payload}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 204) {
      yield put(fetchDeleteMedicineSuccess(action.payload));
    } else {
      yield put(fetchDeleteMedicineFail("Delete failed"));
    }
  } catch (error) {
    yield put(fetchDeleteMedicineFail(error.message));
  }
}

function* watchDeleteMedicine() {
  yield takeLatest(FETCH_DELETE_MEDICINE, deleteMedicineSaga);
}

export default watchDeleteMedicine;
