import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__ALL__REQUEST,
  fetchAllRequestFail,
  fetchAllRequestSuccess,
} from "./getAllRequestSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* getAllRequestSaga() {
  try {
    const token = yield select((state) => state.account.token);

    const response = yield call(axios.get, `${URL_API}/manager/v1/request`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      yield put(fetchAllRequestSuccess(response.data));
    } else {
      yield put(fetchAllRequestFail(response.status));
    }
  } catch (error) {
    yield put(fetchAllRequestFail(error));
  }
}

function* watchFetchAllRequest() {
  yield takeLatest(FETCH__ALL__REQUEST, getAllRequestSaga);
}

export default watchFetchAllRequest;
