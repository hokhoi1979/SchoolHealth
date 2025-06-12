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
    const id = action.payload;
    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/health/${id}`,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log(response.data);

      yield put(fetchUpdateHealthSucess(response.data));
    } else {
      yield put(fetchUpdateHealthFail(response.status));
    }
  } catch (error) {
    yield put(fetchUpdateHealthFail(error));
  }
}

function* watchFetchUpdateHealth() {
  yield takeLatest(FETCH__UPDATE__HEALTH, updateHealthSaga);
}

export default watchFetchUpdateHealth;
