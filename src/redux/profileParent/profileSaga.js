import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_HEALTH_PROFILE,
  fetchHealthProfileSuccess,
  fetchHealthProfileFail,
} from "./profileSlice";

const URL_API = import.meta.env.VITE_API_URL;
console.log("👀 profileParent/profileSaga LOADED");
function* fetchHealthProfileSaga() {
  try {
    console.log("Saga RUNNING");
    const token = localStorage.getItem("accessToken");
    console.log("Saga RUNNING");
    console.log("TOKEN", token);
    const response = yield call(axios.get, `${URL_API}/parent/v1/health`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      yield put(fetchHealthProfileSuccess(response.data));
      console.log(response.data);
    } else {
      yield put(fetchHealthProfileFail("Unexpected response status"));
    }
  } catch (error) {
    console.error("FETCH HEALTH PROFILE FAILED", error);
    yield put(fetchHealthProfileFail(error.message));
  }
}

function* watchHealthProfileSaga() {
  yield takeLatest(FETCH_HEALTH_PROFILE, fetchHealthProfileSaga);
}
export default watchHealthProfileSaga;
