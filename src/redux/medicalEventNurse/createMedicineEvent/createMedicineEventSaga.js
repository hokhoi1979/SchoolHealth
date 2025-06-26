import { call, put, takeLatest } from "redux-saga/effects";
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
    const token = localStorage.getItem("accessToken");
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
      console.log("CREATE", response.data);
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
        console.log("KHOI", fetchData.data);
      } else {
        yield put(fetchMedicalEventFail(fetchData.status));
      }
    } else {
      yield put(postMedicineEventFail(response.status));
      console.log("ERORR", response.status);
    }
  } catch (error) {
    yield put(postMedicineEventFail(error));
    console.log("ERORR", error);
  }
}

function* watchCreateMedicineEvent() {
  yield takeLatest(POST__MEDICINE__EVENT, createMedicineEventSaga);
}

export default watchCreateMedicineEvent;
