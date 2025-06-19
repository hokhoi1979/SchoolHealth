import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  DELETE__MEDICAL__EVENT,
  deleteMedicalEventFail,
  deleteMedicalEventSuccess,
} from "./deleteMedicalEventSlice";
import {
  fetchMedicalEventFail,
  fetchMedicalEventSuccess,
} from "../medicalEvent/getMedicalEventSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* deleteMedicalEventSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const id = action.payload;
    const response = yield call(
      axios.delete,
      `${URL_API}/nurse/v1/medicalEvent/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(deleteMedicalEventSuccess(response.data));
      console.log("DELETE SUCCESS");
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
    }
  } catch (error) {
    yield put(deleteMedicalEventFail(error));
  }
}

function* watchDeleteMedicalEvent() {
  yield takeLatest(DELETE__MEDICAL__EVENT, deleteMedicalEventSaga);
}

export default watchDeleteMedicalEvent;
