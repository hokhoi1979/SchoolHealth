import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  FETCH_ALL_ACCOUNT,
  fetchAllAccountSuccess,
  fetchAllAccountFail,
} from "./getAllAccountSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* getAllAccountSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const params = {
      page: action.payload?.page || 1,
      limit: action.payload?.limit || 10,
      sortBy: action.payload?.sortBy || "createdAt",
      order:
        action.payload?.order === "asc" || action.payload?.order === "desc"
          ? action.payload.order
          : "asc",
      search: action.payload?.search || undefined,
      roleID: action.payload?.roleID || 1,
    };

    const response = yield call(axios.get, `${URL_API}/admin/v1/account`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      yield put(fetchAllAccountSuccess(response.data));
    } else {
      yield put(fetchAllAccountFail("Lỗi không xác định"));
    }
  } catch (error) {
    yield put(fetchAllAccountFail(error));
  }
}

function* watchFetchGetAllAccount() {
  yield takeLatest(FETCH_ALL_ACCOUNT, getAllAccountSaga);
}
export default watchFetchGetAllAccount;
