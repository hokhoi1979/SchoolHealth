import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH__CREATE__HEALTH,
  fetchCreateHealthFail,
  fetchCreateHealthSucess,
} from "./createHealthSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* createHealthSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const body = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/parent/v1/health`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchCreateHealthSucess(response.data));
    } else {
      yield put(fetchCreateHealthFail(`Status: ${response.status}`));
      console.log("EROR", response.status);
    }
  } catch (error) {
    yield put(fetchCreateHealthFail(error.message || "Unknown error"));
  }
}

function* watchFetchCreateHealth() {
  yield takeLatest(FETCH__CREATE__HEALTH, createHealthSaga);
}

export default watchFetchCreateHealth;
