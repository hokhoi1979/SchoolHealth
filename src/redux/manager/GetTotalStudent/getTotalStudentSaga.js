import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FETCH__TOTAL__STUDENT,
  fetchTotalStudentFail,
  fetchTotalStudentSuccess,
} from "./getTotalStudentSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* totalStudentSagaWorker(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { targetType, targetIds = [] } = action.payload;

    const params = new URLSearchParams();
    params.append("targetType", targetType);

    if (targetType !== "SCHOOL" && targetIds.length > 0) {
      targetIds.forEach((id) => params.append("targetIds", id));
    }

    const response = yield call(
      axios.get,
      `${URL_API}/admin/v1/student/total?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const total = response.data?.data ?? 0;

      yield put(fetchTotalStudentSuccess(total));
    } else {
      yield put(fetchTotalStudentFail(response.status));
    }
  } catch (error) {
    yield put(fetchTotalStudentFail(error));
    const errMsg =
      error?.response?.data?.message || error?.message || "Lỗi không xác định";
    toast.error(errMsg);
  }
}

export function* totalStudentSaga() {
  yield takeLatest(FETCH__TOTAL__STUDENT, totalStudentSagaWorker);
}

export default totalStudentSaga;
