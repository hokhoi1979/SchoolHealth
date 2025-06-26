import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__MANAGER__MEDICAL__EVENT,
  fetchManagerMedicalEventFail,
  fetchManagerMedicalEventSuccess,
} from "./managerMedicalEventSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* managerMedicalEventSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");

    const response = yield call(
      axios.get,
      `${URL_API}/manager/v1/medicalEvent`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("✅ managerMedicalEventSaga:", response.data);
      yield put(fetchManagerMedicalEventSuccess(response.data));
    } else {
      yield put(fetchManagerMedicalEventFail(response.status));
    }
  } catch (error) {
    console.error(" managerMedicalEventSaga Error:", error);
    yield put(fetchManagerMedicalEventFail(error));
  }
}

function* watchFetchManagerMedicalEvent() {
  yield takeLatest(FETCH__MANAGER__MEDICAL__EVENT, managerMedicalEventSaga);
}

export default watchFetchManagerMedicalEvent;
