// redux/ADMIN/CreateStudent/createInformationStudentAdminSaga.js
import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CREATE__STUDENT__ADMIN,
  createStudentAdminFail,
  createStudentAdminSuccess,
} from "./createInformationStudentAdminSlice";
import toast from "react-hot-toast";
import {
  fetchStudentAdminFail,
  fetchStudentAdminSuccess,
} from "../getAllStudentSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

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
      toast.success("Creat Student Success");

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
        yield put(fetchStudentAdminSuccess(fetch.data));
      } else {
        yield put(fetchStudentAdminFail(fetch.status));
      }
    } else {
      yield put(createStudentAdminFail(response.status));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    toast.error(`Create Student Fail: ${errorMessage}`);
    yield put(createStudentAdminFail(errorMessage));
    console.error("Create Student Error:", error);
  }
}

export function* watchCreateStudentAdmin() {
  yield takeLatest(CREATE__STUDENT__ADMIN, createStudentAdminSaga);
}
