import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__CLASS__MANAGER,
  fetchClassManagerFail,
  fetchClassManagerSucess,
} from "./getClassManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* classManagerSaga() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(axios.get, `${URL_API}/manager/v1/class`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);

      yield put(fetchClassManagerSucess(response.data));
    } else {
      yield put(fetchClassManagerFail(response.status));
    }
  } catch (error) {
    yield put(fetchClassManagerFail(error));
  }
}

function* watchFetchClassManager() {
  yield takeLatest(FETCH__CLASS__MANAGER, classManagerSaga);
}

export default watchFetchClassManager;
