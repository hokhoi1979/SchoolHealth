import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_ACCEPT_CHECK_UP,
  fetchAcceptCheckUpSuccess,
  fetchAcceptCheckUpFail,
} from "./getCheckupParentAcceptSlice";
import axios from "axios";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;

function* getCheckUpParentAcceptSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { studentID, healthCheckUpID } = action.payload;
    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/check-up/${healthCheckUpID}/${studentID}/accepted`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchAcceptCheckUpSuccess(response.data));
      toast.success(response.data.message);
    } else {
      yield put(fetchAcceptCheckUpFail(response.status));
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    fetchAcceptCheckUpFail({
      message: error.message,
      code: error.code,
      status: error.response?.status,
    });
    toast.error(errorMessage);
  }
}

function* watchFetchAcceptCheckUp() {
  yield takeLatest(FETCH_ACCEPT_CHECK_UP, getCheckUpParentAcceptSaga);
}
export default watchFetchAcceptCheckUp;
