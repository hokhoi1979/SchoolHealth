import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_STUDENT_DETAIL,
  fetchStudentDetailSuccess,
  fetchStudentDetailFail,
} from "./getProfileStudentSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* studentDetailProfileSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload;
    const response = yield call(
      axios.get,
      `${URL_API}/admin/v1/student/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchStudentDetailSuccess(response.data));
    } else {
      yield put(fetchStudentDetailFail(error));
    }
  } catch (error) {
    yield put(fetchStudentDetailFail(error));
  }
}

function* watchFetchStudentDetailProfile() {
  yield takeLatest(FETCH_STUDENT_DETAIL, studentDetailProfileSaga);
}
export default watchFetchStudentDetailProfile;
