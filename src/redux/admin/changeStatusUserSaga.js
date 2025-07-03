import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  CHANGE_STATUS_USER,
  fetchChangeStatusUserSuccess,
  fetchChangeStatusUserFail,
} from "./changeStatusUserSlice";
import axios from "axios";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;

function* changeStatusUserSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id, status } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/admin/v1/account/change-status/${id}/${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchChangeStatusUserSuccess(response.data));
      toast.success(response.data.message);
    } else {
      yield put(fetchChangeStatusUserFail(response.status));
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(
      fetchChangeStatusUserFail({
        message: errorMessage,
        code: error.code,
        status: error.response?.status,
      })
    );
    toast.error(errorMessage);
  }
}

function* watchFetchChangeStatusUser() {
  yield takeLatest(CHANGE_STATUS_USER, changeStatusUserSaga);
}
export default watchFetchChangeStatusUser;
