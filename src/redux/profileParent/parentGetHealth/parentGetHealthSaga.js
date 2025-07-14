import axios from "axios";
import {
  FETCH__PARENT__HEALTH,
  fetchParentHealth,
  fetchParentHealthFail,
  fetchParentHealthSuccess,
} from "./parentGetHealthSlice";
import { call, put, select, takeLatest } from "redux-saga/effects";

const URL_API = import.meta.env.VITE_API_URL;

function* parentHealthProfileSaga() {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const response = yield call(axios.get, `${URL_API}/parent/v1/health`, {
      headers: {
        Authorization: `Bearer ${token}`, // 👈 Add "Bearer"
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      yield put(fetchParentHealthSuccess(response.data.data));
    } else {
      yield put(fetchParentHealthFail(error));
    }
  } catch (error) {
    yield put(fetchParentHealthFail(error));
  }
}

function* watchFetchParentHealth() {
  yield takeLatest(FETCH__PARENT__HEALTH, parentHealthProfileSaga);
}

export default watchFetchParentHealth;
