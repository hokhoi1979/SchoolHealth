import { actionChannel, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PUT__MANAGER__VACCINE,
  putManagerMedical,
  putManagerSucessMedical,
  putMangerFailMedical,
} from "./updateVaccineManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* updateVaccineManagerSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { id, ...data } = action.payload;
    const response = yield call(
      axios.put,
      `${URL_API}/manager/v1/vaccinationEvent/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);

      yield put(putManagerSucessMedical(response.data));
    } else {
      yield put(putManagerFailMedical(response.status));
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(putMangerFailMedical(errMsg));
  }
}

function* watchPutVaccineManager() {
  yield takeLatest(PUT__MANAGER__VACCINE, updateVaccineManagerSaga);
}

export default watchPutVaccineManager;
