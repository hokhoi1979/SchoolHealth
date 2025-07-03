import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_ACCEPT_MEETING,
  fetchAcceptMeetingSuccess,
  fetchAcceptMeetingFail,
} from "./getMeetingParentAcceptSlice";
import axios from "axios";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;

function* getMeetingParentAcceptSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const id = action.payload;
    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/check-up/meeting/accept/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchAcceptMeetingSuccess(response.data));
      toast.success(response.data.message);
    } else {
      yield put(fetchAcceptMeetingFail(response.status));
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(
      fetchAcceptMeetingFail({
        message: error.message,
        code: error.code,
        status: error.response?.status,
      })
    );
    toast.error(errorMessage);
  }
}

function* watchFetchAcceptMeeting() {
  yield takeLatest(FETCH_ACCEPT_MEETING, getMeetingParentAcceptSaga);
}
export default watchFetchAcceptMeeting;
