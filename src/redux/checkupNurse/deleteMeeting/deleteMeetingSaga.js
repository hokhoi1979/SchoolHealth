import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  DELETE__MEETING,
  deleteMeetingFail,
  deleteMeetingSuccess,
} from "./deleteMeetingSlice";
import { toast } from "react-toastify";
import { fetchMeetedFail, fetchMeetedSuccess } from "../meeted/meetedSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* deleteMeetSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload;
    const response = yield call(
      axios.delete,
      `${URL_API}/nurse/v1/check-up/meeting/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(deleteMeetingSuccess(response.data));
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
        console.log("SUCCESS", fetch.data);
      } else {
        yield put(fetchMeetedFail(fetch.status));
      }
    } else {
      yield put(deleteMeetingFail(response.status));
    }
  } catch (error) {
    yield put(deleteMeetingFail(error));
    toast.error("You can not delete because status is PENDING");
  }
}

function* watchDeleteMeeting() {
  yield takeLatest(DELETE__MEETING, deleteMeetSaga);
}

export default watchDeleteMeeting;
