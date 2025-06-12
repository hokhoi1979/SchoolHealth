import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_STUDENT,
  fetchStudentFail,
  fetchStudentSuccess,
} from "./StudentOfParentSlice";
import axios from "axios";
const URL_API = import.meta.env.VITE_API_URL;

function* StudentOfParentSaga() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(axios.get, `${URL_API}/parent/v1/student`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      yield put(fetchStudentSuccess(response.data.data));
    } else {
      yield put(fetchStudentFail(`API Error: ${response.status}`));
    }
  } catch (error) {
    yield put(fetchStudentFail(`API Error: ${error}`));
  }
}

function* watchFetchStudentOfParent() {
  yield takeLatest(FETCH_STUDENT, StudentOfParentSaga);
}
export default watchFetchStudentOfParent;
