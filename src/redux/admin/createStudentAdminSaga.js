import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CREATE__STUDENT__ADMIN,
  createStudentAdminSuccess,
  createStudentAdminFail,
} from "./createStudentAdminSlice";
import { toast } from "react-toastify";
import {
  fetchAllStudentSuccess,
  fetchAllStudentFail,
} from "./getAllStudentSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* createStudentAdminSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.post,
      `${URL_API}/admin/v1/student`,
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(createStudentAdminSuccess(response.data));
      toast.success("Create Student Success");

      const fetch = yield call(
        axios.get,
        `${URL_API}/admin/v1/student?graduated=false&page=1&limit=100&sortBy=createdAt&order=asc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchAllStudentSuccess(fetch.data));
      } else {
        yield put(fetchAllStudentFail(fetch.status));
      }
    } else {
      yield put(createStudentAdminFail(response.status));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    toast.error(`Create Student Fail: ${errorMessage}`);
    yield put(createStudentAdminFail(errorMessage));
  }
}

export function* watchCreateStudentAdmin() {
  yield takeLatest(CREATE__STUDENT__ADMIN, createStudentAdminSaga);
}
