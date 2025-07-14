import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";

import { toast } from "react-toastify";

import {
  DELETE__STUDENT,
  deleteStudentFail,
  deleteStudentSuccess,
} from "./deleteStudentSlice";
import { fetchMeetedFail, fetchMeetedSuccess } from "../meeted/meetedSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* deleteStudentSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload;
    const response = yield call(
      axios.delete,
      `${URL_API}/nurse/v1/check-up/meeting/students/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(deleteStudentSuccess(response.data));
      toast.success("Delete successful!");

      const fetch = yield call(
        axios.get,
        `${URL_API}/nurse/v1/check-up/meeting`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchMeetedSuccess(fetch.data));
      } else {
        yield put(fetchMeetedFail(fetch.status));
      }
    } else {
      yield put(deleteStudentFail(response.status));
    }
  } catch (error) {
    yield put(deleteStudentFail(error));
  }
}

function* watchDeleteStudent() {
  yield takeLatest(DELETE__STUDENT, deleteStudentSaga);
}

export default watchDeleteStudent;
