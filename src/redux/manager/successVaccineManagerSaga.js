import { actionChannel, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PATCH__MANAGER__VACCINE,
  patchManagerSucessVaccine,
  patchManagerVaccine,
  patchMangerFailVaccine,
} from "./successVaccineManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* patchVaccineManagerSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    console.log("TOKEN", token);
    const id = action.payload;
    const response = yield call(
      axios.patch,
      `${URL_API}/manager/v1/${id}/success`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);

      yield put(patchManagerSucessVaccine(response.data));
    } else {
      yield put(patchManagerFailVaccine(response.status));
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(patchMangerFailVaccine(errMsg));
  }
}

function* watchPatchVaccineManager() {
  yield takeLatest(PATCH__MANAGER__VACCINE, patchVaccineManagerSaga);
}

export default watchPatchVaccineManager;
