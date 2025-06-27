import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_CHECK_UP_PARENT,
  fetchCheckUpParentSuccess,
  fetchCheckUpParentFail,
} from "./getCheckupParentSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* checkupParentSaga() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(axios.get, `${URL_API}/parent/v1/check-up`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      yield put(fetchCheckUpParentSuccess(response.data));
    } else {
      yield put(fetchCheckUpParentFail(`API Error: ${response.data}`));
    }
  } catch (error) {
    yield put(fetchCheckUpParentFail(`API Error: ${error}`));
  }
}

function* watchFetchCheckUpParent() {
  yield takeLatest(FETCH_CHECK_UP_PARENT, checkupParentSaga);
}
export default watchFetchCheckUpParent;
