import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH__CHECKUP,
  fetchCheckupFail,
  fetchCheckupSuccess,
} from "./checkupSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* checkupSaga() {
  try {
    const token = yield select((state) => state.account.token);

    const response = yield call(axios.get, `${URL_API}/nurse/v1/check-up`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      yield put(fetchCheckupSuccess(response.data));
      console.log("EVNT", response.data);
    } else {
      yield put(fetchCheckupFail(response.status));
    }
  } catch (error) {
    yield put(fetchCheckupFail(error));
  }
}

function* watchFetchCheckup() {
  yield takeLatest(FETCH__CHECKUP, checkupSaga);
}

export default watchFetchCheckup;
