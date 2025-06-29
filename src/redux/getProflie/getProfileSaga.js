import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_GET_PROFILE,
  fetchGetProfileSuccess,
  fetchGetProfileFail,
} from "./getProfileSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* fetchGetProfileSaga() {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const response = yield call(axios.get, `${URL_API}/v1/account/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      yield put(fetchGetProfileSuccess(response.data));
      console.log("Profile Data: ", response.data);
    } else {
      yield put(fetchGetProfileFail("Unexpected response status"));
    }
  } catch (error) {
    console.error("FETCH GET PROFILE FAILED", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch profile";
    yield put(fetchGetProfileFail(errorMessage));
  }
}

function* watchGetProfileSaga() {
  yield takeLatest(FETCH_GET_PROFILE, fetchGetProfileSaga);
}
export default watchGetProfileSaga;
