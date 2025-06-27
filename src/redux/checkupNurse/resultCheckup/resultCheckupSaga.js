import axios from "axios";

import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH__CHECKUP__RESULT,
  fetchCheckupResultFail,
  fetchCheckupResultSuccess,
} from "./resultCheckupSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* checkupResultSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const id = action.payload;
    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/check-up/${id}/result`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchCheckupResultSuccess(response.data));
      console.log("RESULT", response.data);
    } else {
      yield put(fetchCheckupResultFail(response.status));
    }
  } catch (error) {
    yield put(fetchCheckupResultFail(error));
  }
}

function* watchFetchCheckupResult() {
  yield takeLatest(FETCH__CHECKUP__RESULT, checkupResultSaga);
}

export default watchFetchCheckupResult;
