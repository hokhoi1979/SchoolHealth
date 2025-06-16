import { actionChannel, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PATCH__MANAGER__CONFIRM__VACCINE,
  patchManagerSucessConfirmVaccine,
  patchMangerFailConfirmVaccine,
} from "./ConfirmVaccineManagerSlice";
import { patchMangerFailVaccine } from "../successVaccineManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* patchVaccineConfirmManagerSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    console.log("TOKEN", token);
    const { id, body } = action.payload;
    const response = yield call(
      axios.patch,
      `${URL_API}/manager/v1/vaccinationEvent/${id}`,
      { body },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);

      yield put(patchManagerSucessConfirmVaccine(response.data));
    } else {
      yield put(patchMangerFailConfirmVaccine(response.status));
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(patchMangerFailConfirmVaccine(errMsg));
  }
}

function* watchPatchVaccineConfirmManager() {
  yield takeLatest(
    PATCH__MANAGER__CONFIRM__VACCINE,
    patchVaccineConfirmManagerSaga
  );
}

export default watchPatchVaccineConfirmManager;
