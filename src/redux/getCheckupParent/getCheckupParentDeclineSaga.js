import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_DECLINE_CHECK_UP,
  fetchDeclineCheckUpSuccess,
  fetchDeclineCheckUpFail,
} from "./getCheckupParentDeclineSlice";
import axios from "axios";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;

function* getCheckUpParentDeclineSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const { healthCheckUpID, studentID, note } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/check-up/${healthCheckUpID}/${studentID}/declined`,
      { note: note },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchDeclineCheckUpSuccess(response.data));
      toast.success(response.data.message);
    } else {
      yield put(fetchDeclineCheckUpFail(response.status));
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    yield put(
      fetchDeclineCheckUpFail({
        message: error.message,
        code: error.code,
        status: error.response?.status,
      })
    );
    toast.error(errorMessage);
  }
}

function* watchFetchDeclineCheckUp() {
  yield takeLatest(FETCH_DECLINE_CHECK_UP, getCheckUpParentDeclineSaga);
}
export default watchFetchDeclineCheckUp;
