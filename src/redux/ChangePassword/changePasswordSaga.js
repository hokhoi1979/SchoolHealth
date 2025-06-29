import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_CHANGE_PASSWORD,
  fetchChangePasswordSuccess,
  fetchChangePasswordFail,
} from "./changePasswordSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* changePasswordSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const { currentPassword, newPassword } = action.payload;

    console.log("Change Password Saga - Payload:", action.payload);
    console.log(
      "Change Password Saga - URL:",
      `${URL_API}/v1/auth/change-password`
    );

    const response = yield call(
      axios.post,
      `${URL_API}/v1/auth/change-password`,
      {
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Change Password Saga - Response:", response);

    if (response.status === 200 || response.status === 201) {
      yield put(fetchChangePasswordSuccess(response.data));
    } else {
      yield put(fetchChangePasswordFail(response.status));
    }
  } catch (error) {
    console.error("Change Password Saga - Error:", error);
    yield put(
      fetchChangePasswordFail({
        message:
          error.response?.data?.message || error.message || "Unknown error",
        status: error.response?.status,
        data: error.response?.data,
      })
    );
  }
}

function* watchFetchChangePassword() {
  yield takeLatest(FETCH_CHANGE_PASSWORD, changePasswordSaga);
}
export default watchFetchChangePassword;
