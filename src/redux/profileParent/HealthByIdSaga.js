import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH__HEALTH__STUDENT,
  fetchHealthStudentFail,
  fetchHealthStudentSucess,
} from "./HealthByIdSlice.js";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* healthStudentSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const id = action.payload;
    const response = yield call(
      axios.get,
      `${URL_API}/parent/v1/health/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log(response.data);

      yield put(fetchHealthStudentSucess(response.data.data.healthProfile));
    } else {
      yield put(fetchHealthStudentFail(response.status));
    }
  } catch (error) {
    yield put(fetchHealthStudentFail(error));
  }
}

function* watchFetchHealthStudent() {
  yield takeLatest(FETCH__HEALTH__STUDENT, healthStudentSaga);
}

export default watchFetchHealthStudent;
