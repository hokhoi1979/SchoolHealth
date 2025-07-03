import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";
import { CHECK__TIME, checkTimeFail, checkTimeSuccess } from "./checkTimeSlice";
import { toast } from "react-toastify";
const URL_API = import.meta.env.VITE_API_URL;

function* checkTimeSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const body = action.payload;
    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/check-up`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(checkTimeSuccess(response.data));
    } else {
      yield put(checkTimeFail(response.status));
      toast.error(
        "Current schedule is already available, please choose another schedule"
      );
    }
  } catch (error) {
    yield put(checkTimeFail(error));
  }
}

function* watchCheckTime() {
  yield takeLatest(CHECK__TIME, checkTimeSaga);
}

export default watchCheckTime;
