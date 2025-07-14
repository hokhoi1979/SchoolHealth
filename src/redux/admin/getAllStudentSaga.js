import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  FETCH_ALL_STUDENT,
  fetchAllStudentSuccess,
  fetchAllStudentFail,
} from "./getAllStudentSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* getAllStudentSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const params = {
      page: action.payload?.page || 1,
      limit: action.payload?.limit || 10,
      sortBy: action.payload?.sortBy || "createdAt",
      order:
        action.payload?.order === "asc" || action.payload?.order === "desc"
          ? action.payload.order
          : "asc",
      search: action.payload?.search || undefined,
      className: action.payload?.className || undefined,
      grade: action.payload?.grade || undefined,
      academicYearName: action.payload?.academicYearName || undefined,
      graduated:
        action.payload?.graduated === true ||
        action.payload?.graduated === false
          ? action.payload.graduated
          : undefined,
    };

    const response = yield call(axios.get, `${URL_API}/admin/v1/student`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      yield put(fetchAllStudentSuccess(response.data));
    } else {
      yield put(fetchAllStudentFail("Lỗi không xác định"));
    }
  } catch (error) {
    yield put(fetchAllStudentFail(error));
  }
}

function* watchFetchGetAllStudent() {
  yield takeLatest(FETCH_ALL_STUDENT, getAllStudentSaga);
}
export default watchFetchGetAllStudent;
