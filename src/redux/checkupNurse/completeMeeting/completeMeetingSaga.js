import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";

import { toast } from "react-toastify";
import { fetchMeetedSuccess } from "../meeted/meetedSlice";
import {
  COMPLETE__MEETING,
  completeMeetingFail,
  completeMeetingSuccess,
} from "./completeMeetingSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* completeMeetingSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/nurse/v1/check-up/meeting/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(completeMeetingSuccess(response.data));
      toast.success("Complete successful!");

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

      yield put(fetchMeetedSuccess(fetch.data));
    } else {
      yield put(completeMeetingFail(response.status));
    }
  } catch (error) {
    yield put(completeMeetingFail(error));
    toast.error("Complete failed!");
  }
}

function* watchCompleteMeeting() {
  yield takeLatest(COMPLETE__MEETING, completeMeetingSaga);
}

export default watchCompleteMeeting;
