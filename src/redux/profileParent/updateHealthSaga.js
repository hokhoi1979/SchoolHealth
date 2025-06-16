import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH__UPDATE__HEALTH,
  fetchUpdateHealthFail,
  fetchUpdateHealthSucess,
} from "./updateHealthSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* updateHealthSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { studentID, ...healthData } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/health/${studentID}`,
      healthData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchUpdateHealthSucess(response.data));
      console.log("SUCCESS", response);
    } else {
      yield put(fetchUpdateHealthFail(response.status));
    }
  } catch (error) {
    console.log(error);
    yield put(
      fetchUpdateHealthFail({
        message: error.message,
        code: error.code,
        status: error.response?.status,
      })
    );
  }
}

function* watchFetchUpdateHealth() {
  yield takeLatest(FETCH__UPDATE__HEALTH, updateHealthSaga);
}

export default watchFetchUpdateHealth;
