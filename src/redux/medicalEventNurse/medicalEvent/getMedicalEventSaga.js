import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__MEDICAL__EVENT,
  fetchMedicalEventFail,
  fetchMedicalEventSuccess,
} from "./getMedicalEventSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* getMedicalEventSaga() {
  try {
    const token = yield select((state) => state.account.token);

    const response = yield call(axios.get, `${URL_API}/nurse/v1/medicalEvent`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      yield put(fetchMedicalEventSuccess(response.data));
    } else {
      yield put(fetchMedicalEventFail(response.status));
    }
  } catch (error) {
    yield put(fetchMedicalEventFail(error));
  }
}

function* watchFetchMedicalEvent() {
  yield takeLatest(FETCH__MEDICAL__EVENT, getMedicalEventSaga);
}

export default watchFetchMedicalEvent;
