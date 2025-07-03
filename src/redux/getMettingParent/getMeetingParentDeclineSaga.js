import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_DECLINE_MEETING,
  fetchDeclineMeetingSuccess,
  fetchDeclineMeetingFail,
} from "./getMeetingParentDeclineSlice";
import axios from "axios";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;

function* getMeetingParentDeclineSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const id = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/check-up/meeting/decline/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchDeclineMeetingSuccess(response.data));
      toast.success(response.data.message);
    } else {
      yield put(fetchDeclineMeetingFail(response.status));
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    console.error("Decline Saga - Full Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    yield put(
      fetchDeclineMeetingFail({
        message: error.message,
        code: error.code,
        status: error.response?.status,
      })
    );
    toast.error(errorMessage);
  }
}

function* watchFetchDeclineMeeting() {
  yield takeLatest(FETCH_DECLINE_MEETING, getMeetingParentDeclineSaga);
}
export default watchFetchDeclineMeeting;
