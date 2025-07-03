import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_MEETING_PARENT,
  fetchMeetingParentSuccess,
  fetchMeetingParentFail,
} from "./getAllMettingParentSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* mettingParentSaga() {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const response = yield call(
      axios.get,
      `${URL_API}/parent/v1/check-up/meeting`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchMeetingParentSuccess(response.data));
    } else {
      yield put(fetchMeetingParentFail(`API Error: ${response.data}`));
    }
  } catch (error) {
    yield put(fetchMeetingParentFail(`API Error: ${error}`));
  }
}

function* watchFetchMeetingParent() {
  yield takeLatest(FETCH_MEETING_PARENT, mettingParentSaga);
}
export default watchFetchMeetingParent;
