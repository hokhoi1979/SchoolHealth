import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__CHECKUP__MANAGER,
  fetchCheckupManagerFail,
  fetchCheckupManagerSuccess,
} from "./getAllCheckUpManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* getAllCheckUpManagerSaga() {
  try {
    const token = yield select((state) => state.account.token);

    const response = yield call(axios.get, `${URL_API}/manager/v1/check-up`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      yield put(fetchCheckupManagerSuccess(response.data));
    } else {
      yield put(fetchCheckupManagerFail(response.status));
    }
  } catch (error) {
    yield put(fetchCheckupManagerFail(error));
    console.log(error);
  }
}

function* watchFetchCheckupManager() {
  yield takeLatest(FETCH__CHECKUP__MANAGER, getAllCheckUpManagerSaga);
}

export default watchFetchCheckupManager;
