import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__DETAIL__REQUEST,
  fetchDetailRequestFail,
  fetchDetailRequestSuccess,
} from "./getDetailRequestManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* getDetailRequestSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload;

    const response = yield call(
      axios.get,
      `${URL_API}/manager/v1/request/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchDetailRequestSuccess(response.data));
      console.log("DUCC", response.data);
    } else {
      yield put(fetchDetailRequestFail(response.status));
    }
  } catch (error) {
    yield put(fetchDetailRequestFail(error));
    console.log(error);
  }
}

function* watchFetchDetailRequestManager() {
  yield takeLatest(FETCH__DETAIL__REQUEST, getDetailRequestSaga);
}

export default watchFetchDetailRequestManager;
