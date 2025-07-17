import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  fetchMedicalEvent,
  fetchMedicalEventFail,
  fetchMedicalEventSuccess,
} from "../medicalEvent/getMedicalEventSlice";
import {
  POST__MEDICINE__EVENT,
  postMedicineEvent,
  postMedicineEventFail,
  postMedicineEventSuccess,
} from "./createMedicineEventSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* createMedicineEventSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const { id, body } = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/nurse/v1/medicalEvent/treatment/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(postMedicineEventSuccess(response.data));
      const fetchData = yield call(
        axios.get,
        `${URL_API}/nurse/v1/medicalEvent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (fetchData.status === 200 || fetchData.status === 201) {
        yield put(fetchMedicalEventSuccess(fetchData.data));
      } else {
        yield put(fetchMedicalEventFail(fetchData.status));
      }
    } else {
      yield put(postMedicineEventFail(response.status));
    }
  } catch (error) {
    yield put(postMedicineEventFail(error));
  }
}

function* watchCreateMedicineEvent() {
  yield takeLatest(POST__MEDICINE__EVENT, createMedicineEventSaga);
}

export default watchCreateMedicineEvent;
