import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";

import { toast } from "react-toastify";
import {
  CREATE__MEETING,
  createMeetingFail,
  createMeetingSuccess,
} from "./createMeetingSlice";
import {
  studentMeetingFail,
  studentMeetingSuccess,
} from "../listStudentMeeting/listStudentMeetingSlice";

const URL_API = import.meta.env.VITE_API_URL;
console.log("🧠 Saga file loaded");
function* createMeetingSaga(action) {
  try {
    console.log("👉 createMeetingSaga triggered", action.payload);
    const token = yield select((state) => state.account.token);
    const body = action.payload;

    const response = yield call(
      axios.post,
      `${URL_API}/nurse/v1/check-up/meeting`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(createMeetingSuccess(response.data));
      toast.success("Create meeting successful!");

      const fetch = yield call(
        axios.get,
        `${URL_API}/nurse/v1/check-up/meeting/students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (fetch.status === 200 || fetch.status === 201) {
        yield put(studentMeetingSuccess(fetch.data));
      } else {
        yield put(studentMeetingFail(fetch.status));
      }
    } else {
      yield put(createMeetingFail(response.status));
      toast.error("Create meeting fail!");
    }
  } catch (error) {
    yield put(createMeetingFail(error));
    console.error("Create meeting error:", error);
    toast.error("Create meeting failed due to network or server error.");
  }
}

function* watchCreateMeeting() {
  yield takeLatest(CREATE__MEETING, createMeetingSaga);
}

export default watchCreateMeeting;
