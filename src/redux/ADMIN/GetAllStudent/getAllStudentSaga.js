// getAllStudentAdminSaga.js
import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__STUDENT__ADMIN,
  fetchStudentAdminFail,
  fetchStudentAdminSuccess,
} from "./getAllStudentSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* getAllStudentAdminSaga() {
  try {
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.get,
      `${URL_API}/admin/v1/student?graduated=false&page=1&limit=100&sortBy=createdAt&order=asc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchStudentAdminSuccess(response.data));
    } else {
      yield put(fetchStudentAdminFail(response.status));
    }
  } catch (error) {
    yield put(fetchStudentAdminFail(error));
    console.log(error);
  }
}

function* watchFetchStudentAdmin() {
  yield takeLatest(FETCH__STUDENT__ADMIN, getAllStudentAdminSaga);
}

export default watchFetchStudentAdmin;
