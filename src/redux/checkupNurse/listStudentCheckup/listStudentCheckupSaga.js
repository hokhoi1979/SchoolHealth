import axios from "axios";

import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH__STUDENT__CHECKUP,
  fetchStudentCheckup,
  fetchStudentCheckupFail,
  fetchStudentCheckupSuccess,
} from "./listStudentCheckupSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* listStudentCheckupSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const id = action.payload;
    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/check-up/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchStudentCheckupSuccess(response.data));
      console.log("STUDENT", response.data);
    } else {
      yield put(fetchStudentCheckupFail(response.status));
    }
  } catch (error) {
    yield put(fetchStudentCheckupFail(error));
  }
}

function* watchFetchStudentCheckup() {
  yield takeLatest(FETCH__STUDENT__CHECKUP, listStudentCheckupSaga);
}

export default watchFetchStudentCheckup;
