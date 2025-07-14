import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__DETAIL__CHECKUP__MANAGER,
  fetchDetailCheckupManagerFail,
  fetchDetailCheckupManagerSuccess,
} from "./getDetailCheckUpManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* getDetailCheckUpManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload;

    const response = yield call(
      axios.get,
      `${URL_API}/manager/v1/check-up/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchDetailCheckupManagerSuccess(response.data));
    } else {
      yield put(fetchDetailCheckupManagerFail(response.status));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    toast.error(`Get Detail CheckUp Fail: ${errorMessage}`);
    yield put(fetchDetailCheckupManagerFail(errorMessage));
  }
}

function* watchFetchDetailCheckupManager() {
  yield takeLatest(
    FETCH__DETAIL__CHECKUP__MANAGER,
    getDetailCheckUpManagerSaga
  );
}

export default watchFetchDetailCheckupManager;
