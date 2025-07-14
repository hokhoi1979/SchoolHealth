import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  STUDENT__MEETING,
  studentMeetingFail,
  studentMeetingSuccess,
} from "./listStudentMeetingSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* studentMeetingSaga() {
  try {
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/check-up/meeting/students`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(studentMeetingSuccess(response.data));
    } else {
      yield put(studentMeetingFail(response.status));
    }
  } catch (error) {
    yield put(studentMeetingFail(error));
  }
}

function* watchStudentMeeting() {
  yield takeLatest(STUDENT__MEETING, studentMeetingSaga);
}

export default watchStudentMeeting;
