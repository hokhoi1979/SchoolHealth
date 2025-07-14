import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_DETAIL_ACCOUNT,
  fetchDetailAccountSuccess,
  fetchDetailAccountFail,
} from "./getDetailAccountSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* detailAccountSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload;

    const response = yield call(
      axios.get,
      `${URL_API}/admin/v1/account/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchDetailAccountSuccess(response.data));
    } else {
      yield put(fetchDetailAccountFail(response.status));
    }
  } catch (error) {
    yield put(fetchDetailAccountFail(error));
  }
}

function* watchFetchDetailAccount() {
  yield takeLatest(FETCH_DETAIL_ACCOUNT, detailAccountSaga);
}
export default watchFetchDetailAccount;
