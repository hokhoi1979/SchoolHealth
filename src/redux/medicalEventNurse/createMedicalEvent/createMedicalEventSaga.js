import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  POST__MEDICAL__EVENT,
  postMedicalEventFail,
  postMedicalEventSuccess,
} from "./createMedicalEventSlice";
import { fetchMedicalEvent } from "../medicalEvent/getMedicalEventSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* createMedicalEventSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const body = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/nurse/v1/medicalEvent`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(postMedicalEventSuccess(response.data));
      yield put(fetchMedicalEvent());
    } else {
      yield put(postMedicalEventFail(response.status));
    }
  } catch (error) {
    yield put(postMedicalEventFail(error));
  }
}
function* watchPostMedicalEvent() {
  yield takeLatest(POST__MEDICAL__EVENT, createMedicalEventSaga);
}

export default watchPostMedicalEvent;
